import { Post, PostWithPagination, User } from "@/_app/gql-types/graphql";
import { getFileUrl } from "@/_app/utils/getFileUrl";
import { useQuery } from "@apollo/client";
import { Divider, Image, Text, Title } from "@mantine/core";
import { useParams } from "react-router-dom";
import {
  PROFILE_VIDEOS_QUERY,
  USER_PROFILE_QUERY,
} from "../job-seeker-profile/utils/query.gql";
import ProfileFeedVideoCard from "@/_app/common/components/ProfileFeedVideoCard";
import clsx from "clsx";

const ProfileFeedPage = () => {
  const { userId } = useParams();
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
          limit: -1,
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
                <Image
                  className="w-4 h-4"
                  src={"/images/job-profile/verify.svg"}
                />
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
            {userData?.user.experiences?.length && (
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
            )}
            {userData?.user?.educations?.length && (
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
            )}
          </div>
        </div>
        {/* <div className="flex items-start justify-between">
          <div className="flex flex-col justify-between">
            <div className="relative -mt-32 ">
              <Image
                className="h-[144px] w-[144px] rounded-full"
                src={getFileUrl(userData?.user?.avatar!)}
              />
           
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-4">
                <Title className="dark:text-white text-[26px] leading-8">
                  {userData?.user?.name}
                </Title>
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

          <div className="flex flex-col justify-start gap-2">
            {userData?.user.experiences?.length && (
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
            )}
            {userData?.user?.educations?.length && (
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
            )}
          </div>
        </div> */}
        <Divider h={1} className="my-7" />

        {/* =======================================================================
          Profile videos
        =======================================================================*/}

        <div className="mb-20">
          <Title order={3} className="my-3  dark:text-white">
            Profile videos
          </Title>

          <div className="grid content-center grid-cols-2 gap-4">
            {userPosts?.posts?.nodes?.map((post: Post, idx: number) => (
              <ProfileFeedVideoCard key={idx} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileFeedPage;
