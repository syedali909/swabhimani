/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createNews = /* GraphQL */ `
  mutation CreateNews(
    $input: CreateNewsInput!
    $condition: ModelNewsConditionInput
  ) {
    createNews(input: $input, condition: $condition) {
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
export const updateNews = /* GraphQL */ `
  mutation UpdateNews(
    $input: UpdateNewsInput!
    $condition: ModelNewsConditionInput
  ) {
    updateNews(input: $input, condition: $condition) {
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
export const deleteNews = /* GraphQL */ `
  mutation DeleteNews(
    $input: DeleteNewsInput!
    $condition: ModelNewsConditionInput
  ) {
    deleteNews(input: $input, condition: $condition) {
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
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
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
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
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
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
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
export const createLike = /* GraphQL */ `
  mutation CreateLike(
    $input: CreateLikeInput!
    $condition: ModelLikeConditionInput
  ) {
    createLike(input: $input, condition: $condition) {
      id
      commentId
      newsId
      owner
      createdAt
      updatedAt
    }
  }
`;
export const updateLike = /* GraphQL */ `
  mutation UpdateLike(
    $input: UpdateLikeInput!
    $condition: ModelLikeConditionInput
  ) {
    updateLike(input: $input, condition: $condition) {
      id
      commentId
      newsId
      owner
      createdAt
      updatedAt
    }
  }
`;
export const deleteLike = /* GraphQL */ `
  mutation DeleteLike(
    $input: DeleteLikeInput!
    $condition: ModelLikeConditionInput
  ) {
    deleteLike(input: $input, condition: $condition) {
      id
      commentId
      newsId
      owner
      createdAt
      updatedAt
    }
  }
`;
