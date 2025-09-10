import { useMutation } from "@apollo/client";
import { ErrorMessage } from "@hookform/error-message";
import { Anchor, Button, Flex, Input, Space } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import React, { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { SkillsFormType } from "../utils/profileSettingForm.config";
import { UPDATE_USER_PROFILE_MUTATION } from "../utils/query/query.profile.settings";

const SkillsForm: React.FC<{
  skills: SkillsFormType;
}> = ({ skills }) => {
  const {
    handleSubmit,
    control,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      skills: [""],
    },
    // resolver: yupResolver(SKILLS_SETTING_FORM_SCHEMA),
    // mode: 'onChange',
  });

  const { append, fields, remove } = useFieldArray({
    // @ts-ignore
    name: "skills",
    control,
  });

  // PREFILL FORM WITH DEFAULT VALUES
  useEffect(() => {
    console.log("first", skills);
    setValue("skills", skills as any);
  }, [skills]);

  // API Mutation
  const [saveSkills, { loading: _saving__skills }] = useMutation(
    UPDATE_USER_PROFILE_MUTATION,
    {
      onCompleted: () => {
        notifications.show({
          color: "teal",
          icon: <IconCheck size={18} />,
          message: "Skills has been saved successfully",
        });
      },
      onError: () => {
        notifications.show({
          color: "red",
          icon: <IconX size={18} />,
          message: "Failed to save skills!",
        });
      },
    }
  );

  const skillsFormSubmit = (values: any) => {
    saveSkills({
      variables: {
        body: {
          skills: values?.skills,
        },
      },
    });
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <form
          onSubmit={handleSubmit(skillsFormSubmit)}
          className="md:w-8/12 lg:10/12"
        >
          {fields.map((_, index) => (
            <Input.Wrapper
              label="Skill name"
              error={
                <ErrorMessage errors={errors} name={`skills.${index}.title`} />
              }
            >
              <Flex align={"center"} gap={10}>
                <Input w={300} {...register(`skills.${index}`)} required />
                <IconX
                  size={20}
                  color="red"
                  onClick={() => remove(index)}
                  style={{ cursor: "pointer" }}
                />
              </Flex>
            </Input.Wrapper>
          ))}
          <Anchor onClick={() => append("")}>Add Skills</Anchor>
          <Space h={20} />
          <Button type="submit" loading={_saving__skills}>
            Save
          </Button>
        </form>
      </div>
    </>
  );
};

export default SkillsForm;
{
  /* <>
					<Spotlight
						actions={actions}
						nothingFound='Nothing found...'
						highlightQuery
						searchProps={{
							leftSection: <IconSearch size={20} stroke={1.5} />,
							placeholder: 'Search...',
						}}
					/>
				</> */
}
