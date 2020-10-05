/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateNews = /* GraphQL */ `
  subscription OnCreateNews {
    onCreateNews {
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
export const onUpdateNews = /* GraphQL */ `
  subscription OnUpdateNews {
    onUpdateNews {
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
export const onDeleteNews = /* GraphQL */ `
  subscription OnDeleteNews {
    onDeleteNews {
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
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
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
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
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
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
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
export const onCreateLike = /* GraphQL */ `
  subscription OnCreateLike {
    onCreateLike {
      id
      commentId
      newsId
      owner
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateLike = /* GraphQL */ `
  subscription OnUpdateLike {
    onUpdateLike {
      id
      commentId
      newsId
      owner
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteLike = /* GraphQL */ `
  subscription OnDeleteLike {
    onDeleteLike {
      id
      commentId
      newsId
      owner
      createdAt
      updatedAt
    }
  }
`;
