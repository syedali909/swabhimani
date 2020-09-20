import { CURRENTUSER, CREATENEWS } from "../action/newsAction";
import { API, Storage } from "aws-amplify";
import { createNews } from "../../src/graphql/mutations";
import * as FileSystem from "expo-file-system";



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
      if (action.captureLink) {
        uploadToStorage(
          action.captureLink,
          action.newsHeadLine,
          action.newsContent,
          state.user
        );
      }
      return state;
    case CURRENTUSER:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};


const uploadToStorage = async (pathToImageFile, newsHeadline, newsContent,currentuser) => {
  try {
    const response = await fetch(pathToImageFile);

    const blob = await response.blob();
    const imagename = new Date().getTime().toString().concat(".jpeg");


    Storage.put('news/image/'.concat(imagename), blob, {
      contentType: "image/jpeg",
      metadata: {
        user: currentuser,
        uri: imagename,
        headline: newsHeadline,
        content: newsContent,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

// const uploadToStorage1 = async (pathToImageFile, newsHeadline, newsContent,currentuser) => {
//   var file = null;
//   try {
//      file = await FileSystem.readAsStringAsync(pathToImageFile, {
//       encoding: FileSystem.EncodingType.Base64,
//     });
//     console.log("file");
//   } catch (error) {
//     console.log("object", error);
//   }
//   console.log('file fasdf  fdaf')
//   const myInit = {
//       body: {
//         uri : file,
//         creatnews: createNews,
//         news: {
//           user: currentuser,
//           headline: newsHeadline,
//           content: newsContent,
//         }
//       }
//   };
  
//   API
//     .post("lambdaexpressrest", "/image", myInit)
//     .then(response => {
//      console.log('response', response)
//     })
//     .catch(error => {
//       console.log(error.response);
//     });}