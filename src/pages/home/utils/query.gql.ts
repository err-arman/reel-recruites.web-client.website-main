import { gql } from "@apollo/client";

export const CATEGORY_CARD_FILTERED = gql`
  query JobCategories($input: CommonPaginationDto) {
    jobCategories(input: $input) {
      nodes {
        _id
        isFeatured
        logo {
          path
          provider
        }
        longDescription
        name
        shortDescription
      }
    }
  }
`;

export const GET_HOME_SINGLE_JOB = gql`
  query Job($where: CommonFindDocumentDto!) {
    job(where: $where) {
      _id
      company {
        _id
        uid
        name
        website
        longDescription
        logo {
          path
          provider
        }
      }

      shortDescription
      title
      longDescription
    }
  }
`;

export const PROMOTIONAL_VIDEOS_QUERY = gql`
  query PromotionalVideosPublic($input: CommonPaginationDto) {
    promotionalVideos__public(input: $input) {
      nodes {
        _id
        title
        isPublished
        description
        video {
          path
          provider
        }
      }
      meta {
        totalPages
        totalCount
        hasNextPage
        currentPage
      }
    }
  }
`;
