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

  var returnvariable;

  const uriToFile = async (pathToImageFile) => {
    if (!pathToImageFile) {
      return;
    }

    const file = await FileSystem.readAsStringAsync(pathToImageFile, {
      encoding: FileSystem.EncodingType.Base64,
    });

    return Buffer.from(file, "base64");
  };

  const imagebuffer = await uriToFile(pathToImageFile);

  const queryStringParameter = {
    createNews: createNews, // OPTIONAL
    content: newsContent,
    headline: newsHeadline,
    ownerName: ownerName,
  }

  const myInit = {
    headers: {
      Authorization: `Bearer ${(await Auth.currentSession())
        .getIdToken()
        .getJwtToken()}`,
      "Content-Type": "multipart/form-data",
    },
    body: [imagebuffer,queryStringParameter],
  };

  await API.post("RestApiNews", "/news", myInit)
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
