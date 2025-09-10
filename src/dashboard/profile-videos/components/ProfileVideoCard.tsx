import { Post } from "@/_app/gql-types/graphql";
import { confirmModal } from "@/_app/utils/confirm";
import { getFileUrl } from "@/_app/utils/getFileUrl";
import { VideoPlayer, VideoPlayerProps } from "@graphland/react-video-player";
import { Anchor, Text, Title } from "@mantine/core";
import dayjs from "dayjs";

interface Props {
  post: Post;
  onRemove: () => void;
}
const ProfileVideoCard: React.FC<Props> = ({ post, onRemove }) => {
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
    width: 300,
    height: (300 / 16) * 9,
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
    onReady: () => {
      console.log("Video player is ready!");
    },
  };
  return (
    <div className="rounded w-full px-4">
      <div className="profile-video-card">
        <VideoPlayer {...videoProps} />
      </div>

      <Title order={4} className="mt-3">
        {post.body}
      </Title>
      <div className="flex items-center gap-4 w-full">
        <Text>{dayjs(post.createdAt).format("MMMM D, YYYY")}</Text>
        <Anchor
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
          className="text-red-400 no-underline text-sm"
        >
          Delete
        </Anchor>
      </div>
    </div>
  );
};

export default ProfileVideoCard;
