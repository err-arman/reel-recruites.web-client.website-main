import { gql } from "@apollo/client";

export const GET_ALL_JOBS = gql`
  query AllJobsQuery($input: CommonPaginationDto) {
    jobs__public(input: $input) {
      nodes {
        _id
        title
        shortDescription
        thumbnail {
          path
          provider
        }
        company {
          _id
          name
          uid
          logo {
            path
            provider
          }
          cover {
            path
            provider
          }
        }

        video {
          path
          provider
        }
      }
      meta {
        totalCount
        hasNextPage
        totalPages
        currentPage
      }
    }
  }
`;

export const GET_SINGLE_JOB = gql`
  query Job($where: CommonFindDocumentDto!) {
    job(where: $where) {
      isSkipVideoInterview
      _id
      company {
        _id
        name
        uid
        website
        longDescription

        logo {
          path
          provider
        }
        cover {
          path
          provider
        }
        location {
          address
        }
      }
      video {
        path
        provider
      }
      thumbnail {
        path
        provider
      }
      applicants {
        _id
      }

      jobRoleType
      salaryRangeMax
      salaryRangeMin
      shortDescription
      title
      longDescription
      jobLocationType
    }
  }
`;

export const GET_APPLY_QUESTIONS = gql`
  query Job($where: CommonFindDocumentDto!) {
    job(where: $where) {
      _id
      isSkipVideoInterview
      company {
        _id
      }
      questions {
        body
        title
      }
    }
  }
`;

export const GET_JOB_ALL_COMPANY = gql`
  query Jobs__public($input: CommonPaginationDto) {
    jobs__public(input: $input) {
      nodes {
        _id
        publishStatus
        questions {
          title
          body
        }
        company {
          _id
          name
          uid
          logo {
            path
            provider
          }
        }
        title
        postedBy {
          _id
          createdAt
        }
      }
      meta {
        currentPage
        hasNextPage
        totalCount
        totalPages
      }
    }
  }
`;

export const APPLY_TO_JOB_MUTATION = gql`
  mutation ApplyToJob($input: CreateApplicationInput!) {
    applyToJob(input: $input) {
      _id
    }
  }
`;

export const JOB_CATEGORIES = gql`
  query JobCategoriesQuery($input: CommonPaginationDto) {
    jobCategories(input: $input) {
      nodes {
        _id
        name
      }
    }
  }
`;
