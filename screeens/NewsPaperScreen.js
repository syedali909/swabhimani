import React, { useState, useEffect } from "react";
import { View, Text, Picker } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";

import { Colors } from "react-native/Libraries/NewAppScreen";
import { LocalizationContext } from "../constant/localName";
import { useDispatch } from "react-redux";
import { currentUsersInfo } from "../store/action/newsAction";
import { API, Auth } from "aws-amplify";
// Set the key-value pairs for the different languages you want to support.
import { Storage } from "aws-amplify";
import { listNewss } from "../src/graphql/queries";

const NewsPaperScreen = (props) => {
  useEffect(() => {
    return () => {};
  }, []);

  const [user, setuser] = useState();
  Auth.currentUserInfo().then((data) => setuser(data?.username));
  const dispatch = useDispatch();
  dispatch(currentUsersInfo(user));

  const timestamp = new Date().getTime().toString().concat(".jpeg");
  const myInit = { // OPTIONAL
    headers: {query:listNewss}, // OPTIONAL
}
  async function apiuse() {
    return await API.get("lambdarest", "/news", myInit);
}
     
const items = apiuse()
    .then((response) => {
      console.log("response has been come out" );
    })
    .catch((error) => {
      console.log("error has been come out" );
    });

  const { t } = React.useContext(LocalizationContext);
  props.navigation.setOptions({
    headerTitle: t("newsHeaderName"),
    headerRight: () => {
      return (
        <View style={{ flexDirection: "row" }}>
          <Icon.Button
            style={{ backgroundColor: Colors.primary }}
            name={Platform.OS === "android" ? "video-camera" : "video-camera"}
            onPress={() => {
              props.navigation.navigate("Find");
            }}
          />
          <Icon.Button
            style={{ backgroundColor: Colors.primary }}
            name={Platform.OS === "android" ? "search" : "search"}
            onPress={() => {
              props.navigation.navigate("Find");
            }}
          />
          <MIcon.Button
            style={{ backgroundColor: Colors.primary }}
            name={
              Platform.OS === "android" ? "newspaper-plus" : "newspaper-plus"
            }
            onPress={() => {
              props.navigation.navigate("CreateNews");
            }}
          />
        </View>
      );
    },
    headerLeft: () => {
      return (
        <Icon.Button
          style={{ backgroundColor: Colors.primary }}
          name={Platform.OS === "android" ? "navicon" : "navicon"}
          onPress={() => {
            props.navigation.toggleDrawer();
          }}
        />
      );
    },
  });

  return (
    <View>
      <Text>This is News Paper daliy</Text>
    </View>
  );
};

export default NewsPaperScreen;


