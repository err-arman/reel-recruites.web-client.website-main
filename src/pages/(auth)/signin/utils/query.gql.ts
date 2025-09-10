import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      accessToken
      roles
    }
  }
`;

export const FIREBASE_LOGIN_MUTATION = gql`
  mutation GetTokenByFirebaseIdToken($input: FirebaseTokenAuth!) {
    getTokenByFirebaseIdToken(input: $input) {
      accessToken
      roles
    }
  }
`;
