import { Post, ServerFileReference } from "@/_app/gql-types/graphql";
import { useUploadVideo } from "@/_app/hooks/use-upload-file";
import { FOLDER__NAME } from "@/_app/models/FolderName";
import { Notify } from "@/_app/utils/Notify";
import { getFileUrl } from "@/_app/utils/getFileUrl";
import { useMutation } from "@apollo/client";
import { VideoPlayer } from "@graphland/react-video-player";
import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Flex, Group, Input, Space, Text, Title, rem } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { IconArrowBackUp, IconUpload, IconVideo, IconX } from "@tabler/icons-react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  IProfileVideosFormState,
  Profile_Video__Form__Validation__Schema,
} from "../profileVideo.form.validation";
import { CREATE_PROFILE_VIDEO_MUTATION } from "../utils/query.gql";

interface Props {
  onRefetch: () => void;
  onClose: () => void;
  proVideo?: Post;
}

const ProfileVideoForm: React.FC<Props> = ({ onRefetch, onClose }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<IProfileVideosFormState>({
    resolver: yupResolver(Profile_Video__Form__Validation__Schema),
  });

  const { uploadVideo, uploadingVideo: uploading } = useUploadVideo();

  const [uploadingVideo] = useMutation(
    CREATE_PROFILE_VIDEO_MUTATION,
    Notify({
      successTitle: "Promotional video create successfully",
      errorTitle: "Failed to Promotional video create.",
      onSuccess: () => {
        onClose();
        onRefetch();
      },
    })
  );

  const onSubmit: SubmitHandler<IProfileVideosFormState> = (values) => {
    uploadingVideo({
      variables: {
        input: {
          body: values.body,
          medias: [
            {
              media: values.video,
              type: "VIDEO",
            },
          ],
        },
      },
      onCompleted: () => {
        onRefetch();
        onClose();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Title order={3}>Create Profile Video</Title>
      <Space h={20} />
      <Input.Wrapper
        label="Title"
        error={<ErrorMessage errors={errors} name="body" />}
      >
        <Input placeholder="Title" {...register("body")} />
      </Input.Wrapper>

      <Space h={"sm"} />

      {watch("video.path") ? (
        <div>
          <Text fw={500}>Video</Text>
          <Space h={5} />

          <VideoPlayer
            width={391}
            height={(391 / 16) * 9}
            sources={[
              {
                src: getFileUrl(
                  {
                    path: watch("video.path"),
                    provider: watch("video.provider") as any,
                  } as ServerFileReference,
                  "video"
                ) as string,
                type: "video/mp4",
              },
            ]}
          />

          <Space h={5} />

          <Group>
            <Button
              leftSection={<IconArrowBackUp />}
              color="red"
              onClick={() => {
                setValue("video.path", "");
                setValue("video.provider", "");
              }}
              size="xs"
            >
              Reset
            </Button>
          </Group>
        </div>
      ) : (
        <Input.Wrapper label="Drop a video">
          <Dropzone
            onReject={(files) => console.log("rejected files", files)}
            onDrop={async (files) => {
              const result = await uploadVideo({
                file: files[0],
                folder: FOLDER__NAME.USER_FEED_VIDEO,
              });
              console.log(result);
              setValue("video.path", result?.data?.path);
              setValue("video.provider", result?.data?.provider);
            }}
            loading={uploading}
            h={200}
            radius={5}
            className="flex items-center justify-center"
            accept={["video/*"]}
          >
            
            <Dropzone.Accept>
              <IconUpload
                style={{
                  width: rem(52),
                  height: rem(52),
                  color: "var(--mantine-color-blue-6)",
                }}
                stroke={1.5}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <Flex direction={"column"} align={"center"}>
                <IconX
                  style={{
                    width: rem(52),
                    height: rem(52),
                    color: "var(--mantine-color-red-6)",
                  }}
                  stroke={1.5}
                />
                <Text>Only video file is allowed to drop here</Text>
              </Flex>
            </Dropzone.Reject>
            <Dropzone.Idle>
              <Flex direction={"column"} align={"center"}>
                <IconVideo
                  style={{
                    width: rem(52),
                    height: rem(52),
                    color: "var(--mantine-color-blue-6)",
                  }}
                  stroke={1.5}
                />
                <Text size="sm" c="gray">
                  Max size: 50MB
                </Text>
              </Flex>
            </Dropzone.Idle>
          </Dropzone>{" "}
        </Input.Wrapper>
      )}

      <Space h={"sm"} />

      <Button disabled={!watch("video.path")} type="submit" fullWidth>
        Save
      </Button>
    </form>
  );
};

export default ProfileVideoForm;
