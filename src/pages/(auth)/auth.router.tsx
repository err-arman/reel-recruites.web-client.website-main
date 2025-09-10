import { RouteObject } from 'react-router-dom';
import CompleteProfilePage from './complete-profile/complete-profile.page';
import ForgetPasswordPage from './forget_password/forget_password.page';
import AuthLayout from './layout';
import ResetPasswordPage from './reset_password/reset_password.page';
import LoginPage from './signin/signin.page';
import SignupPage from './signup/signup.page';

export const authRouter: RouteObject[] = [
	{
		path: '',
		element: <AuthLayout />,
		children: [
			{
				path: 'signup',
				element: <SignupPage />,
			},
			{
				path: 'signin',
				element: <LoginPage />,
			},
			{
				path: 'complete-profile',
				element: <CompleteProfilePage />,
			},
			{
				path: 'forget-password',
				element: <ForgetPasswordPage />,
			},
			{
				path: 'reset-password',
				element: <ResetPasswordPage />,
			},
		],
	},
];
