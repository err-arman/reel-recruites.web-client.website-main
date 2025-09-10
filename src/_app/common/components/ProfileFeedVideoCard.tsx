import { Post } from "@/_app/gql-types/graphql";
import { getFileUrl } from "@/_app/utils/getFileUrl";
import { VideoPlayer, VideoPlayerProps } from "@graphland/react-video-player";
import { Text, Title } from "@mantine/core";
import dayjs from "dayjs";

interface Props {
  post: Post;
}

const ProfileFeedVideoCard: React.FC<Props> = ({ post }) => {
  const videoSources = [
    {
      src:
        typeof post!.medias !== "undefined"
          ? (getFileUrl(post?.medias?.[0]?.media ?? {}, "video") as string)
          : "",
      type: "video/mp4",
    },

    // Add more video sources as needed
  ];

  const videoProps: VideoPlayerProps = {
    theme: "city", // 'city', 'fantasy', 'forest', 'sea'
    width: 200,
    height: (200 / 16) * 9,
    autoPlay: false,
    loop: false,
    sources: videoSources,
    controlBar: {
      skipButtons: {
        forward: 5,
        backward: 5,
      },
    },
    playbackRates: [0.5, 1, 1.5, 2],
    disablePictureInPicture: false,
  };
  return (
    <div className="w-full rounded profile-video-card">
      <VideoPlayer {...videoProps} />

      <Title order={4} className="mt-3">
        {post.body}
      </Title>
      <div className="flex justify-between ">
        <Text>{dayjs(post.createdAt).format("MMMM D, YYYY")}</Text>
        {/* <Anchor
          onClick={() =>
            confirmModal({
              title: "Want to delete profile video?",
              cancelLabel: "No",
              confirmLabel: "Yes",
              isDangerous: true,
              onConfirm() {
                onRemove();
              },
            })
          }
          className="text-sm text-red-400 no-underline"
        >
          Delete
        </Anchor> */}
      </div>
    </div>
  );
};

export default ProfileFeedVideoCard;
