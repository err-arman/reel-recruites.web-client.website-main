import { gql } from '@apollo/client';

export const Complete__Profile__Mutation = gql`
	mutation ($input: CompleteProfileInput!) {
		completeProfile(input: $input) {
			accessToken
			roles
		}
	}
`;
