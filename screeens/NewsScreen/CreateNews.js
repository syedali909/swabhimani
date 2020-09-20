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
import { I18n } from 'aws-amplify';

import AmplifyThemeUI from "../../component/AmplifyThemeUI";
import NewsAddingScreen from "../../component/CreateNewsComponent/NewsAddingScreen";
import { authScreenLabels } from "../../constant/localName";
import { Auth } from "aws-amplify";
import { Logger } from 'aws-amplify';


const CreateNews = (props) => {
  const logger = new Logger('foo');
  
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
      authData="signIn"
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
