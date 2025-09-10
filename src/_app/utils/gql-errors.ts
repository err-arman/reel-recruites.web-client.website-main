import { ApolloError } from "@apollo/client";

export const getGqlErrorMessage = (response: ApolloError) => {
  return response?.graphQLErrors?.[0]?.message;
};
