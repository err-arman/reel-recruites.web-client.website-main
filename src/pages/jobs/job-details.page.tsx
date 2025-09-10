import ShareButton from "@/_app/common/components/ShareButton";
import {
  Job,
  MatchOperator,
  ServerFileReference,
} from "@/_app/gql-types/graphql";
import { userAtom } from "@/_app/store/user.store";
import { getFileUrl } from "@/_app/utils/getFileUrl";
import { useQuery } from "@apollo/client";
import { VideoPlayer, VideoPlayerProps } from "@graphland/react-video-player";
import { Button, CopyButton, Flex, Image, Text, Title } from "@mantine/core";
import {
  IconChevronLeft,
  IconCircleCheckFilled,
  IconLink,
} from "@tabler/icons-react";
import clsx from "clsx";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import JobDetailsSkeleton from "./JobDetailsSkeleton";
import { GET_SINGLE_JOB } from "./utils/query.gql";

const JobDetailsPage = () => {
  const { id } = useParams();
  const [_user] = useAtom(userAtom);

  const { data: jobData, loading } = useQuery<{ job: Job }>(GET_SINGLE_JOB, {
    variables: {
      where: {
        key: "_id",
        operator: MatchOperator.Eq,
        value: id,
      },
    },
  });

  const videoSources = [
    {
      src: getFileUrl(jobData?.job?.video!, "video") || "",
      type: "video/mp4",
    },
  ];

  const videoProps: VideoPlayerProps = {
    theme: "forest", // 'city', 'fantasy', 'forest', 'sea'
    height: 450,
    width: 770,
    poster: getFileUrl(jobData?.job?.thumbnail as ServerFileReference)!,
    sources: videoSources,
  };

  // return <pre>{JSON.stringify(jobData, null, 2)}</pre>;

  return (
    <>
      <Helmet>
        <title> Reel Recruiter</title>
        <meta name="description" content={jobData?.job?.title} />
        <meta
          property="og:image"
          content={getFileUrl(jobData?.job.thumbnail!)!}
        />
      </Helmet>
      <div className="px-5 py-6 wrapper">
        {loading && (
          <>
            <JobDetailsSkeleton />
          </>
        )}
        <div className="flex items-center gap-1 px-4">
          <IconChevronLeft />
          <Link className="no-underline dark:text-white text-dark" to={"/"}>
            All Jobs
          </Link>
        </div>

        <div className="flex flex-col justify-between gap-4 px-3 my-10 md:my-10 lg:flex-row">
          <div className="flex flex-col lg:w-8/12">
            <div>
              <Text>Job Details</Text>
              <Title className="lg:text-[56px] md:text-2xl text-xl md:leading-[61px] dark:text-white mb-8">
                {jobData?.job?.title}
              </Title>
            </div>

            {/* <pre>{JSON.stringify(jobData?.job, null, 2)}</pre> */}

            <div className="w-full job-card">
              {jobData?.job.video?.path ? (
                <VideoPlayer {...videoProps} />
              ) : (
                <Image
                  className="w-full rounded-sm"
                  src={getFileUrl(jobData?.job.thumbnail!)}
                />
              )}
            </div>
          </div>

          <div className="w-full px-6 py-6 mt-4 bg-gray-100 rounded lg:w-4/12 md:p-8 dark:bg-night-600">
            <div className="flex items-center gap-2 mb-2">
              {jobData?.job.company?.logo && (
                <Image
                  className="w-10 rounded-full"
                  src={getFileUrl(jobData?.job.company?.logo!)}
                />
              )}

              <Link
                to={`/${jobData?.job.company?.uid}`}
                className="no-underline dark:text-white text-dark"
              >
                {jobData?.job.company?.name}
              </Link>
            </div>

            {jobData?.job.company?.website && (
              <a
                href={jobData?.job.company?.website}
                target="_blank"
                className="no-underline dark:text-white text-dark"
              >
                Visit Website
              </a>
            )}

            <div>
              {jobData?.job.applicants?.some((a) => a._id == _user?._id) ? (
                <Flex className="m-3">
                  <IconCircleCheckFilled className="text-green-500" />
                  <Text className="ml-2 text-green-500">
                    You have already applied for this job
                  </Text>
                </Flex>
              ) : (
                <Link
                  onClick={(e) => {
                    if (
                      jobData?.job.applicants?.some((a) => a._id == _user?._id)
                    ) {
                      e.preventDefault();
                    }
                  }}
                  className={clsx("block mt-3 mb-8 outline-button")}
                  to={
                    jobData?.job?.isSkipVideoInterview
                      ? `/jobs/${jobData?.job?._id}/interview`
                      : `/jobs/${jobData?.job?._id}/on-boarding`
                  }
                >
                  Apply Now
                </Link>
              )}

              <div className="job-details-mini-bg">
                <div>
                  <Text>Job type</Text>
                  <Text size="sm">{jobData?.job.jobRoleType}</Text>
                </div>

                {jobData?.job.company?.location && (
                  <div>
                    <Text>Location</Text>
                    <Text>{jobData?.job.company?.location?.address}</Text>
                  </div>
                )}

                <div>
                  <Text>Date posted</Text>
                  <Text>
                    {dayjs(jobData?.job?.createdAt).format("YYYY-MM-DD")}
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="my-4 space-x-2">
          <ShareButton url={window.location.href} text={jobData?.job?.title} />

          <CopyButton value={window.location.href}>
            {({ copied, copy }) => (
              <Button
                color={copied ? "teal" : "blue"}
                onClick={copy}
                variant="outline"
                size="md"
                leftSection={<IconLink size={20} />}
              >
                {copied ? "Link Copied" : "Copy Link"}
              </Button>
            )}
          </CopyButton>
        </div>

        <div className="lg:w-8/12">
          <div className="dark:primary-bg shadow-md rounded mb-[30px] dark:bg-night-600 p-6">
            <Title className="mb-5 text-2xl font-title">About company</Title>
            <Text className="mb-3 prose-sm prose max-w-none dark:prose-invert">
              {jobData?.job?.company?.longDescription}
            </Text>

            <Link
              className="my-2 outline-button"
              to={`/${jobData?.job.company?.uid}`}
            >
              See details
            </Link>
          </div>

          <div className="dark:primary-bg shadow-md rounded mb-[30px] dark:bg-night-600 p-6">
            <Title className="mb-5 text-2xl font-title">Job Description</Title>
            <div
              className="mb-3 prose-sm prose dark:prose-invert"
              dangerouslySetInnerHTML={{
                __html: jobData?.job.longDescription!,
              }}
            />
          </div>

          {!jobData?.job.applicants?.some((a) => a._id == _user?._id) && (
            <div className="flex mt-6 mb-8">
              <Link
                className="block mt-3 mb-8 outline-button"
                to={
                  jobData?.job?.isSkipVideoInterview
                    ? `/jobs/${jobData?.job?._id}/interview`
                    : `/jobs/${jobData?.job?._id}/on-boarding`
                }
              >
                Apply Now
              </Link>
            </div>
          )}
        </div>
        {/* {JSON.stringify(jobData, null, 2)} */}
      </div>
    </>
  );
};

export default JobDetailsPage;
