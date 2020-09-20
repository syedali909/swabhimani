import { Auth } from "aws-amplify";
import { useState } from "react";

export const CURRENTUSER = "CURRENTUSER";
 
export const currentUsersInfo = (user)=>{
return {type: CURRENTUSER,user:user}

}


export const CREATENEWS = "CREATENEWS";

export const createNewsAction =  (newsHeadLine,newsContent,captureLink) => {

   
  return { type: CREATENEWS ,newsHeadLine,newsContent,captureLink };
};
