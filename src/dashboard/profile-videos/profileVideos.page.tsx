import ListSkeletons from "@/_app/common/Skeletons/ListSkeletons";
import EmptyState from "@/_app/common/components/EmptyState";
import {
  MatchOperator,
  Post,
  PostWithPagination,
} from "@/_app/gql-types/graphql";
import useQueryState from "@/_app/hooks/use-query-state";
import { userAtom } from "@/_app/store/user.store";
import { Notify } from "@/_app/utils/Notify";
import { useMutation, useQuery } from "@apollo/client";
import { Button, Drawer, Flex, Pagination, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconUpload } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useState } from "react";
import ProfileVideoCard from "./components/ProfileVideoCard";
import ProfileVideoForm from "./components/ProfileVideoForm";
import { PROFILE_VIDEOS_QUERY, REMOVE_POST_MUTATION } from "./utils/query.gql";

const ProfileVideosPage = () => {
  const [opened, drawerHandler] = useDisclosure();
  const [proVideo, setProVideo] = useState<Post | null>(null);
  const [_user] = useAtom(userAtom);

  const [qs, setQs] = useQueryState({
    page: "1",
    limit: "10",
  });
  const variables = {
    input: {
      limit: parseInt(qs.limit),
      page: parseInt(qs.page),
      filters: [
        {
          key: "postedBy",
          operator: MatchOperator.Eq,
          value: _user?._id,
        },
      ],
    },
  };

  const { data, loading, refetch } = useQuery<{
    posts: PostWithPagination;
  }>(PROFILE_VIDEOS_QUERY, { variables });

  const [removeProfileVideo] = useMutation(
    REMOVE_POST_MUTATION,
    Notify({
      successTitle: "Profile video has been removed!",
      errorTitle: "Failed to remove profile video ",
      errorMessage: "Please try again later.",
      onSuccess: () => refetch(),
    })
  );

  return (
    <div>
      <Flex justify={"space-between"} align={"center"}>
        <Title className="md:text-2xl text-xl">Profile Videos</Title>
        <Button
          size="sm"
          onClick={() => {
            setProVideo(null);
            drawerHandler.open();
          }}
          leftSection={<IconUpload />}
        >
          Upload video
        </Button>
      </Flex>
      <Drawer position="right" opened={opened} onClose={drawerHandler?.close}>
        <ProfileVideoForm
          onRefetch={refetch!}
          onClose={drawerHandler.close}
          proVideo={proVideo!}
        />
      </Drawer>

      {!data?.posts?.nodes?.length && !loading ? (
        <div className="py-10">
          <EmptyState
            label={"You didn't upload any video till now"}
            Actions={
              <Button leftSection={<IconUpload />} onClick={drawerHandler.open}>
                Upload One
              </Button>
            }
          />
        </div>
      ) : null}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 my-10">
        {data?.posts.nodes?.map((post: Post, idx: number) => (
          <ProfileVideoCard
            key={idx}
            post={post}
            onRemove={() =>
              removeProfileVideo({
                variables: {
                  where: {
                    key: "_id",
                    operator: MatchOperator.Eq,
                    value: post._id,
                  },
                },
              })
            }
          />
        ))}
      </div>

      <ListSkeletons
        isHasData={data?.posts?.nodes?.length as number}
        isShow={loading}
        height={100}
        skeletonsCount={parseInt(qs.limit)}
      />

      {!loading &&
      data?.posts?.nodes?.length &&
      data?.posts?.nodes?.length > 0 ? (
        <Pagination
          value={parseInt(qs.page)}
          onChange={(page) => setQs({ page: page.toString() })}
          total={data?.posts?.meta?.totalPages ?? 0}
        />
      ) : null}
    </div>
  );
};

export default ProfileVideosPage;
