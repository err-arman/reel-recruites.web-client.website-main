/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query Me_QUERY {\n    me {\n      _id\n      email\n      name\n      roles\n      avatar {\n        path\n        provider\n      }\n      likedJobs {\n        _id\n      }\n    }\n  }\n": types.Me_QueryDocument,
    "\n  query Me {\n    me {\n      _id\n      email\n      name\n      roles\n      phoneNumber\n      avatar {\n        path\n        provider\n      }\n    }\n  }\n": types.MeDocument,
    "\n  mutation OauthLogin($input: OAuthLoginInput!) {\n    oauthLogin(input: $input) {\n      accessToken\n      roles\n    }\n  }\n": types.OauthLoginDocument,
    "\n\tquery Company($where: CommonFindDocumentDto!) {\n\t\tcompany(where: $where) {\n\t\t\t_id\n\t\t\tcompanySize\n\t\t\tlogo {\n\t\t\t\tpath\n\t\t\t\tprovider\n\t\t\t}\n\t\t\tcover {\n\t\t\t\tpath\n\t\t\t\tprovider\n\t\t\t}\n\t\t\tlongDescription\n\t\t\tname\n\t\t\tshortDescription\n\t\t\tsocialLinks {\n\t\t\t\tfacebook\n\t\t\t\tgithub\n\t\t\t\tlinkedin\n\t\t\t\tyoutube\n\t\t\t\ttwitter\n\t\t\t}\n\t\t\twebsite\n\t\t}\n\t}\n": types.CompanyDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Me_QUERY {\n    me {\n      _id\n      email\n      name\n      roles\n      avatar {\n        path\n        provider\n      }\n      likedJobs {\n        _id\n      }\n    }\n  }\n"): (typeof documents)["\n  query Me_QUERY {\n    me {\n      _id\n      email\n      name\n      roles\n      avatar {\n        path\n        provider\n      }\n      likedJobs {\n        _id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Me {\n    me {\n      _id\n      email\n      name\n      roles\n      phoneNumber\n      avatar {\n        path\n        provider\n      }\n    }\n  }\n"): (typeof documents)["\n  query Me {\n    me {\n      _id\n      email\n      name\n      roles\n      phoneNumber\n      avatar {\n        path\n        provider\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation OauthLogin($input: OAuthLoginInput!) {\n    oauthLogin(input: $input) {\n      accessToken\n      roles\n    }\n  }\n"): (typeof documents)["\n  mutation OauthLogin($input: OAuthLoginInput!) {\n    oauthLogin(input: $input) {\n      accessToken\n      roles\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery Company($where: CommonFindDocumentDto!) {\n\t\tcompany(where: $where) {\n\t\t\t_id\n\t\t\tcompanySize\n\t\t\tlogo {\n\t\t\t\tpath\n\t\t\t\tprovider\n\t\t\t}\n\t\t\tcover {\n\t\t\t\tpath\n\t\t\t\tprovider\n\t\t\t}\n\t\t\tlongDescription\n\t\t\tname\n\t\t\tshortDescription\n\t\t\tsocialLinks {\n\t\t\t\tfacebook\n\t\t\t\tgithub\n\t\t\t\tlinkedin\n\t\t\t\tyoutube\n\t\t\t\ttwitter\n\t\t\t}\n\t\t\twebsite\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery Company($where: CommonFindDocumentDto!) {\n\t\tcompany(where: $where) {\n\t\t\t_id\n\t\t\tcompanySize\n\t\t\tlogo {\n\t\t\t\tpath\n\t\t\t\tprovider\n\t\t\t}\n\t\t\tcover {\n\t\t\t\tpath\n\t\t\t\tprovider\n\t\t\t}\n\t\t\tlongDescription\n\t\t\tname\n\t\t\tshortDescription\n\t\t\tsocialLinks {\n\t\t\t\tfacebook\n\t\t\t\tgithub\n\t\t\t\tlinkedin\n\t\t\t\tyoutube\n\t\t\t\ttwitter\n\t\t\t}\n\t\t\twebsite\n\t\t}\n\t}\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;