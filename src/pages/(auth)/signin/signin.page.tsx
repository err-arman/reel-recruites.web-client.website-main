import { initiateSSoLogin } from "@/_app/utils/sso-auth";
import { useEffect } from "react";

const LoginPage = () => {
  useEffect(() => {
      initiateSSoLogin();
  }, []);
  return (
    <div>
      <h1>Login Page</h1>
    </div>
  );
};

export default LoginPage;

// import AppCaptcha from "@/_app/common/components/AppCaptcha";
// import { LoginResponseDto } from "@/_app/gql-types/graphql";
// import { auth } from "@/_app/utils/firebase";
// import { getGqlErrorMessage } from "@/_app/utils/gql-errors";
// import { useMutation } from "@apollo/client";
// import { ErrorMessage } from "@hookform/error-message";
// import { yupResolver } from "@hookform/resolvers/yup";
// import {
//   Anchor,
//   Button,
//   Input,
//   PasswordInput,
//   Text,
//   Title,
//   Divider,
//   Paper,
// } from "@mantine/core";
// import { showNotification } from "@mantine/notifications";
// import {
//   GithubAuthProvider,
//   GoogleAuthProvider,
//   signInWithPopup,
// } from "firebase/auth";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { FaGithub, FaGoogle, FaLinkedin } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import * as yup from "yup";
// import { FIREBASE_LOGIN_MUTATION, LOGIN_MUTATION } from "./utils/query.gql";
// import { useState } from "react";

