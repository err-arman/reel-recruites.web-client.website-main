import { gql } from "@apollo/client";

export const MY_LIKED__JOBS__QUERY = gql`
  query {
    me {
      likedJobs {
        _id
        title
        company {
          _id
          logo {
            path
            provider
          }
          name
        }
      }
    }
  }
`;
