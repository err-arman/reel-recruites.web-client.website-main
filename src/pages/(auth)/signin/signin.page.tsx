import AppCaptcha from "@/_app/common/components/AppCaptcha";
import { LoginResponseDto } from "@/_app/gql-types/graphql";
import { auth } from "@/_app/utils/firebase";
import { getGqlErrorMessage } from "@/_app/utils/gql-errors";
import { useMutation } from "@apollo/client";
import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Anchor,
  Button,
  Input,
  PasswordInput,
  Space,
  Text,
  Title,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaGithub, FaGoogle, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { FIREBASE_LOGIN_MUTATION, LOGIN_MUTATION } from "./utils/query.gql";
import { useState } from "react";

const LoginPage = () => {
  const [captchaToken, setChaptchaToken] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    resolver: yupResolver(schema),
  });

  const [mutate, { loading: submitting }] = useMutation<{
    login: LoginResponseDto;
  }>(LOGIN_MUTATION, {
    onCompleted(data) {
      if (
        data.login.roles.includes("ADMIN") ||
        data.login.roles.includes("RECRUITER")
      ) {
        window.location.href = `https://portal.reel-recruits.com/direct-login?access-token=${data?.login?.accessToken}`;
        return;
      }
      localStorage.setItem("accessToken", data.login.accessToken);

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
        title: "Failed to login",
        message: getGqlErrorMessage(data),
        color: "red",
      });
    },
  });

  const [firebaseLoginMutation, { loading: loadingFirebaseLogin }] =
    useMutation(FIREBASE_LOGIN_MUTATION, {
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

  const loginFormSubmit: SubmitHandler<IForm> = (data) => {
    mutate({ variables: { input: { ...data, captchaToken } } });
  };

  const handleSocialLogin = async (providerName: string) => {
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
        params.append("state", JSON.stringify({ isCreateAccount: false }));
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
            isCreateAccount: false,
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
        Login now
      </Title>
      {/* <Text>Richer the on monitor amped the her for fresh</Text> */}
      <Space h={"md"} />
      <form
        action="#"
        onSubmit={handleSubmit(loginFormSubmit)}
        className="flex flex-col gap-4 text-left"
      >
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

        <AppCaptcha onVerify={setChaptchaToken} />

        <Button
          loading={submitting || loadingFirebaseLogin}
          type="submit"
          mt={"md"}
        >
          Login
        </Button>

        <div className="flex flex-col gap-2">
          <Anchor
            className="text-sm no-underline text-slate-400"
            component={Link}
            to="/auth/forget-password"
          >
            Forgot Password?
          </Anchor>

          <Text>
            Don't have any account?{" "}
            <Anchor
              className="text-sm no-underline text-slate-400"
              component={Link}
              to="/auth/signup"
            >
              Signup Now
            </Anchor>
          </Text>
        </div>

        <div className="my-10 text-center">
          <Text>Or sign in with</Text>
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
      </form>
    </div>
  );
};

export default LoginPage;

const schema = yup.object().shape({
  password: yup.string().required().min(8).max(50).label("Password"),
  email: yup.string().required().label("Email"),
});

type IForm = yup.InferType<typeof schema>;
