import { gql } from '@apollo/client';

export const GET_COMPANY_QUERY = gql`
	query Company($where: CommonFindDocumentDto!) {
		company(where: $where) {
			_id
			companySize
			logo {
				path
				provider
			}
			cover {
				path
				provider
			}
			longDescription
			name
			shortDescription
			socialLinks {
				facebook
				github
				linkedin
				youtube
				twitter
			}
			website
		}
	}
`;

export const COMPANY_DETAILS_FOR_COMPANY_JOBS_PAGE = gql`
	query ($where: CommonFindDocumentDto!) {
		company(where: $where) {
			_id
			name
			tagLine
		}
	}
`;
