import { gql } from "@apollo/client";

export const USER_PROFILE_FEED_QUERY = gql`
  query User($where: CommonFindDocumentDto!) {
    user(where: $where) {
      _id
      avatar {
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
     
      name
      
      tagLine
      updatedAt
    }
  }
`;
