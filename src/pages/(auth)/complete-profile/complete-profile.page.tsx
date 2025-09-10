import { Notify } from "@/_app/utils/Notify";
import { useMutation } from "@apollo/client";
import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input, PasswordInput, Space, Title } from "@mantine/core";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as Yup from "yup";
import { Complete__Profile__Mutation } from "./utils/query.gql";

const CompleteProfilePage = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: params.get("email")!,
    },
  });

  const [saveProfile, { loading: saving__details }] = useMutation(
    Complete__Profile__Mutation,
    Notify({
      successTitle: "Profile completed successfully",
      onSuccess: (data: any) => {
        console.log(data);
        if (
          data.completeProfile.roles.includes("ADMIN") ||
          data.completeProfile.roles.includes("RECRUITER")
        ) {
          window.location.href = `${
            import.meta.env.VITE_PORTAL_URL
          }/direct-login?access-token=${data.completeProfile.accessToken}`;
          return;
        }

        localStorage.setItem("accessToken", data.completeProfile.accessToken);
        navigate("/");
      },
    })
  );

  const handleCompleteProfile = (data: IForm) => {
    saveProfile({
      variables: {
        input: {
          name: data.name,
          email: data.email,
          password: data.password,
          ref: params.get("ref"),
          refId: params.get("refId"),
          token: params.get("token"),
        },
      },
    });
  };
  return (
    <div className="flex flex-col text-center text-white">
      <Title order={2} className="text-white">
        Complete your profile
      </Title>

      <Space h={"md"} />

      <form
        onSubmit={handleSubmit(handleCompleteProfile)}
        className="flex flex-col gap-5 text-left"
      >
        <Input.Wrapper
          label="Name"
          error={<ErrorMessage name={"name"} errors={errors} />}
        >
          <Input placeholder="Your Name" {...register("name")} />
        </Input.Wrapper>

        <Input.Wrapper
          label="Email"
          error={<ErrorMessage name={"email"} errors={errors} />}
        >
          <Input disabled placeholder="Email address" {...register("email")} />
        </Input.Wrapper>

        <Input.Wrapper
          label="Password"
          error={<ErrorMessage name={"password"} errors={errors} />}
        >
          <PasswordInput
            placeholder="Password"
            type={"password"}
            {...register("password")}
          />
        </Input.Wrapper>

        <Input.Wrapper
          label="Confirm Password"
          error={<ErrorMessage name={"confirmPassword"} errors={errors} />}
        >
          <PasswordInput
            placeholder="Confirm Password"
            type={"password"}
            {...register("confirmPassword")}
          />
        </Input.Wrapper>

        <Button loading={saving__details} type="submit" mt={"md"}>
          Continue
        </Button>
      </form>
    </div>
  );
};

export default CompleteProfilePage;

const schema = Yup.object().shape({
  name: Yup.string().required().max(50).label("Name"),
  email: Yup.string().required().label("Email"),
  password: Yup.string().required().min(8).max(50).label("Password"),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .label("Confirm Password"),
});

type IForm = Yup.InferType<typeof schema>;
