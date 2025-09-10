import { gql } from "@apollo/client";

export const CREATE_PROFILE_VIDEO_MUTATION = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      _id
    }
  }
`;


export const PROFILE_VIDEOS_QUERY = gql`
  query Posts($input: CommonPaginationDto) {
    posts(input: $input) {
      meta {
        totalCount
        hasNextPage
        currentPage
        totalPages
      }
      nodes {
        _id
        body
        createdAt
        medias {
          media {
            path
            provider
          }
          type
        }
        updatedAt
        postedBy {
          _id
          email
          name
          overview
          tagLine
          isPending
        }
      }
    }
  }
`;

export const REMOVE_POST_MUTATION = gql`
  mutation RemovePost($where: CommonFindDocumentDto!) {
    removePost(where: $where)
  }
`;