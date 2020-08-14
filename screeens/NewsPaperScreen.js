import React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Colors } from "react-native/Libraries/NewAppScreen";
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

// Set the key-value pairs for the different languages you want to support.
i18n.translations = {
  en: { welcome: 'Hello', name: 'Charlie' },
  ja: { welcome: 'こんにちは' },
};
// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;
// When a value is missing from a language it'll fallback to another language with the key present.
i18n.fallbacks = true;

const NewsPaperScreen = (props) => {
  props.navigation.setOptions({
    headerTitle: ()=>{{i18n.t('welcome')} {i18n.t('name')}},
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
