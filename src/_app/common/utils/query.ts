import { gql } from '@apollo/client';

export const ADD__JOB__TO__BOOK__MARK = gql`
	mutation ($jobId: String!) {
		likeJob(jobId: $jobId)
	}
`;

export const REMOVE__JOB__TO__BOOK__MARK = gql`
	mutation ($jobId: String!) {
		unlikeJob(jobId: $jobId)
	}
`;

export const BOOK__MARKED__JOBS = gql`
	query {
		me {
			likedJobs {
				_id
			}
		}
	}
`;
