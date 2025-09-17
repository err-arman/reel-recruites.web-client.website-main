import { gql } from "@apollo/client";

export const SSO_LOGIN_MUTATION = gql`
  mutation ($input: SsoLoginInput!) {
    ssoLogin(input: $input) {
      accessToken
      roles
    }
  }
`;