// const LoginPage = () => {
//   const [captchaToken, setChaptchaToken] = useState("");

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<IForm>({
//     resolver: yupResolver(schema),
//   });

//   const [mutate, { loading: submitting }] = useMutation<{
//     login: LoginResponseDto;
//   }>(LOGIN_MUTATION, {
//     onCompleted(data) {
      
//       if (
//         data.login.roles.includes("ADMIN") ||
//         data.login.roles.includes("RECRUITER")
//       ) {
//         window.location.href = `https://portal.reel-recruits.com/direct-login?access-token=${data?.login?.accessToken}`;
//         return;
//       }
//       localStorage.setItem("accessToken", data.login.accessToken);

//       // check if there is any redirect url
//       const url = new URL(window.location.href);
//       const redirect = url.searchParams.get("redirect");
//       console.log(redirect);
//       // if there is any redirect url then redirect to that url
//       if (redirect) {
//         window.location.href = redirect;
//       } else {
//         window.location.href = "/";
//       }
//     },
//     onError(data) {
//       showNotification({
//         title: "Failed to login",
//         message: getGqlErrorMessage(data),
//         color: "red",
//       });
//     },
//   });

//   const [firebaseLoginMutation, { loading: loadingFirebaseLogin }] =
//     useMutation(FIREBASE_LOGIN_MUTATION, {
//       onCompleted(data) {
//         if (
//           data.getTokenByFirebaseIdToken.roles.includes("ADMIN") ||
//           data.getTokenByFirebaseIdToken.roles.includes("RECRUITER")
//         ) {
//           window.location.href = `https://portal.reel-recruits.com/direct-login?access-token=${data?.getTokenByFirebaseIdToken?.accessToken}`;
//           return;
//         }
//         localStorage.setItem(
//           "accessToken",
//           data.getTokenByFirebaseIdToken.accessToken
//         );

//         // check if there is any redirect url
//         const url = new URL(window.location.href);
//         const redirect = url.searchParams.get("redirect");
//         console.log(redirect);

//         // if there is any redirect url then redirect to that url
//         if (redirect) {
//           window.location.href = redirect;
//         } else {
//           window.location.href = "/";
//         }
//       },
//       onError(data) {
//         showNotification({
//           title: getGqlErrorMessage(data),
//           message: "",
//           color: "red",
//         });
//       },
//     });

//   const loginFormSubmit: SubmitHandler<IForm> = (data) => {
//     mutate({ variables: { input: { ...data, captchaToken } } });
//   };

//   const handleSocialLogin = async (providerName: string) => {
//     let provider: any;
//     switch (providerName) {
//       case "google":
//         provider = new GoogleAuthProvider();
//         break;
//       case "github":
//         provider = new GithubAuthProvider();
//         break;
//       case "linkedin":
//         const params = new URLSearchParams();
//         params.append("response_type", "code");
//         params.append("client_id", "78hy831my4j4b5");
//         params.append(
//           "redirect_uri",
//           `${import.meta.env.VITE_APP_URL}/oauth/linkedin/callback`
//         );
//         params.append("state", JSON.stringify({ isCreateAccount: false }));
//         params.append("scope", "openid,profile,email");

//         const url =
//           "https://www.linkedin.com/oauth/v2/authorization?" +
//           params.toString();

//         window.location.href = url;
//         provider = "linkedin";
//         break;
//       default:
//         provider = new GoogleAuthProvider();
//         break;
//     }

//     signInWithPopup(auth, provider).then(async (result) => {
//       const token = await result.user.getIdToken();
//       firebaseLoginMutation({
//         variables: {
//           input: {
//             isCreateAccount: false,
//             captchaToken,
//             firebaseToken: token,
//           },
//         },
//       });
//     });
//   };

//   return (
//     <div className="flex flex-col h-full">
//       <div className="flex flex-col items-center justify-center w-full">
//         <Paper
//           shadow="md"
//           radius="md"
//           p="xl"
//           withBorder
//           className="w-full max-w-md bg-white"
//         >
//           <Title order={2} className="text-center text-gray-800 mb-1">
//             Welcome Back
//           </Title>
//           <Text size="sm" color="dimmed" className="text-center mb-6">
//             Sign in to your account to continue
//           </Text>
          
//           <form
//             action="#"
//             onSubmit={handleSubmit(loginFormSubmit)}
//             className="flex flex-col gap-4"
//           >
//             <Input.Wrapper
//               label="Email"
//               error={<ErrorMessage name={"email"} errors={errors} />}
//             >
//               <Input 
//                 placeholder="Your email address" 
//                 {...register("email")}
//                 size="md"
//               />
//             </Input.Wrapper>

//             <Input.Wrapper
//               label="Password"
//               error={<ErrorMessage name={"password"} errors={errors} />}
//             >
//               <PasswordInput
//                 placeholder="Your password"
//                 type={"password"}
//                 {...register("password")}
//                 size="md"
//               />
//             </Input.Wrapper>

//             <Anchor
//               className="text-sm self-end"
//               component={Link}
//               to="/auth/forget-password"
//               color="dimmed"
//             >
//               Forgot Password?
//             </Anchor>

//             <AppCaptcha onVerify={setChaptchaToken} />

//             <Button
//               loading={submitting || loadingFirebaseLogin}
//               type="submit"
//               mt="md"
//               size="md"
//               fullWidth
//               className="bg-yellow-500 hover:bg-yellow-600"
//             >
//               Sign In
//             </Button>

//             <Divider label="Or continue with" labelPosition="center" my="md" />

//             <div className="grid grid-cols-3 gap-3">
//               <Button
//                 variant="outline"
//                 color="gray"
//                 onClick={() => handleSocialLogin("google")}
//                 className="flex items-center justify-center"
//                 px={0}
//               >
//                 <FaGoogle className="text-lg text-red-500" />
//               </Button>

//               <Button
//                 variant="outline"
//                 color="gray"
//                 onClick={() => handleSocialLogin("github")}
//                 className="flex items-center justify-center"
//                 px={0}
//               >
//                 <FaGithub className="text-lg text-gray-800" />
//               </Button>

//               <Button
//                 variant="outline"
//                 color="gray"
//                 onClick={() => handleSocialLogin("linkedin")}
//                 className="flex items-center justify-center"
//                 px={0}
//               >
//                 <FaLinkedin className="text-lg text-[#0B65C2]" />
//               </Button>
//             </div>

//             <Text className="text-center mt-4 text-sm text-gray-600">
//               Don't have an account?{" "}
//               <Anchor
//                 component={Link}
//                 to="/auth/signup"
//                 className="font-medium"
//               >
//                 Sign Up
//               </Anchor>
//             </Text>
//           </form>
//         </Paper>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

// const schema = yup.object().shape({
//   password: yup.string().required().min(8).max(50).label("Password"),
//   email: yup.string().required().label("Email"),
// });

// type IForm = yup.InferType<typeof schema>;
