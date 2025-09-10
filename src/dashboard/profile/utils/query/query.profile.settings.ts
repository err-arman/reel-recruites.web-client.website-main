import { gql } from "@apollo/client";

export const UPDATE_USER_PROFILE_MUTATION = gql`
  mutation ($body: UpdateMeInput!) {
    updateMe(body: $body)
  }
`;

export const USER_PROFILE_DETAILS_QUERY = gql`
  query ME_PROFILE_DETAILS {
    me {
      _id
      cover {
        path
        provider
      }
      avatar {
        path
        provider
      }
      designation
      email
      phoneNumber
      name
      overview
      tagLine
      experiences {
        companyLocation
        companyName
        description
        isCurrentlyWorking
        endDate
        startDate
        locationType
        roleType
        title
        logo {
          path
          provider
        }
      }
      skills
      roles
      updatedAt
      isPending
      createdAt
      educations {
        degree
        description
        endDate
        school
        startDate
        grade
        subjectOfStudy
        logo {
          path
          provider
        }
      }
      likedJobs {
        _id
        title
        thumbnail {
          path
          provider
        }
        video {
          path
          provider
        }
        company {
          name
          logo {
            path
            provider
          }
        }
      }
    }
  }
`;
