import { RouteObject } from "react-router-dom";
import CompleteProfilePage from "./complete-profile/complete-profile.page";
import AuthLayout from "./layout";
import CallbackPage from "./callback/callback.page";
export const authRouter: RouteObject[] = [
  {
    path: "",
    element: <AuthLayout />,
    children: [
      // {
      // 	path: 'signup',
      // 	element: <SignupPage />,
      // },
      // {
      // 	path: 'signin',
      // 	element: <LoginPage />,
      // },
      {
        path: "complete-profile",
        element: <CompleteProfilePage />,
      },
      // {
      // 	path: 'forget-password',
      // 	element: <ForgetPasswordPage />,
      // },
      // {
      // 	path: 'reset-password',
      // 	element: <ResetPasswordPage />,
      // },
      {
        path: "callback",
        element: <CallbackPage />,
      },
    ],
  },
];
