import { Job, User } from "@/_app/gql-types/graphql";
import { userAtom } from "@/_app/store/user.store";
import { getFileUrl } from "@/_app/utils/getFileUrl";
import { useMutation, useQuery } from "@apollo/client";
import { Image, Text, Title } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconBookmark, IconBookmarkFilled } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ADD__JOB__TO__BOOK__MARK,
  BOOK__MARKED__JOBS,
  REMOVE__JOB__TO__BOOK__MARK,
} from "../utils/query";
interface Prop {
  job?: Job;
}

const JobCardVertical: React.FC<Prop> = ({ job }) => {
  const [currentUer] = useAtom(userAtom);
  const navigate = useNavigate();
  const [playing, setPlaying] = useState(false);

  const videoSources = [
    {
      src: getFileUrl(job?.video!, "video") || "",
      type: "video/mp4",
    },
  ];

  // const videoProps: VideoPlayerProps = {
  //   theme: "forest", // 'city', 'fantasy', 'forest', 'sea'
  //   height: 250,
  //   width: 370,
  //   poster: getFileUrl(job?.company?.cover as ServerFileReference)!,
  //   sources: videoSources,
  // };

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

  return (
    <>
      <div className="flex flex-col justify-between overflow-hidden bg-white rounded-md shadow-md dark:bg-night-500 job-card">
        {job?.video ? (
          // <VideoPlayer {...videoProps} />
          <div className="relative">
            {!playing && (
              <div
                style={{
                  backgroundImage: `url('/icons/play.svg')`,
                  backgroundSize: "auto",
                  backgroundPosition: "center -17px",
                }}
                className="w-[48px] h-[48px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              />
            )}

            <video
              src={videoSources[0].src}
              poster={getFileUrl(job?.thumbnail!)!}
              className="aspect-video max-h-[245px] w-full"
              onMouseEnter={(e) => {
                e.currentTarget.play();
                setPlaying(true);
              }}
              onMouseLeave={(e) => {
                e.currentTarget.pause();
                setPlaying(false);
              }}
            />
          </div>
        ) : (
          <Image src={getFileUrl(job?.thumbnail!)} />
        )}

        <div className="flex flex-col justify-between flex-1 px-4 pb-4">
          <div className="flex flex-col justify-between">
            <div className="flex items-center justify-between mt-5 mb-4 ">
              <div className="flex items-center gap-2">
                <Image
                  className="w-10 rounded-full"
                  src={getFileUrl(job?.company?.logo!)}
                />
                <Text className="text-xl leading-[26px]">
                  <Link
                    className="text-black no-underline dark:text-white"
                    to={`/${job?.company?.uid}`}
                  >
                    {job?.company?.name}
                  </Link>
                </Text>
              </div>

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
            <div>
              <Title className="text-[26px] leading-[26px] dark:text-white">
                {job?.title}
              </Title>
              <Text className="mt-3 mb-5 leading-[26px] line-clamp-5">
                {job?.shortDescription}
              </Text>
            </div>
          </div>

          <Link
            className="block outline-button"
            to={`/${job?.company?.uid}/jobs/${job?._id}`}
          >
            View Details
          </Link>
        </div>
      </div>
    </>
  );
};

export default JobCardVertical;
