import { Experience } from "@/_app/gql-types/graphql";
import { useMutation } from "@apollo/client";
import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Accordion,
  Anchor,
  Button,
  Checkbox,
  Flex,
  Input,
  Paper,
  Select,
  Space,
  Text,
  Textarea,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconCircleMinus } from "@tabler/icons-react";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import {
  Location__Type__Select__Value,
  Role__Type__Select__Value,
} from "../utils/RoleType";
import {
  EXPERIENCE_SETTING_FORM_SCHEMA,
  ExperienceFormType,
} from "../utils/profileSettingForm.config";
import { UPDATE_USER_PROFILE_MUTATION } from "../utils/query/query.profile.settings";

const ExperienceForm: React.FC<{
  experiences: Experience[];
}> = ({ experiences }) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ExperienceFormType>({
    defaultValues: {
      experiences: [],
    },
    resolver: yupResolver(EXPERIENCE_SETTING_FORM_SCHEMA),
    mode: "onChange",
  });

  // make filed array form
  const { append, fields, remove } = useFieldArray({
    name: "experiences",
    control,
  });

  // PREFILL FORM WITH DEFAULT VALUES
  useEffect(() => {
    setValue("experiences", experiences as any);
  }, [experiences]);

  // API Mutation
  const [saveExperiences, { loading: _saving__experiences }] = useMutation(
    UPDATE_USER_PROFILE_MUTATION,
    {
      onCompleted: () => {
        notifications.show({
          color: "teal",
          icon: <IconCheck size={18} />,
          message: "Experience has been saved successfully",
        });
      },
    }
  );

  // submit form
  const experienceFormSubmit: SubmitHandler<ExperienceFormType> = (values) => {
    saveExperiences({
      variables: {
        body: {
          experiences: values?.experiences?.map((exp) => {
            let obj: any = {
              title: exp?.title,
              locationType: exp?.locationType,
              companyName: exp?.companyName,
              roleType: exp?.roleType,
              description: exp?.description,
              isCurrentlyWorking: exp?.isCurrentlyWorking,
              endDate: exp?.endDate,
              startDate: exp?.startDate,
            };

            // if (exp?.logo?.path) {
            //   obj["logo"] = {
            //     path: exp?.logo.path,
            //     provider: exp?.logo.provider,
            //   };
            // }

            return obj;
          }),
        },
      },
    });
  };
  return (
    <div className="flex flex-col gap-4">
      <form
        onSubmit={handleSubmit(experienceFormSubmit)}
        className="md:w-8/12 lg:10/12"
      >
        <Accordion className="flex flex-col gap-3">
          {fields.map((field, index) => (
            <Paper key={index} withBorder data-x-field={field.id}>
              <Accordion.Item value={`Experience History - ${index + 1}`}>
                <Accordion.Control>
                  <Flex justify={"space-between"} align={"center"}>
                    <Text>
                      {watch(`experiences.${index}.title`) ||
                        `Experience History - ${index + 1}`}
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
                    label="Title"
                    error={
                      <ErrorMessage
                        errors={errors}
                        name={`experiences.${index}.title`}
                      />
                    }
                  >
                    <Input {...register(`experiences.${index}.title`)} />
                  </Input.Wrapper>

                  <Space h={"xs"} />

                  <Input.Wrapper
                    label="Role Type"
                    error={
                      <ErrorMessage
                        errors={errors}
                        name={`experiences.${index}.roleType`}
                      />
                    }
                  >
                    <Select
                      // placeholder='Pick a role'
                      data={Role__Type__Select__Value}
                      value={watch(`experiences.${index}.roleType`)}
                      onChange={(e) =>
                        setValue(`experiences.${index}.roleType`, e!)
                      }
                    />
                  </Input.Wrapper>

                  <Space h={"xs"} />

                  <Input.Wrapper
                    label="Company Name"
                    error={
                      <ErrorMessage
                        errors={errors}
                        name={`experiences.${index}.companyName`}
                      />
                    }
                  >
                    <Input {...register(`experiences.${index}.companyName`)} />
                  </Input.Wrapper>

                  <Space h={"xs"} />

                  <Input.Wrapper
                    label="Location Type"
                    error={
                      <ErrorMessage
                        errors={errors}
                        name={`experiences.${index}.locationType`}
                      />
                    }
                  >
                    <Select
                      data={Location__Type__Select__Value}
                      onChange={(e) =>
                        setValue(`experiences.${index}.locationType`, e!)
                      }
                      value={watch(`experiences.${index}.locationType`)}
                    />
                  </Input.Wrapper>

                  <Space h={"xs"} />

                  <Checkbox
                    name="isCurrentlyWorking"
                    checked={
                      watch(`experiences.${index}.isCurrentlyWorking`) || false
                    }
                    onChange={(e) =>
                      setValue(
                        `experiences.${index}.isCurrentlyWorking`,
                        Boolean(e.target.checked)
                      )
                    }
                    label="I am currently working in this role"
                  />

                  <Space h={"xs"} />

                  <div className="flex gap-3">
                    <Input.Wrapper
                      className="w-full"
                      error={
                        <ErrorMessage
                          errors={errors}
                          name={`experiences.${index}.startDate`}
                        />
                      }
                    >
                      <DatePickerInput
                        withAsterisk
                        className="w-full"
                        label="Joining Date"
                        placeholder="Joining Date"
                        value={
                          dayjs(
                            watch(`experiences.${index}.startDate`) ??
                              new Date()
                          ) as any
                        }
                        onChange={(date) =>
                          setValue(
                            `experiences.${index}.startDate`,
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
                          name={`experiences.${index}.endDate`}
                        />
                      }
                    >
                      <DatePickerInput
                        className="w-full"
                        label="End Date"
                        placeholder="End Date"
                        disabled={watch(
                          `experiences.${index}.isCurrentlyWorking`
                        )}
                        value={
                          dayjs(
                            watch(`experiences.${index}.endDate`) ?? new Date()
                          ) as any
                        }
                        onChange={(date) =>
                          setValue(
                            `experiences.${index}.endDate`,
                            date!.toISOString()
                          )
                        }
                      />
                    </Input.Wrapper>
                  </div>

                  <Space h={"xs"} />

                  <Input.Wrapper
                    label="Description"
                    error={
                      <ErrorMessage
                        errors={errors}
                        name={`experiences.${index}.description`}
                      />
                    }
                  >
                    <Textarea
                      size="lg"
                      defaultValue={watch(`experiences.${index}.description`)}
                      {...register(`experiences.${index}.description`)}
                    />
                  </Input.Wrapper>
                </Accordion.Panel>
              </Accordion.Item>
            </Paper>
          ))}
        </Accordion>

        <Space h={10} />

        <Anchor
          onClick={() =>
            append({
              title: "",
              locationType: "",
              companyName: "",
              roleType: "",
              isCurrentlyWorking: false,
              description: "",
              startDate: new Date().toISOString(),
              endDate: new Date().toISOString(),
              logo: {
                path: "",
                provider: "",
                fullUrl: "",
              },
            })
          }
        >
          Add Experience
        </Anchor>
        <Space h={20} />
        <div>
          <Button type="submit" loading={_saving__experiences}>
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ExperienceForm;
