import { gql } from "@apollo/client";

export const REGISTER_MUTATION = gql`
  mutation Register($input: SignUpInput!) {
    register(input: $input)
  }
`;
