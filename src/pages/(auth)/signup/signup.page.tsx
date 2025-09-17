import { initiateSSoLogin } from "@/_app/utils/sso-auth";
import { useEffect } from "react";

const SignupPage = () => {
  useEffect(() => {
    initiateSSoLogin();
  }, []);
  return (
    <div>
      <h1>Signup Page</h1>
    </div>
  );
};

export default SignupPage;

// import { ErrorMessage } from "@hookform/error-message";
// import { yupResolver } from "@hookform/resolvers/yup";

// import {
//   Anchor,
//   Button,
//   Checkbox,
//   Input,
//   PasswordInput,
//   Radio,
//   Text,
//   Title,
//   Divider,
//   Paper,
// } from "@mantine/core";
// // import { notifications } from "@mantine/notifications";
// // import { signIn } from "next-auth/react";
// import AppCaptcha from "@/_app/common/components/AppCaptcha";
// import { LoginResponseDto } from "@/_app/gql-types/graphql";
// import { MutationCallbackToaster } from "@/_app/utils/MutationCallbackToaster";
// import { auth } from "@/_app/utils/firebase";
// import { getGqlErrorMessage } from "@/_app/utils/gql-errors";
// import { useMutation } from "@apollo/client";
// import {
//   GithubAuthProvider,
//   GoogleAuthProvider,
//   signInWithPopup,
// } from "@firebase/auth";
// import { showNotification } from "@mantine/notifications";
// import { useState } from "react";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { FaGithub, FaGoogle, FaLinkedin } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import * as yup from "yup";
// import { FIREBASE_LOGIN_MUTATION } from "../signin/utils/query.gql";
// import { REGISTER_MUTATION } from "./utils/query.gql";

// const SignupPage = () => {
//   const navigate = useNavigate();
//   const [checked, setChecked] = useState(false);
//   const [captchaToken, setChaptchaToken] = useState("");
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     watch,
//   } = useForm<IForm>({
//     resolver: yupResolver(schema),
//     defaultValues: {
//       role: "JOB_SEEKER",
//     },
//   });
//   //

//   const [firebaseLoginMutation] = useMutation(FIREBASE_LOGIN_MUTATION, {
//     onCompleted(data) {
//       if (
//         data.getTokenByFirebaseIdToken.roles.includes("ADMIN") ||
//         data.getTokenByFirebaseIdToken.roles.includes("RECRUITER")
//       ) {
//         window.location.href = `https://portal.reel-recruits.com/direct-login?access-token=${data?.getTokenByFirebaseIdToken?.accessToken}`;
//         return;
//       }
//       localStorage.setItem(
//         "accessToken",
//         data.getTokenByFirebaseIdToken.accessToken
//       );

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
//         title: getGqlErrorMessage(data),
//         message: "",
//         color: "red",
//       });
//     },
//   });

//   const [mutate, { loading: submitting }] = useMutation<{
//     login: LoginResponseDto;
//   }>(
//     REGISTER_MUTATION,
//     MutationCallbackToaster({
//       successTitle: "Signed up successfully",
//       onSuccess: () => {
//         navigate("/auth/signin");
//       },
//     })
//   );

//   const loginFormSubmit: SubmitHandler<IForm> = (data) => {
//     if (!checked) {
//       showNotification({
//         title: "You did not agree our terms and conditions",
//         message: "",
//         color: "red",
//       });
//       return;
//     }

//     mutate({
//       variables: {
//         input: {
//           name: data.name,
//           email: data.email,
//           password: data.password,
//           role: data?.role,
//           captchaToken: captchaToken,
//         },
//       },
//     });
//   };

//   const handleSocialLogin = async (providerName: string) => {
//     // let provider: AuthProvider;
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
//         params.append(
//           "state",
//           JSON.stringify({ isCreateAccount: true, role: watch("role") })
//         );
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
//             isCreateAccount: true,
//             role: watch("role"),
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
//             Create Account
//           </Title>
//           <Text size="sm" color="dimmed" className="text-center mb-6">
//             Sign up to start your job search journey
//           </Text>
          
//           <form
//             action="#"
//             onSubmit={handleSubmit(loginFormSubmit)}
//             className="flex flex-col gap-4"
//           >
//             <Input.Wrapper
//               label="Name"
//               error={<ErrorMessage name={"name"} errors={errors} />}
//             >
//               <Input 
//                 placeholder="Your full name" 
//                 {...register("name")} 
//                 size="md"
//               />
//             </Input.Wrapper>

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
//                 placeholder="Create a password"
//                 type={"password"}
//                 {...register("password")}
//                 size="md"
//               />
//             </Input.Wrapper>

//             <Input.Wrapper
//               label="Confirm Password"
//               error={<ErrorMessage name={"confirmPassword"} errors={errors} />}
//             >
//               <PasswordInput
//                 placeholder="Confirm your password"
//                 type={"password"}
//                 {...register("confirmPassword")}
//                 size="md"
//               />
//             </Input.Wrapper>

//             <div className="flex flex-col gap-2 mt-2">
//               <Text size="sm" fw={500} className="text-gray-700">
//                 I am a:
//               </Text>
//               <div className="flex items-center gap-4">
//                 <Radio
//                   label="Job seeker"
//                   {...register("role")}
//                   value={"JOB_SEEKER"}
//                   color="yellow"
//                 />
//                 <Radio
//                   label="Recruiter"
//                   {...register("role")}
//                   value={"RECRUITER"}
//                   color="yellow"
//                 />
//               </div>
//             </div>

//             <Checkbox
//               label="I agree to the terms and conditions of Nearheal Jobs"
//               color="yellow"
//               checked={checked}
//               onChange={(e) => setChecked(e.target.checked)}
//               className="mt-2"
//             />

//             <AppCaptcha onVerify={setChaptchaToken} />

//             <Button
//               loading={submitting}
//               type="submit"
//               mt="md"
//               size="md"
//               fullWidth
//               className="bg-yellow-500 hover:bg-yellow-600"
//             >
//               Create Account
//             </Button>

//             <Divider label="Or sign up with" labelPosition="center" my="md" />

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
//               Already have an account?{" "}
//               <Anchor
//                 component={Link}
//                 to="/auth/signin"
//                 className="font-medium"
//               >
//                 Sign In
//               </Anchor>
//             </Text>
//           </form>
//         </Paper>
//       </div>
//     </div>
//   );
// };

// export default SignupPage;

// const schema = yup.object().shape({
//   name: yup.string().required().max(50).label("Name"),
//   email: yup.string().required().label("Email"),
//   password: yup.string().required().min(8).max(50).label("Password"),
//   confirmPassword: yup
//     .string()
//     .required()
//     .oneOf([yup.ref("password")], "Passwords must match")
//     .label("Confirm Password"),
//   role: yup.string().oneOf(["JOB_SEEKER", "RECRUITER"]).label("Role"),
// });

// type IForm = yup.InferType<typeof schema>;
