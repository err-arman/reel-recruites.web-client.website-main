import {
  ADD__JOB__TO__BOOK__MARK,
  BOOK__MARKED__JOBS,
  REMOVE__JOB__TO__BOOK__MARK,
} from "@/_app/common/utils/query";
import { Job, User } from "@/_app/gql-types/graphql";
import { userAtom } from "@/_app/store/user.store";
import { getFileUrl } from "@/_app/utils/getFileUrl";
import { useMutation, useQuery } from "@apollo/client";
import { Image, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconBookmark, IconBookmarkFilled } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const RecentJobCard: React.FC<{ job: Job }> = ({ job }) => {
  const [currentUer] = useAtom(userAtom);
  const navigate = useNavigate();

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

  return (
    <div
      key={job?._id}
      className="flex items-center justify-between gap-8 md:gap-5"
    >
      <div className="flex items-center gap-2 md:gap-5">
        <Image
          className="w-20 rounded-full"
          src={getFileUrl(job?.company?.logo!)}
        />
        <div className="flex flex-col items-start justify-start gap-2 ">
          {job?.title && (
            <Link to={`/${job.company?.uid}/jobs/${job._id}`}>
              <Text className="md:text-[18px] text-xs md:leading-[25px]">
                {job?.title}
              </Text>
            </Link>
          )}

          <Text className="text-xs dark:text-link md:text-sm">
            {dayjs(job?.postedBy?.createdAt).format("MMMM D, YYYY")}
          </Text>
        </div>
      </div>

      <div className="flex items-center justify-center gap-3 md:justify-between">
        {Boolean(
          bookMarkedJobs?.me?.likedJobs?.find(
            (liked) => liked?._id === job?._id
          )
        ) ? (
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

        <Link
          className="outline-button"
          to={`/${job.company?.uid}/jobs/${job._id}`}
        >
          Apply
        </Link>
      </div>
    </div>
  );
};

export default RecentJobCard;
