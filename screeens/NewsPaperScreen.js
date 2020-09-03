import React, { useState } from "react";
import { View, Text, Picker } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { LocalizationContext } from "../constant/localName";
// Set the key-value pairs for the different languages you want to support.

const NewsPaperScreen = (props) => {
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
        name={Platform.OS === "android" ? "newspaper-plus" : "newspaper-plus"}
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
