import { API, Auth, graphqlOperation, Storage } from "aws-amplify";
import { listNewss } from "../../src/graphql/queries";

export const CURRENTUSER = "CURRENTUSER";
export const UPLOADNEWS = "UPLOADNEWS";
export const CREATENEWS = "CREATENEWS";

export const currentUsersInfo = (user) => {
  return { type: CURRENTUSER, user: user };
};

export const createNewsAction = (uploaded) => {
  return { type: CREATENEWS, uploaded };
};

export const setListNews = (listNews) => {
  return { type: UPLOADNEWS, listNews };
};

export const loadNews = () => async (dispatch, getState) => {
  try {
    const list = await API.graphql({
      query: listNewss,
      authMode: "API_KEY",
    });
    console.log('list', list)
    dispatch(setListNews(list.data.listNewss.items));
  } catch (error) {
    console.log('error')
  }
};
