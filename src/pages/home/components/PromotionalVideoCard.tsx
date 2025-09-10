import { PromotionalVideo } from "@/_app/gql-types/graphql";
import { getFileUrl } from "@/_app/utils/getFileUrl";
import { Text } from "@mantine/core";
interface IProps {
  video: PromotionalVideo;
  isDetailsShow?: boolean;
}

const PromotionalVideoCard: React.FC<IProps> = ({ video, isDetailsShow }) => {
  const videoSources = [
    {
      src: getFileUrl(video?.video!, "video") || "",
      type: "video/mp4",
    },
  ];

  // const videoProps: VideoPlayerProps = {
  //   theme: "forest",
  //   sources: videoSources,
  // };

  return (
    <div>
      <div className="flex justify-center overflow-hidden rounded">
        {/* <VideoPlayer {...videoProps} /> */}
        <video
          src={videoSources[0].src}
          className="aspect-video max-h-[245px] w-full"
          onMouseEnter={(e) => {
            e.currentTarget.controls = true;
            e.currentTarget.play();
          }}
          onMouseLeave={(e) => {
            e.currentTarget.pause();
            e.currentTarget.controls = false;
          }}
        ></video>
      </div>

      {isDetailsShow ? (
        <Text size="lg" mt={"sm"}>
          {video?.title}
        </Text>
      ) : null}
    </div>
  );
};

export default PromotionalVideoCard;
// 65abad1db3ec9450c06f480f
