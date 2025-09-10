import DropzoneAvatar from "@/_app/common/components/DropzoneAvatar";
import { ServerFileReference, User } from "@/_app/gql-types/graphql";
import { useMutation } from "@apollo/client";
import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Card,
  Group,
  Input,
  Space,
  Text,
  Textarea,
  rem,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconArrowBackUp, IconCheck, IconPhotoBolt } from "@tabler/icons-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { UPDATE_USER_PROFILE_MUTATION } from "../utils/query/query.profile.settings";
import {
  BasicInfoFormType,
  PROFILE_SETTING_BASIC_INFO_FORM_SCHEMA,
} from "./../utils/profileSettingForm.config";
import { Dropzone } from "@mantine/dropzone";
import { useUploadFile } from "@/_app/hooks/use-upload-file";
import { getFileUrl } from "@/_app/utils/getFileUrl";
import { userAtom } from "@/_app/store/user.store";
import { useAtom } from "jotai";

interface Props {
  basicInfo: User;
  refetch: () => void;
}

const BasicInfoForm: React.FC<Props> = ({ basicInfo, refetch }) => {
  const [_user, setGlobalUser] = useAtom(userAtom);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<BasicInfoFormType>({
    resolver: yupResolver(PROFILE_SETTING_BASIC_INFO_FORM_SCHEMA),
    mode: "onChange",
  });

  // API Mutation
  const [saveInfo, { loading }] = useMutation(UPDATE_USER_PROFILE_MUTATION, {
    onCompleted: () => {
      notifications.show({
        color: "teal",
        icon: <IconCheck size={18} />,
        message: "BasicInfo has been saved successfully",
      });
      refetch();
    },
  });

  useEffect(() => {
    setValue("name", basicInfo?.name || "");
    setValue("email", basicInfo?.email || "");
    setValue("designation", basicInfo?.designation || "");
    setValue("tagLine", basicInfo?.tagLine || "");
    setValue("overview", basicInfo?.overview || "");
    setValue("phoneNumber", basicInfo?.phoneNumber || "");

    if (basicInfo?.avatar) {
      setValue("avatar.path", basicInfo?.avatar?.path || "");
      setValue("avatar.provider", basicInfo?.avatar?.provider || "");
    }

    if (basicInfo?.cover) {
      setValue("cover.path", basicInfo?.cover?.path || "");
      setValue("cover.provider", basicInfo?.cover?.provider || "");
    }
  }, [basicInfo]);

  const basicInfoFormSubmit = (values: any) => {
    if (values.avatar.path === "") {
      values.avatar = null;
    }

    if (values.cover.path === "") {
      values.cover = null;
    }

    saveInfo({
      variables: {
        body: values,
      },
    });
  };

  const { uploadFile: uploadCoverFile, uploading: uploadingCover } =
    useUploadFile();

  return (
    <Card
      title="Basic Information"
      shadow="sm"
      className="w-full md:w-9/12 lg:w-10/12"
    >
      <Card.Section p={"xs"} withBorder>
        <Text>Basic Information</Text>
      </Card.Section>
      <Space h={20} />
      <form
        onSubmit={handleSubmit(basicInfoFormSubmit)}
        className="flex flex-col gap-2"
      >
        <div className="flex flex-col justify-center gap-4 md:flex-row md:justify-between">
          <Input.Wrapper
            label="Profile Picture"
            error={<ErrorMessage errors={errors} name="avatar" />}
          >
            <DropzoneAvatar
              onChange={(file) => {
                saveInfo({
                  variables: {
                    body: {
                      avatar: {
                        path: file?.path,
                        provider: file?.provider,
                      },
                    },
                  },
                }).then(() => {
                  setGlobalUser({
                    ..._user,
                    avatar: {
                      path: file?.path as string,
                      // @ts-ignore
                      provider: file?.provider as ServerFileReference,
                    },
                  });
                });
              }}
              file={(watch("avatar") as ServerFileReference) || null}
            />
          </Input.Wrapper>
          <div className="w-full">
            {watch("cover.path") ? (
              <div>
                <Text fw={500}>Cover</Text>
                <Space h={5} />
                <img
                  src={
                    getFileUrl({
                      path: watch("cover.path"),
                      provider: watch("cover.provider") as any,
                    } as ServerFileReference)!
                  }
                  alt="company__cover"
                  height={200}
                  className="rounded !h-[200px] object-cover w-full overflow-hidden"
                />
                <Space h={5} />

                <Group>
                  <Button
                    leftSection={<IconArrowBackUp />}
                    color="red"
                    onClick={() => {
                      setValue("cover.path", "");
                      setValue("cover.provider", "");
                      saveInfo({
                        variables: {
                          body: { cover: null },
                        },
                      });
                    }}
                    size="xs"
                  >
                    Remove Cover
                  </Button>
                </Group>
              </div>
            ) : (
              <Input.Wrapper label="Select cover">
                <Dropzone
                  onDrop={async (files) => {
                    const result = await uploadCoverFile({
                      file: files[0],
                      folder: "Company__Cover",
                    });
                    setValue("cover.path", result?.data?.path);
                    setValue("cover.provider", result?.data?.provider);
                    saveInfo({
                      variables: {
                        body: {
                          cover: {
                            path: result?.data?.path,
                            provider: result?.data?.provider,
                          },
                        },
                      },
                    });
                  }}
                  loading={uploadingCover}
                  maxSize={3 * 1024 ** 2}
                  h={200}
                  className="flex items-center justify-center"
                >
                  <IconPhotoBolt
                    style={{
                      width: rem(52),
                      height: rem(52),
                      color: "var(--mantine-color-blue-6)",
                    }}
                    stroke={1.5}
                  />
                </Dropzone>{" "}
              </Input.Wrapper>
            )}
          </div>
        </div>

        <Input.Wrapper
          label="Name"
          error={<ErrorMessage errors={errors} name="name" />}
        >
          <Input
            {...register("name")}
            error={errors.name && errors.name.message}
          />
        </Input.Wrapper>

        <Input.Wrapper
          label="Email"
          error={<ErrorMessage errors={errors} name="email" />}
        >
          <Input
            {...register("email")}
            error={errors.name && errors?.email?.message}
          />
        </Input.Wrapper>

        <Input.Wrapper
          label="Phone Number"
          error={<ErrorMessage errors={errors} name="phoneNumber" />}
        >
          <Input
            {...register("phoneNumber")}
            error={errors.phoneNumber && errors?.phoneNumber?.message}
          />
        </Input.Wrapper>

        <Input.Wrapper
          label="Designation"
          error={<ErrorMessage errors={errors} name="designation" />}
        >
          <Input
            {...register("designation")}
            error={errors.name && errors?.designation?.message}
          />
        </Input.Wrapper>

        <Input.Wrapper
          label="Tagline"
          error={<ErrorMessage errors={errors} name="tagLine" />}
        >
          <Textarea size="sm" {...register("tagLine")} />
        </Input.Wrapper>
        <Input.Wrapper
          label="Overview"
          error={<ErrorMessage errors={errors} name="overview" />}
        >
          <Textarea size="md" {...register("overview")} />
        </Input.Wrapper>

        <div>
          <Button type="submit" loading={loading}>
            Save
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default BasicInfoForm;
