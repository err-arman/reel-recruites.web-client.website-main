import { gql } from '@apollo/client';

export const Submit_Video_Interview_Mutation = gql`
	mutation SubmitVideoOnlyInterview(
		$input: SubmitVideoInterviewApplicationInput!
	) {
		submitVideoOnlyInterview(input: $input)
	}
`;
