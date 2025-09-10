import DropzoneAvatar from "@/_app/common/components/DropzoneAvatar";
import { ServerFileReference, UserEducation } from "@/_app/gql-types/graphql";
import { useMutation } from "@apollo/client";
import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Accordion,
  Anchor,
  Button,
  Flex,
  Input,
  NumberInput,
  Paper,
  Space,
  Text,
  Textarea,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconCircleMinus, IconX } from "@tabler/icons-react";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import {
  EDUCATIONS_SETTING_FORM_SCHEMA,
  EducationFormType,
} from "../utils/profileSettingForm.config";
import { UPDATE_USER_PROFILE_MUTATION } from "../utils/query/query.profile.settings";

const EducationForm: React.FC<{
  educations: UserEducation[];
}> = ({ educations }) => {
  // form init here
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<EducationFormType>({
    defaultValues: {
      educations: [],
    },
    resolver: yupResolver(EDUCATIONS_SETTING_FORM_SCHEMA),
    mode: "onChange",
  });

  // make array form
  const { append, fields, remove } = useFieldArray({
    name: "educations",
    control,
  });

  // PREFILL FORM WITH DEFAULT VALUES
  useEffect(() => {
    setValue("educations", educations as any);
  }, [educations]);

  // API Mutation
  const [saveEducation, { loading: _saving__education }] = useMutation(
    UPDATE_USER_PROFILE_MUTATION,
    {
      onCompleted: () => {
        notifications.show({
          color: "teal",
          icon: <IconCheck size={18} />,
          message: "Education has been saved successfully",
        });
      },

      onError: () => {
        notifications.show({
          color: "red",
          icon: <IconX size={18} />,
          message: "Failed to save education!",
        });
      },
    }
  );

  // form submit here
  const educationFormSubmit: SubmitHandler<EducationFormType> = (values) => {
    saveEducation({
      variables: {
        body: {
          educations: values?.educations?.map((edu) => {
            let obj: any = {
              school: edu?.school,
              degree: edu?.degree,
              subjectOfStudy: edu?.subjectOfStudy,
              grade: edu?.grade,
              description: edu?.description,
              startDate: edu?.startDate,
              endDate: edu?.endDate,
            };

            if (edu.logo.path) {
              obj["logo"] = {
                path: edu?.logo.path,
                provider: edu?.logo.provider,
              };
            }

            return obj;
          }),
        },
      },
    });
  };

  console.log(errors);
  return (
    <div className="flex flex-col gap-4 ">
      <form
        onSubmit={handleSubmit(educationFormSubmit)}
        className="md:w-8/12 lg:10/12"
      >
        <Accordion className="flex flex-col gap-3">
          {fields.map((field, index) => (
            <Paper withBorder data-x-field={field.id}>
              <Accordion.Item
                key={index}
                value={`Educations Qualification - ${index + 1}`}
              >
                <Accordion.Control>
                  <Flex className="flex items-center justify-between">
                    <Text className="text-sm">
                      {watch(`educations.${index}.school`) ||
                        `Educations Qualification - ${index + 1}`}
                    </Text>

                    <Button
                      variant="subtle"
                      color="red"
                      size="compact-sm"
                      leftSection={<IconCircleMinus size={20} color="red" />}
                      onClick={() => remove(index)}
                    >
                      Remove
                    </Button>
                  </Flex>
                </Accordion.Control>

                <Accordion.Panel className="flex flex-col gap-3">
                  <Input.Wrapper
                    label="School"
                    error={
                      <ErrorMessage
                        errors={errors}
                        name={`educations.${index}.school`}
                      />
                    }
                  >
                    <Input {...register(`educations.${index}.school`)} />
                  </Input.Wrapper>
                  <Input.Wrapper
                    label="Institute Logo"
                    error={<ErrorMessage errors={errors} name="avatar" />}
                  >
                    <DropzoneAvatar
                      onChange={(file) => {
                        setValue(`educations.${index}.logo.path`, file?.path);
                        setValue(
                          `educations.${index}.logo.provider`,
                          file?.provider
                        );
                      }}
                      file={
                        (watch(
                          `educations.${index}.logo`
                        ) as ServerFileReference) || null
                      }
                      isLogo
                    />
                  </Input.Wrapper>
                  <Input.Wrapper
                    label="Degree"
                    error={
                      <ErrorMessage
                        errors={errors}
                        name={`educations.${index}.degree`}
                      />
                    }
                  >
                    <Input {...register(`educations.${index}.degree`)} />
                  </Input.Wrapper>

                  <Input.Wrapper
                    label="Fields of study"
                    error={
                      <ErrorMessage
                        errors={errors}
                        name={`educations.${index}.subjectOfStudy`}
                      />
                    }
                  >
                    <Input
                      {...register(`educations.${index}.subjectOfStudy`)}
                    />
                  </Input.Wrapper>

                  <Input.Wrapper
                    label="Grade"
                    error={
                      <ErrorMessage
                        errors={errors}
                        name={`educations.${index}.grade`}
                      />
                    }
                  >
                    <NumberInput
                      value={watch(`educations.${index}.grade`)}
                      onChange={(e) =>
                        setValue(`educations.${index}.grade`, e as number)
                      }
                    />
                  </Input.Wrapper>

                  <Space h={"xs"} />

                  <div className="flex gap-3">
                    <Input.Wrapper
                      className="w-full"
                      error={
                        <ErrorMessage
                          errors={errors}
                          name={`educations.${index}.startDate`}
                        />
                      }
                    >
                      <DatePickerInput
                        withAsterisk
                        label="Start date"
                        placeholder="Start date"
                        value={
                          dayjs(
                            watch(`educations.${index}.startDate`) ?? new Date()
                          ) as any
                        }
                        onChange={(date) =>
                          setValue(
                            `educations.${index}.startDate`,
                            date!.toISOString()
                          )
                        }
                      />
                    </Input.Wrapper>

                    <Input.Wrapper
                      className="w-full"
                      error={
                        <ErrorMessage
                          errors={errors}
                          name={`educations.${index}.endDate`}
                        />
                      }
                    >
                      <DatePickerInput
                        label="End date"
                        placeholder="End date"
                        value={
                          dayjs(
                            watch(`educations.${index}.endDate`) ?? new Date()
                          ) as any
                        }
                        onChange={(date) =>
                          setValue(
                            `educations.${index}.endDate`,
                            date!.toISOString()
                          )
                        }
                      />
                    </Input.Wrapper>
                  </div>
                  {/*  */}
                  {/*  */}
                  <Space h={"xs"} />

                  <Input.Wrapper
                    label="Description"
                    error={
                      <ErrorMessage
                        errors={errors}
                        name={`educations.${index}.description`}
                      />
                    }
                  >
                    <Textarea
                      size="lg"
                      {...register(`educations.${index}.description`)}
                    />
                  </Input.Wrapper>
                </Accordion.Panel>
              </Accordion.Item>
            </Paper>
          ))}
        </Accordion>

        <Space h={20} />
        {fields?.length ? (
          <Button type="submit" loading={_saving__education}>
            Save
          </Button>
        ) : null}
      </form>

      <Anchor
        onClick={() =>
          append({
            school: "",
            degree: "",
            subjectOfStudy: "",
            description: "",
            logo: {
              path: "",
              provider: "",
              fullUrl: "",
            },
            startDate: dayjs().toISOString(),
            endDate: dayjs().toISOString(),
          })
        }
      >
        Add Educations
      </Anchor>
    </div>
  );
};

export default EducationForm;
