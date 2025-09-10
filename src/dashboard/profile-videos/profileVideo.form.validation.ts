import * as Yup from "yup";

export const Profile_Video__Form__Validation__Schema = Yup.object().shape({
  body: Yup.string().required().label("Title"),
  video: Yup.object()
    .shape({
      path: Yup.string().optional().nullable().label("Path"),
      provider: Yup.string().optional().nullable().label("Provider"),
    })
    .label("Video"),
});

export type IProfileVideosFormState = Yup.InferType<
  typeof Profile_Video__Form__Validation__Schema
>;
