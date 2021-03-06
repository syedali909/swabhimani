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
import SignIn from './SignIn'
import { I18n } from 'aws-amplify';

import AmplifyThemeUI from "../AmplifyThemeUI";
import { authScreenLabels } from "../../constant/localName";
import { Auth } from "aws-amplify";
import { Logger } from 'aws-amplify';
import NewsAddingScreen from "../../screeens/NewsScreen/NewsAddingScreen";
import { useDispatch } from "react-redux";
import { currentUsersInfo } from "../../store/action/newsAction";


const Authticator = (props) => {
  const logger = new Logger('foo');
  const dispatch = useDispatch();
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

 const handleAuthStateChange =async (state)=> {
    if (state === 'signedIn') {

      Auth.currentUserInfo().then((data) => {
        let user = { owner: data.username, ownerName: data.attributes.name };
        dispatch(currentUsersInfo(user))});

    }
}

  return (
    <Authenticator
      errorMessage={map}
      authData="signIn"
      hideDefault={true}
      usernameAttributes="email"
      onStateChange={handleAuthStateChange}
      theme={ AmplifyThemeUI}
      >
      {props.children ? props.children : <></>}
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
      label: "UserName to Display",
      key: "name",
      required: true,
      displayOrder: 1,
      type: "string",
    },
    {
      label: "PhoneNumber",
      key: "phone_number",
      required: true,
      displayOrder: 3,
      type: "string",
    },
    {
      label: "Email",
      key: "email",
      required: true,
      displayOrder: 2,
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

export default withOAuth(Authticator);
