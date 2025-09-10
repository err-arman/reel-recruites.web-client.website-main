import { Job, ServerFileReference, User } from "@/_app/gql-types/graphql";
import { userAtom } from "@/_app/store/user.store";
import { getFileUrl } from "@/_app/utils/getFileUrl";
import { useMutation, useQuery } from "@apollo/client";
import { VideoPlayer, VideoPlayerProps } from "@graphland/react-video-player";
import { Image, Text, Title } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconBookmark, IconBookmarkFilled } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ADD__JOB__TO__BOOK__MARK,
  BOOK__MARKED__JOBS,
  REMOVE__JOB__TO__BOOK__MARK,
} from "../utils/query";

interface Prop {
  job: Job;
}

const JobCardHorizontal: React.FC<Prop> = ({ job }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [currentUer] = useAtom(userAtom);
  const navigate = useNavigate();
  const [divWidth, setDivWidth] = useState<number>(280);
  const [divHeight, setDivHeight] = useState<number>(250);

  const videoSources = [
    {
      src: getFileUrl(job?.video!, "video") || "",
      type: "video/mp4",
    },
  ];

  const videoProps: VideoPlayerProps = {
    theme: "forest", // 'city', 'fantasy', 'forest', 'sea'
    height: 250,
    width: divWidth,
    sources: videoSources,
    poster: getFileUrl(job?.company?.cover as ServerFileReference)!,
  };

  const { data: bookMarkedJobs, refetch } = useQuery<{
    me: User;
  }>(BOOK__MARKED__JOBS);

  const [addToBookMark] = useMutation(ADD__JOB__TO__BOOK__MARK, {
    onCompleted() {
      showNotification({
        message: "Job has been added to save list.",
        color: "teal",
      });
      refetch();
    },
  });

  const [removeToBookMark] = useMutation(REMOVE__JOB__TO__BOOK__MARK, {
    onCompleted() {
      showNotification({
        message: "Job has been removed from save list.",
        color: "teal",
      });
      refetch();
    },
  });

  const isBooked = bookMarkedJobs?.me?.likedJobs?.find(
    (liked) => liked?._id === job?._id
  );

  useEffect(() => {
    setDivWidth(ref.current?.clientWidth!);
    setDivHeight(ref.current?.clientHeight!);
  }, [job]);

  return (
    <div
      ref={ref}
      className="flex items-center h-full overflow-hidden bg-white rounded-md shadow-md dark:bg-night-500 "
    >
      {job?.video?.path ? (
        <VideoPlayer {...videoProps} />
      ) : (
        <div className="flex-none w-[260px]" style={{ height: divHeight }}>
          {job.thumbnail ? (
            <Image
              src={getFileUrl(job.thumbnail!)}
              className="object-cover w-full h-full"
            />
          ) : (
            <Image
              src={getFileUrl(job?.company?.cover!)}
              className="object-cover w-full h-full"
            />
          )}
        </div>
      )}

      <div className="flex flex-col justify-between w-full px-4 pb-4 flex-2">
        <div>
          <div className="flex items-center justify-between mt-5 mb-4">
            <Link
              className="text-black no-underline dark:text-white"
              to={`/${job?.company?.uid}`}
            >
              {job?.company?.name}
            </Link>
            {isBooked ? (
              <IconBookmarkFilled
                size={"20px"}
                className="cursor-pointer"
                onClick={() => {
                  {
                    currentUer?._id
                      ? removeToBookMark({
                          variables: {
                            jobId: job?._id,
                          },
                        })
                      : navigate("/auth/signin");
                  }
                }}
              />
            ) : (
              <IconBookmark
                size={"20px"}
                className="cursor-pointer"
                onClick={() => {
                  currentUer?._id
                    ? addToBookMark({
                        variables: {
                          jobId: job?._id,
                        },
                      })
                    : navigate("/auth/signin");
                }}
              />
            )}
          </div>
          <Title className="text-[26px] leading-[26px] dark:text-white">
            {job?.title}
          </Title>
          <Text className=" mt-3 mb-5 leading-[26px]  line-clamp-2 text-sm">
            {job?.shortDescription}
          </Text>
        </div>
        <Link
          className="block outline-button"
          to={`/${job.company?.uid}/jobs/${job?._id}`}
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default JobCardHorizontal;
