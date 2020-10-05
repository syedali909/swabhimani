import { API, Auth, Storage } from "aws-amplify";
import { Buffer } from "buffer";
import * as FileSystem from "expo-file-system";
import { Platform } from "react-native";
import { createNews } from "../src/graphql/mutations";

export const uploadToStorage = async (
  pathToImageFile,
  newsHeadline,
  newsContent,
  ownerName
) => {
  var successfullyUpload;
  const imagename = new Date().getTime().toString();
  const contenturi = "public/news/text/".concat(imagename).concat(".txt");
  const imageUri = pathToImageFile ? "public/news/image/".concat(imagename).concat(".jpeg") : null;
  var returnvariable;

 const uriToFile = async (pathToImageFile) => {
   
  if(!pathToImageFile){
    return
  }

  const file = await FileSystem.readAsStringAsync(pathToImageFile, {
    encoding: FileSystem.EncodingType.Base64
   })
  
   return  Buffer.from(file, 'base64')
 }

const myInit = {
      headers: {
        Authorization: `Bearer ${(await Auth.currentSession())
          .getIdToken()
          .getJwtToken()}`,
          "Content-Type": "image/jpeg"
      },
      queryStringParameters: {
        createNews: createNews,  // OPTIONAL
        content: newsContent,
        contenturi : contenturi,
        imageuri : imageUri,
        headline : newsHeadline,
        ownerName : ownerName
      },
      body: await uriToFile(pathToImageFile)
    }
  
    await API.post("restNewsApi", "/news", myInit)
      .then((response) => {
        console.log("response", response);
        returnvariable = true;
      })
      .catch((error) => {
        returnvariable = false;
        console.log(error);
      });
  
  return returnvariable;
  
};




async function putText(
  imageuri,
  newsContent,
  newsHeadline,
  contenturi,
  ownerName
) {
 const file = await FileSystem.readAsStringAsync(imageuri, {
  encoding: FileSystem.EncodingType.Base64
 })

 const buffer = Buffer.from(file, 'base64')

  var returnvariable;

  const myInit = {
    headers: {
      Authorization: `Bearer ${(await Auth.currentSession())
        .getIdToken()
        .getJwtToken()}`,
        "Content-Type": "image/jpeg"
    },
    queryStringParameters: {  // OPTIONAL
      name: 'param',
    },
    body: buffer
  }

  await API.post("restNewsApi", "/news", myInit)
    .then((response) => {
      console.log("response", response);
      returnvariable = true;
    })
    .catch((error) => {
      returnvariable = false;
      console.log(error);
    });

  return returnvariable;
}


// -----------------------------------------------------------------

const uploadToStorage1 = async (
  pathToImageFile,
  newsHeadline,
  newsContent,
  currentuser
) => {
  var file = null;
  try {
    file = await FileSystem.readAsStringAsync(pathToImageFile, {
      encoding: FileSystem.EncodingType.Base64,
    });
    console.log("file");
  } catch (error) {
    console.log("object", error);
  }

  const response = await fetch(pathToImageFile);
  const blob = await response.blob();

  console.log("file fasdf  fdaf");
  const myInit = {
    headers: {
      Authorization: `Bearer ${(await Auth.currentSession())
        .getIdToken()
        .getJwtToken()}`,
      "Content-Type": "image/jpeg",
    },
    body: blob,
  };
  API.post("lambdarest", "/image", myInit)
    .then((response) => {
      console.log("response", response);
    })
    .catch((error) => {
      console.log(error.response);
    });
};

// if (true) {
//   successfullyUpload = await putText(
//     pathToImageFile,
//     newsContent,
//     newsHeadline,
//     contenturi,
//     ownerName
//   );
// } else {
//   const response = await fetch(pathToImageFile);
//   const blob = await response.blob();
//   const imageUri = "news/image/".concat(imagename).concat(".jpeg");
//   await Storage.put(imageUri, blob, {
//     level: "public",
//     contentType: "image/jpeg",
//   })
//     .then(async (result) => {
//       console.log("result", result);
//       return (successfullyUpload = await putText(
//         "public/".concat(imageUri),
//         newsContent,
//         newsHeadline,
//         contenturi,
//         ownerName
//       ));
//     })
//     .catch((err) => {
//       successfullyUpload = false;
//       console.log(err);
//     });
// }
// return successfullyUpload;