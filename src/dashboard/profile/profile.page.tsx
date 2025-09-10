import { Experience, User, UserEducation } from "@/_app/gql-types/graphql";
import { useQuery } from "@apollo/client";
import { Space, Tabs } from "@mantine/core";
import BasicInfoForm from "./components/BasicInfoForm";
import SkillsForm from "./components/SkillsForm";
import { SkillsFormType } from "./utils/profileSettingForm.config";
import { USER_PROFILE_DETAILS_QUERY } from "./utils/query/query.profile.settings";
import ExperienceForm from "./components/ExperienceForm";
import EducationForm from "./components/EducationForm";

const ProfilePage = () => {
  const { data, refetch } = useQuery<{
    me: User;
  }>(USER_PROFILE_DETAILS_QUERY);

  return (
    <Tabs defaultValue="BasicInfo">
      <Tabs.List>
        <Tabs.Tab value="BasicInfo">BasicInfo</Tabs.Tab>
        <Tabs.Tab value="Experiences">Experiences</Tabs.Tab>
        <Tabs.Tab value="Skills">Skills</Tabs.Tab>
        <Tabs.Tab value="Educations">Educations</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="BasicInfo">
        <Space h={20} />
        <BasicInfoForm basicInfo={data?.me as User} refetch={refetch} />
      </Tabs.Panel>

      <Tabs.Panel value="Experiences">
        <Space h={20} />
        <ExperienceForm experiences={data?.me?.experiences as Experience[]} />
      </Tabs.Panel>

      <Tabs.Panel value="Skills">
        <Space h={20} />
        <SkillsForm skills={data?.me?.skills as SkillsFormType} />
      </Tabs.Panel>

      <Tabs.Panel value="Educations">
        <Space h={20} />
        <EducationForm educations={data?.me?.educations as UserEducation[]} />
      </Tabs.Panel>
    </Tabs>
  );
};

export default ProfilePage;
