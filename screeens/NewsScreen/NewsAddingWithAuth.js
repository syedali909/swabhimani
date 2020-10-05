import React from "react";
import { View, Text } from "react-native";
import UserAuthenticator from "../../component/AuthnticationUI/UserAuthenticator";
import NewsAddingScreen from "./NewsAddingScreen";

export default function NewsAddingWithAuth(props) {
  return (
    <UserAuthenticator>
      <NewsAddingScreen props={props} />
    </UserAuthenticator>
  );
}
