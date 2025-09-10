import { gql } from "@apollo/client";

export const MY_APPLICANTS_QUERY = gql`
 query MyAppliedApplications {
  myAppliedApplications {
    nodes {
      _id
      job {
        _id
        title
      }
      company {
        _id
        logo {
          path
          provider
        }
        name
      }
      expectedSalary
      applicant {
        _id
        createdAt
      }
      answers {
        answerVideo {
          path
          provider
        }
        body
        title
      }
    }
  }
}   

`