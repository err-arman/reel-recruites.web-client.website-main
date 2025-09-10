// export const INTERVIEW_FINAL_SUBMISSION_FORM_SCHEMA = Yup.object().shape({
//   experiences: Yup.array(
//     Yup.object().shape({
//       title: Yup.string().required().label("Title"),
//       locationType: Yup.string().required().label("Location type"),
//     })
//   ),
//   phoneNumber: Yup.string().min(11).max(11).optional().label("Phone Number"),
// });

// export type ExperienceFormType = Yup.InferType<
//   typeof INTERVIEW_FINAL_SUBMISSION_FORM_SCHEMA
// >;
