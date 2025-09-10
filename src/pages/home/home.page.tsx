import JobCardHorizontal from "@/_app/common/components/JobCardHorizontal";
import JobCardVertical from "@/_app/common/components/JobCardVertical";
import {
  Job,
  JobCategoryWithPagination,
  JobsWithPagination,
  MatchOperator,
} from "@/_app/gql-types/graphql";
import { getFileUrl } from "@/_app/utils/getFileUrl";
import { useQuery } from "@apollo/client";
import { Image, Modal, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlayerPlayFilled } from "@tabler/icons-react";
import { ArrowRight, BarChart2, Search, Video } from "lucide-react";
import { Link } from "react-router-dom";
import { GET_ALL_JOBS } from "../jobs/utils/query.gql";
import { CATEGORY_CARD_FILTERED } from "./utils/query.gql";

const HomePage = () => {
  const [promoVideoPopup, promoVideoPopupDisclosure] = useDisclosure(false);

  const { data: categoriesFilterData } = useQuery<{
    jobCategories: JobCategoryWithPagination;
  }>(CATEGORY_CARD_FILTERED, {
    variables: {
      input: {
        sort: "ASC",
        sortBy: "createdAt",
        filters: [
          {
            key: "isFeatured",
            operator: MatchOperator.Eq,
            value: "true",
          },
        ],
      },
    },
  });

  const { data: horizontalHomeData } = useQuery<{
    jobs__public: JobsWithPagination;
  }>(GET_ALL_JOBS, {
    variables: {
      input: {
        limit: 4,
      },
    },
  });

  // const { data: promotionalData } = useQuery<{
  //   promotionalVideos__public: PromotionalVideosWithPagination;
  // }>(PROMOTIONAL_VIDEOS_QUERY, {
  //   variables: {
  //     input: {
  //       limit: 10,
  //     },
  //   },
  // });

  return (
    <>
      <div>
        <div className="md:flex md:gap-10">
          <div className="wrapper">
            <div className="my-10 lg:w-8/12 lg:ml-20 lg:my-32">
              <Title className="text-4xl lg:text-[68px] lg:leading-[74px] font-title font-normal dark:text-white">
                Find Jobs That See the Real You
              </Title>
              <Text className="dark:text-link  md:leading-[26px] mt-8 mb-7">
                Show your skills, speak your story — and get hired through short
                videos, not long resumes.
              </Text>

              <div className="flex items-center gap-4">
                <Link className="outline-button" to={"/jobs"}>
                  I&apos;m Looking for a job
                </Link>

                <Link className="outline-button" to={"/auth/signup"}>
                  I Want to Hire
                </Link>
              </div>
              <div className="mt-16 w-14 h-14">
                <a href="#promotional-videos">
                  <Image
                    src="/images/home/down-arrow.svg"
                    className="animate-bounce"
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="items-center justify-center hidden md:flex md:w-10/12 home-bg-banner">
            <button
              onClick={promoVideoPopupDisclosure.open}
              className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full"
            >
              <IconPlayerPlayFilled color="black" size={32} />
            </button>
          </div>
        </div>

        {/* =========================== Promotional Videos ===========================*/}
        <div className="dark:primary-bg py-[72px]" id="promotional-videos">
          <div className="wrapper">
            <div className="max-w-xl mx-auto mb-12 font-thin text-center">
              <Title className="font-title font-normal dark:text-white md:text-5xl md:leading-[52px] text-3xl leading-[42px] mb-3">
                Apply Smarter in Just 3 Steps
              </Title>
              <Text className="md:leading-[26px]">
                Discover the right role, record quick video answers, and track
                your hiring journey — all in one place.
              </Text>
            </div>
            {/*  */}
            <div className="max-w-4xl p-4 py-8 mx-auto">
              <div className="flex flex-col items-center justify-between gap-4 md:flex-row md:gap-2">
                <div className="flex flex-col items-center text-center">
                  <div className="flex items-center justify-center w-16 h-16 mb-4 bg-blue-100 rounded-full">
                    <Search className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-blue-600">
                    Browse Open Roles
                  </h3>
                  <p className="text-sm text-gray-600">
                    Filter by field, location, or company to find your match.
                  </p>
                </div>
                <ArrowRight className="hidden w-8 h-8 text-gray-400 md:block" />
                <div className="flex flex-col items-center text-center">
                  <div className="flex items-center justify-center w-16 h-16 mb-4 bg-green-100 rounded-full">
                    <Video className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-green-600">
                    Record Video Answers
                  </h3>
                  <p className="text-sm text-gray-600">
                    Show your personality, skills, and confidence — no cover
                    letter needed.
                  </p>
                </div>
                <ArrowRight className="hidden w-8 h-8 text-gray-400 md:block" />
                <div className="flex flex-col items-center text-center">
                  <div className="flex items-center justify-center w-16 h-16 mb-4 bg-purple-100 rounded-full">
                    <BarChart2 className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-purple-600">
                    Track Your Progress
                  </h3>
                  <p className="text-sm text-gray-600">
                    Stay updated. Know where you stand. Never be left in the
                    dark.
                  </p>
                </div>
              </div>
            </div>

            {/*  */}
          </div>
        </div>

        {/* =========================== Promotional Videos ===========================*/}
        {/* <div className="dark:primary-bg py-[72px]" id="promotional-videos">
          <div className="wrapper">
            <div className="max-w-xl mx-auto mb-12 font-thin text-center">
              <Title className="font-title font-normal  dark:text-white md:text-5xl md:leading-[52px] text-3xl leading-[42px] mb-3">
                Prepare for Success
              </Title>
              <Text className="md:leading-[26px]">
                Get tips on acing your CV and video interview to land the
                internship you want.
              </Text>
            </div>

            <PromotionalVideoSection
              promotionalVideos={
                promotionalData?.promotionalVideos__public?.nodes! || []
              }
            />
          </div>
        </div> */}

        {/* job categories */}
        <div className="">
          <div className="py-[72px]  dark:bg-[#0E141B] bg-gray-50">
            <div className="my-20 wrapper">
              <div className="max-w-xl mx-auto mb-12 font-thin text-center">
                <Title
                  className="font-title dark:text-white text-3xl font-normal  leading-[52px] mb-3"
                  order={1}
                >
                  Jobs for Every Industry, Skill & Career Path
                </Title>
                <Text className="leading-[26px] mt-7">
                  From tech to HR, marketing to finance — apply with ease and
                  stand out from day one.
                </Text>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4 wrapper">
              {categoriesFilterData?.jobCategories?.nodes?.map((category) => (
                <Link to={`/jobs?categories=${category._id}`}>
                  <div
                    key={category._id}
                    className="flex flex-col gap-2 overflow-hidden text-center rounded-md"
                  >
                    <img src={getFileUrl(category.logo!)!} />
                    <h3 className="text-2xl">{category.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-12 text-center ">
              <Link className="outline-button" to={"/categories"}>
                View all categories
              </Link>
            </div>
          </div>
        </div>

        {/* job list */}
        <div>
          <div className="dark:job-list-bg pt-[72px] pb-32">
            <div className="wrapper">
              <div className="max-w-md mx-auto text-center">
                <Title className="font-title dark:text-white font-normal  text-3xl leading-[52px] mb-3">
                  Your Next Job Starts with a Hello
                </Title>
                <Text className="dark:text-link ">
                  Get to know the company through video descriptions — and apply
                  back with your own.
                </Text>
              </div>
              <div>
                <div className="grid lg:grid-cols-2 grid-cols-1 rounded md:gap-[30px] pb-10 mt-12 gap-4 ">
                  {horizontalHomeData?.jobs__public?.nodes?.map(
                    (job: Job, idx: number) => (
                      <div key={idx} className="h-full">
                        <div className="hidden h-full md:block ">
                          <JobCardHorizontal job={job} />
                        </div>
                        <div className="md:hidden">
                          <JobCardVertical job={job} />
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
              <div className="mt-12 text-center ">
                <Link className="outline-button" to={"/jobs"}>
                  View All Jobs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 
        --------------------------------------------------------
          Modals
        --------------------------------------------------------
      */}
      <Modal
        size={"xl"}
        opened={promoVideoPopup}
        onClose={promoVideoPopupDisclosure.close}
      >
        <video controls={false} autoPlay>
          <source src="/videos/reel-promo.mp4" type="video/mp4" />
        </video>
      </Modal>
    </>
  );
};

export default HomePage;
