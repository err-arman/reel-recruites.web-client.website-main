import * as Yup from "yup";

export const PROFILE_SETTING_BASIC_INFO_FORM_SCHEMA = Yup.object().shape({
  name: Yup.string().optional().label("Name"),
  email: Yup.string().optional().label("Email"),
  designation: Yup.string().optional().label("Designation"),
  phoneNumber: Yup.string().min(11).max(11).optional().label("Phone Number"),
  overview: Yup.string().optional().label("Overview"),
  tagLine: Yup.string().optional().label("Tagline"),
  avatar: Yup.object()
    .shape({
      path: Yup.string().optional().nullable().label("Path"),
      provider: Yup.string().optional().nullable().label("Provider"),
      fullUrl: Yup.string().optional().nullable().label("Full url"),
    })
    .label("Logo"),
  cover: Yup.object()
    .shape({
      path: Yup.string().optional().nullable().label("Path"),
      provider: Yup.string().optional().nullable().label("Provider"),
    })
    .label("Cover"),
});

export type BasicInfoFormType = Yup.InferType<
  typeof PROFILE_SETTING_BASIC_INFO_FORM_SCHEMA
>;

/* EXPERIENCE */
export const EXPERIENCE_SETTING_FORM_DEFAULT_VALUE = {
  title: "",
  employeeType: "",
  companyName: "",
  jobRoleType: "",
  description: "",
};

export const EXPERIENCE_SETTING_FORM_SCHEMA = Yup.object().shape({
  experiences: Yup.array(
    Yup.object().shape({
      title: Yup.string().required().label("Title"),
      locationType: Yup.string().required().label("Location type"),
      companyName: Yup.string().required().label("Company name"),
      roleType: Yup.string().required().label("Job role type"),
      description: Yup.string().optional().label("Description"),
      isCurrentlyWorking: Yup.boolean().optional().label("Currently working"),
      startDate: Yup.string().required().label("Start date"),
      endDate: Yup.string().optional().nullable().label("End date"),
      logo: Yup.object()
        .shape({
          path: Yup.string().optional().nullable().label("Path"),
          provider: Yup.string().optional().nullable().label("Provider"),
          fullUrl: Yup.string().optional().nullable().label("Full url"),
        })
        .label("Logo"),
    })
  ),
});

export type ExperienceFormType = Yup.InferType<
  typeof EXPERIENCE_SETTING_FORM_SCHEMA
>;

//skills

export const SKILLS_SETTING_FORM_SCHEMA = Yup.object().shape({
  skills: Yup.array()
    .of(Yup.string().required("Skill is required"))
    .min(1, "At least one skill is required"),
});
export type SkillsFormType = Yup.InferType<typeof SKILLS_SETTING_FORM_SCHEMA>;

//Education
export const EDUCATIONS_SETTING_FORM_SCHEMA = Yup.object().shape({
  educations: Yup.array(
    Yup.object().shape({
      school: Yup.string().required().label("school"),
      degree: Yup.string().required().label("Degree"),
      subjectOfStudy: Yup.string().required().label("Fields Of Study"),
      grade: Yup.number().optional().label("Grade"),
      description: Yup.string().optional().label("Description"),
      startDate: Yup.string().required().label("Start date"),
      endDate: Yup.string().optional().nullable().label("End date"),
      logo: Yup.object()
        .shape({
          path: Yup.string().optional().nullable().label("Path"),
          provider: Yup.string().optional().nullable().label("Provider"),
          fullUrl: Yup.string().optional().nullable().label("Full url"),
        })
        .label("Logo"),
    })
  ),
});
export type EducationFormType = Yup.InferType<
  typeof EDUCATIONS_SETTING_FORM_SCHEMA
>;
