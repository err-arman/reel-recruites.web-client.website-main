import { gql } from "@apollo/client";

export const USER_PROFILE_QUERY = gql`
  query User($where: CommonFindDocumentDto!) {
    user(where: $where) {
      _id
      avatar {
        path
        provider
      }
      cover {
        path
        provider
      }
      createdAt
      designation
      educations {
        degree
        description
        endDate
        grade
        school
        startDate
        subjectOfStudy
        logo {
          path
          provider
        }
      }
      email
      experiences {
        companyLocation
        companyName
        description
        endDate
        isCurrentlyWorking
        locationType
        roleType
        startDate
        title
        logo {
          path
          provider
        }
      }
      isPending
      name
      overview
      roles
      skills
      tagLine
      updatedAt
    }
  }
`;

export const PROFILE_VIDEOS_QUERY = gql`
  query Posts($input: CommonPaginationDto) {
    posts(input: $input) {
      meta {
        totalCount
        hasNextPage
        currentPage
        totalPages
      }
      nodes {
        _id
        body
        createdAt
        medias {
          media {
            path
            provider
          }
          type
        }
        updatedAt
        postedBy {
          _id
          email
          name
          overview
          tagLine
          isPending
        }
      }
    }
  }
`;
