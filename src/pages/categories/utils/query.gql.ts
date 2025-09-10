import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
  query JobCategories($input: CommonPaginationDto) {
    jobCategories(input: $input) {
      nodes {
        _id
        name
        shortDescription
        logo {
          path
          provider
        }
      }
    }
  }
`;
