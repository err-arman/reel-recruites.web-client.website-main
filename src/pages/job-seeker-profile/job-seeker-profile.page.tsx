import ProfileFeedVideoCard from "@/_app/common/components/ProfileFeedVideoCard";
import { Post, PostWithPagination, User } from "@/_app/gql-types/graphql";
import { timeDiff } from "@/_app/utils/date";
import { getFileUrl } from "@/_app/utils/getFileUrl";
import { useQuery } from "@apollo/client";
import { Button, Divider, Image, Text, Title } from "@mantine/core";
import clsx from "clsx";
import dayjs from "dayjs";
import { Link, useParams } from "react-router-dom";
import { PROFILE_VIDEOS_QUERY, USER_PROFILE_QUERY } from "./utils/query.gql";
import { useAtom } from "jotai";
import { userAtom } from "@/_app/store/user.store";

const JobSeekerProfile = () => {
  const { userId } = useParams();
  const [currentUser] = useAtom(userAtom);
  const { data: userData } = useQuery<{ user: User }>(USER_PROFILE_QUERY, {
    variables: {
      where: {
        key: "_id",
        operator: "eq",
        value: userId,
      },
    },
  });

  const { data: userPosts } = useQuery<{ posts: PostWithPagination }>(
    PROFILE_VIDEOS_QUERY,
    {
      variables: {
        input: {
          filters: [
            {
              key: "postedBy",
              operator: "eq",
              value: userId,
            },
          ],
          limit: 4,
          sort: "DESC",
          sortBy: "createdAt",
        },
      },
    }
  );

  return (
    <div className="px-4">
      {userData?.user?.cover && (
        <div
          className="m-0 bg-center bg-no-repeat bg-cover rounded-md h-96"
          style={{
            backgroundImage: `url(${getFileUrl(userData?.user?.cover!)})`,
          }}
        ></div>
      )}

      <div className="max-w-[870px] mx-auto">
        <div
          className={clsx("md:flex justify-between", {
            "flex-end": !Boolean(userData?.user?.cover),
            "flex-start": Boolean(userData?.user?.cover),
          })}
        >
          <div className="flex flex-col justify-between">
            <div
              className={clsx("relative", {
                " -mt-28": Boolean(userData?.user?.cover),
              })}
            >
              <Image
                className="h-[144px] w-[144px] rounded-full"
                src={getFileUrl(userData?.user?.avatar!)}
              />
              {/* <div className="absolute w-4 h-4 bg-green-600 rounded-full top-8"></div> */}
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-4">
                <Title className="dark:text-white text-[26px] leading-8">
                  {userData?.user?.name}
                </Title>

                {currentUser?._id == userData?.user._id ? (
                  <Link
                    to={"/dashboard/profile-settings"}
                    className="text-blue-500 hover:underline"
                  >
                    Edit Profile
                  </Link>
                ) : null}

                {/* <Image
                  className="w-4 h-4"
                  src={"/images/job-profile/verify.svg"}
                /> */}
              </div>
              <Text className="dark:text-white">
                {userData?.user?.designation}
              </Text>
              <div className="flex items-center gap-2">
                <Text className="dark:text-white">
                  {userData?.user?.tagLine}
                </Text>
                <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                <Text className="dark:text-white">Contact Info</Text>
              </div>
            </div>
          </div>

          {/* Latest education & experience */}
          <div className="flex flex-col items-start gap-2 mt-5 md:justify-start">
            {userData?.user.experiences?.length ? (
              <div className="flex gap-2">
                <Image
                  className="w-4 h-4"
                  src={getFileUrl(userData.user?.experiences?.[0]?.logo!)}
                  alt="education-image"
                />

                <Text className="leading-6 dark:text-white">
                  {userData?.user?.experiences?.[0]?.companyName}
                </Text>
              </div>
            ) : null}
            {userData?.user?.educations?.length ? (
              <div className="flex items-center justify-center gap-2">
                <Image
                  className="w-4 h-4"
                  src={getFileUrl(userData.user?.educations?.[0]?.logo!)}
                  alt="education-image"
                />

                <Text className="leading-6 dark:text-white">
                  {userData?.user?.educations?.[0]?.school}
                </Text>
              </div>
            ) : null}
          </div>
        </div>
        <Divider h={1} className="my-7" />

        {/* overview */}
        <div>
          <Title className="text-[26px] dark:text-white mb-3">Overview</Title>
          <Text className="dark:text-white leading-[25px]">
            {userData?.user.overview}
          </Text>

          {!!!userData?.user.overview?.length && (
            <div className="my-5 text-center">
              <Text>No overview available</Text>
            </div>
          )}
        </div>

        {/* =======================================================================
          Experiences
        =======================================================================*/}
        <div>
          <Title className="text-[26px] dark:text-white my-7">Experience</Title>
          <div className="flex flex-col gap-7">
            {userData?.user?.experiences?.map((item) => (
              <div className="flex items-center justify-between gap-4">
                <div className="flex gap-4">
                  <Image
                    className="w-12 h-12 rounded"
                    src={getFileUrl(item?.logo!)}
                  />
                  <div className="flex flex-col gap-2">
                    <Title className="dark:text-white text-[26px] leading-8">
                      {item?.title}
                    </Title>

                    <div className="flex items-center gap-2">
                      <Text className="dark:text-white">
                        {item?.companyName}
                      </Text>
                      <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                      <Text className="dark:text-white">{item?.roleType}</Text>
                    </div>
                    <div className="flex items-center gap-2">
                      <Text className="dark:text-white">
                        {" "}
                        {dayjs(item?.startDate).format("MMMM D, YYYY")} -{" "}
                        {!item?.isCurrentlyWorking
                          ? dayjs(item.endDate).format("MMMM D, YYYY")
                          : "Present"}
                      </Text>
                      <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                      <Text className="dark:text-white">
                        {item?.isCurrentlyWorking
                          ? timeDiff(new Date(), item.startDate)
                          : timeDiff(item.endDate, item.startDate)}
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {userData?.user?.experiences?.length === 0 && (
              <div className="my-5 text-center">
                <Text>No experience available</Text>
              </div>
            )}
          </div>
          <Divider h={1} className="my-7" />
        </div>

        {/* =======================================================================
          Your skills 
        =======================================================================*/}
        <div>
          <div className="flex items-center justify-between gap-4 ">
            <Title className="dark:text-white text-[26px] leading-8">
              Your skills
            </Title>
          </div>
          <div className="flex flex-wrap gap-3 my-7">
            {userData?.user.skills?.map((item) => (
              <Button
                size="md"
                variant="filled"
                className="job-profile-bg font-extralight dark:text-link"
              >
                {item}
              </Button>
            ))}

            {userData?.user.skills?.length === 0 && (
              <div className="w-full my-5 text-center">
                <Text>No skills available</Text>
              </div>
            )}
          </div>
          <Divider h={1} className="my-7" />
        </div>

        {/* =======================================================================
          Educations 
        =======================================================================*/}
        <div>
          <Title className="text-[26px] dark:text-white my-7">Education</Title>
          {userData?.user?.educations?.map((item) => (
            <div className="flex flex-col mt-10 gap-7">
              <div className="flex justify-between gap-4">
                <div className="flex gap-4">
                  <Image
                    className="w-12 h-12 rounded"
                    src={getFileUrl(item?.logo!)}
                    alt="education-image"
                  />
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                      <Title className="dark:text-white text-[26px] leading-8">
                        {item.school}
                      </Title>

                      <div className="flex items-center gap-2">
                        <Text className="dark:text-white">{item?.degree}</Text>
                        {/* <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                        <Text className="dark:text-white">Permanent</Text> */}
                      </div>
                      <div className="flex items-center gap-2">
                        <Text className="dark:text-white">
                          {dayjs(item.startDate).format("MMMM D, YYYY")}
                        </Text>
                        <span>-</span>
                        <Text className="dark:text-white">
                          {item.endDate
                            ? dayjs(item.endDate).format("MMMM D, YYYY")
                            : "Present"}
                        </Text>
                      </div>
                    </div>
                    {/* <Text className="dark:text-white">
                      Awarded Outstanding Graduate Award
                    </Text> */}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {userData?.user?.educations?.length === 0 && (
            <div className="my-5 text-center">
              <Text>No educational information available</Text>
            </div>
          )}

          <Divider h={1} className="my-7" />
        </div>

        {/* =======================================================================
          Profile videos
        =======================================================================*/}
        <div className="mb-20">
          <div className="flex items-center justify-between my-8">
            <Title className="text-[26px] dark:text-white my-3">
              Profile videos
            </Title>
            <div className="flex gap-4">
              {userPosts?.posts.meta?.totalCount != 0 && (
                <Link className="outline-button" to={`/profile/${userId}/feed`}>
                  See All videos
                </Link>
              )}

              {userId == currentUser?._id && (
                <Link
                  className="outline-button"
                  to={`/dashboard/profile-videos`}
                >
                  Upload Video
                </Link>
              )}
            </div>
          </div>
          <div className="grid content-center grid-cols-2 gap-4">
            {userPosts?.posts?.nodes?.map((post: Post, idx: number) => (
              <ProfileFeedVideoCard key={idx} post={post} />
            ))}
          </div>

          {userPosts?.posts.meta?.totalCount === 0 && (
            <div className="my-5 text-center">
              <Text>No Video posted by {userData?.user?.name}</Text>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobSeekerProfile;
