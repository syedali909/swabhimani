import { CURRENTUSER, CREATENEWS, UPLOADNEWS } from "../action/newsAction";

const initialState = {};

export const userAuthState = (state = "", action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const createNewsReduce = (state = initialState, action) => {
  switch (action.type) {
    case CREATENEWS:
      var uploaded = action.uploaded;
      return { ...state, uploaded: uploaded };
    case CURRENTUSER:
      return {
        ...state,
        user: action.user,
      };
    case UPLOADNEWS:
       return{
         ...state,
         listNews: action.listNews
       }
    default:
      return state;
  }
};
