import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  Anchor,
  Button,
  Checkbox,
  Input,
  PasswordInput,
  Radio,
  Space,
  Text,
  Title,
} from "@mantine/core";
// import { notifications } from "@mantine/notifications";
// import { signIn } from "next-auth/react";
import AppCaptcha from "@/_app/common/components/AppCaptcha";
import { LoginResponseDto } from "@/_app/gql-types/graphql";
import { MutationCallbackToaster } from "@/_app/utils/MutationCallbackToaster";
import { auth } from "@/_app/utils/firebase";
import { getGqlErrorMessage } from "@/_app/utils/gql-errors";
import { useMutation } from "@apollo/client";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "@firebase/auth";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaGithub, FaGoogle, FaLinkedin } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { FIREBASE_LOGIN_MUTATION } from "../signin/utils/query.gql";
import { REGISTER_MUTATION } from "./utils/query.gql";

const SignupPage = () => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [captchaToken, setChaptchaToken] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      role: "JOB_SEEKER",
    },
  });
  //

  const [firebaseLoginMutation] = useMutation(FIREBASE_LOGIN_MUTATION, {
    onCompleted(data) {
      if (
        data.getTokenByFirebaseIdToken.roles.includes("ADMIN") ||
        data.getTokenByFirebaseIdToken.roles.includes("RECRUITER")
      ) {
        window.location.href = `https://portal.reel-recruits.com/direct-login?access-token=${data?.getTokenByFirebaseIdToken?.accessToken}`;
        return;
      }
      localStorage.setItem(
        "accessToken",
        data.getTokenByFirebaseIdToken.accessToken
      );

      // check if there is any redirect url
      const url = new URL(window.location.href);
      const redirect = url.searchParams.get("redirect");
      console.log(redirect);

      // if there is any redirect url then redirect to that url
      if (redirect) {
        window.location.href = redirect;
      } else {
        window.location.href = "/";
      }
    },
    onError(data) {
      showNotification({
        title: getGqlErrorMessage(data),
        message: "",
        color: "red",
      });
    },
  });

  const [mutate, { loading: submitting }] = useMutation<{
    login: LoginResponseDto;
  }>(
    REGISTER_MUTATION,
    MutationCallbackToaster({
      successTitle: "Signed up successfully",
      onSuccess: () => {
        navigate("/auth/signin");
      },
    })
  );

  const loginFormSubmit: SubmitHandler<IForm> = (data) => {
    if (!checked) {
      showNotification({
        title: "You did not agree our terms and conditions",
        message: "",
        color: "red",
      });
      return;
    }

    mutate({
      variables: {
        input: {
          name: data.name,
          email: data.email,
          password: data.password,
          role: data?.role,
          captchaToken: captchaToken,
        },
      },
    });
  };

  const handleSocialLogin = async (providerName: string) => {
    // let provider: AuthProvider;
    let provider: any;
    switch (providerName) {
      case "google":
        provider = new GoogleAuthProvider();
        break;
      case "github":
        provider = new GithubAuthProvider();
        break;
      case "linkedin":
        const params = new URLSearchParams();
        params.append("response_type", "code");
        params.append("client_id", "78hy831my4j4b5");
        params.append(
          "redirect_uri",
          `${import.meta.env.VITE_APP_URL}/oauth/linkedin/callback`
        );
        params.append(
          "state",
          JSON.stringify({ isCreateAccount: true, role: watch("role") })
        );
        params.append("scope", "openid,profile,email");

        const url =
          "https://www.linkedin.com/oauth/v2/authorization?" +
          params.toString();

        window.location.href = url;
        provider = "linkedin";
        break;
      default:
        provider = new GoogleAuthProvider();
        break;
    }

    signInWithPopup(auth, provider).then(async (result) => {
      const token = await result.user.getIdToken();
      firebaseLoginMutation({
        variables: {
          input: {
            isCreateAccount: true,
            role: watch("role"),
            captchaToken,
            firebaseToken: token,
          },
        },
      });
    });
  };

  return (
    <div className="flex flex-col text-center text-white">
      <Title order={2} className="text-white">
        Signup now
      </Title>
      {/* <Text>Richer the on monitor amped the her for fresh</Text> */}
      <Space h={"md"} />
      <form
        action="#"
        onSubmit={handleSubmit(loginFormSubmit)}
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
          <Input placeholder="Email address" {...register("email")} />
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

        <div className="flex items-center gap-4">
          <Radio
            label="I am Job seeker"
            {...register("role")}
            value={"JOB_SEEKER"}
          />
          <Radio
            label="I am Recruiter"
            {...register("role")}
            value={"RECRUITER"}
          />
        </div>

        <Checkbox
          label="I have agreed to all terms & condition of reelrecruits"
          color="gray"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />

        <AppCaptcha onVerify={setChaptchaToken} />

        <Button loading={submitting} type="submit" mt={"md"}>
          Signup
        </Button>

        <div className="flex flex-col gap-2">
          <Anchor
            className="text-sm no-underline text-slate-400"
            component={Link}
            to="/auth/forget_password"
          >
            Forgot Password?
          </Anchor>

          <Text>
            Already have an account?{" "}
            <Anchor
              className="text-sm no-underline text-slate-400"
              component={Link}
              to="/auth/signin"
            >
              Signin Now
            </Anchor>
          </Text>
        </div>
      </form>

      <div className="my-10 text-center">
        <Text>Or sign up with</Text>
        <div className="grid justify-center grid-cols-3 gap-2 mt-2">
          <button
            type="button"
            className="flex items-center justify-center gap-1 px-4 py-2 bg-red-500 border-none rounded-md cursor-pointer"
            onClick={() => handleSocialLogin("google")}
          >
            <FaGoogle className="text-2xl text-white" />
            <p>Google</p>
          </button>

          <button
            type="button"
            className="flex items-center justify-center gap-1 px-4 py-2 border-none rounded-md cursor-pointer bg-slate-800"
            onClick={() => handleSocialLogin("github")}
          >
            <FaGithub className="text-2xl text-white" />
            <p>Github</p>
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-1 px-4 py-2 border-none rounded-md cursor-pointer bg-[#0B65C2]"
            onClick={() => handleSocialLogin("linkedin")}
          >
            <FaLinkedin className="text-2xl text-white" />
            <p>Linkedin</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

const schema = yup.object().shape({
  name: yup.string().required().max(50).label("Name"),
  email: yup.string().required().label("Email"),
  password: yup.string().required().min(8).max(50).label("Password"),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password")], "Passwords must match")
    .label("Confirm Password"),
  role: yup.string().oneOf(["JOB_SEEKER", "RECRUITER"]).label("Role"),
});

type IForm = yup.InferType<typeof schema>;
