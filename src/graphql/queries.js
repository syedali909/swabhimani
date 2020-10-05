/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getNews = /* GraphQL */ `
  query GetNews($id: ID!) {
    getNews(id: $id) {
      id
      owner
      ownerName
      uri
      headline
      content
      createdAt
      updatedAt
      comment {
        items {
          id
          newsId
          content
          owner
          ownerName
          createdAt
          updatedAt
          like {
            items {
              id
              commentId
              newsId
              owner
              createdAt
              updatedAt
            }
            nextToken
          }
        }
        nextToken
      }
      like {
        items {
          id
          commentId
          newsId
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const listNewss = /* GraphQL */ `
  query ListNewss(
    $filter: ModelNewsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNewss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        owner
        ownerName
        uri
        headline
        content
        createdAt
        updatedAt
        comment {
          items {
            id
            newsId
            content
            owner
            ownerName
            createdAt
            updatedAt
            like {
              nextToken
            }
          }
          nextToken
        }
        like {
          items {
            id
            commentId
            newsId
            owner
            createdAt
            updatedAt
          }
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
      id
      newsId
      content
      owner
      ownerName
      createdAt
      updatedAt
      like {
        items {
          id
          commentId
          newsId
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        newsId
        content
        owner
        ownerName
        createdAt
        updatedAt
        like {
          items {
            id
            commentId
            newsId
            owner
            createdAt
            updatedAt
          }
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getLike = /* GraphQL */ `
  query GetLike($id: ID!) {
    getLike(id: $id) {
      id
      commentId
      newsId
      owner
      createdAt
      updatedAt
    }
  }
`;
export const listLikes = /* GraphQL */ `
  query ListLikes(
    $filter: ModelLikeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLikes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        commentId
        newsId
        owner
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
