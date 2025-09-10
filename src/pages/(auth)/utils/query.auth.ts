import { gql } from '@apollo/client';

export const Forgot__Password__Mutation = gql`
	mutation ($input: ForgotPasswordInput!) {
		forgotPassword(input: $input)
	}
`;

export const Reset__Password__Mutation = gql`
	mutation ($input: ResetPasswordInput!) {
		resetPassword(input: $input)
	}
`;
