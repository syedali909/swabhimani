import React, { useEffect, useState, useCallback, Component } from "react";



import {
  Authenticator,
  ConfirmSignIn,
  RequireNewPassword,
  SignUp,
  ConfirmSignUp,
  VerifyContact,
  ForgotPassword,
  Loading
} from "aws-amplify-react-native";
import { withOAuth } from "aws-amplify-react-native";
import SignIn from '../../component/AuthnticationUI/SignIn'

import AmplifyThemeUI from "../../component/AmplifyThemeUI";
import NewsAddingScreen from "../../component/CreateNewsComponent/NewsAddingScreen";

const CreateNews = (props) => {

 
  const {
    facebookSignIn,
    googleSignIn,
  } = props;



  const map = (message) => {
    try {
      if (/incorrect.*username.*password/i.test(message)) {
        return "Incorrect username or password";
      }

      return message;
    } catch (error) {}
  };

  return (
    <Authenticator
      errorMessage={map}
      hideDefault={true}
      usernameAttributes="email"
      theme={ AmplifyThemeUI}
      >
      
      <NewsAddingScreen props={props} />
      <Loading />
      <SignIn Social={{googleSignIn,facebookSignIn}}/>
      <ConfirmSignIn />
      <RequireNewPassword />
      <SignUp signUpConfig={signUpConfig} />
      <ConfirmSignUp />
      <VerifyContact />
      <ForgotPassword />
      
    </Authenticator>
  );
};




const signUpConfig = {
  header: "Account Creation",
  hideAllDefaults: true,
  defaultCountryCode: "91",
  signUpFields: [
    {
      label: "PhoneNumber",
      key: "phone_number",
      required: true,
      displayOrder: 2,
      type: "string",
    },
    {
      label: "Email",
      key: "email",
      required: true,
      displayOrder: 1,
      type: "string",
    },
    {
      label: "Password",
      key: "password",
      required: true,
      displayOrder: 4,
      type: "password",
    },
  ],
};

export default withOAuth(CreateNews);
