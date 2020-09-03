import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { TextInput, Appbar, Button, Card } from "react-native-paper";
import { LocalizationContext } from "../../constant/localName";
import { Colors } from "react-native/Libraries/NewAppScreen";

import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

const CreateNews = (props) => {
  props.navigation.setOptions({
    headerRight: () => {
      return (
        <Button
          icon="plus"
          mode="text"
          color="white"
          onPress={() => console.log("Pressed")}
        >
          Post
        </Button>
      );
    },
  });

  const { t } = React.useContext(LocalizationContext);
  const [picker, setpicker] = React.useState(false);
  const [videorec, setvideorec] = useState(false);
  const [image, setimage] = React.useState("");

  const getPermissionAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    console.log("status", status);
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    } else {
      imagepick();
    }
  };

  const imagepick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setimage(result.uri);
    }
    console.log(result);
  };

  return (
    <View style={{ flex: 6 }}>
      <View style={styles.container}>
        <TextInput
          placeholder={t("HeadLineofNews")}
          mode="outlined"
          style={{ backgroundColor: "white" }}
        />
        <Card style={{   marginTop:10, borderWidth: 1,borderRadius: 2,borderColor: "rgba(0,0,0,1)"}}>

        <TextInput
          multiline={true}
          placeholder={t("ContentofNews")}
          numberOfLines={15}
          style={{ backgroundColor: "white" }}
        />
        </Card>
      </View>
      <Appbar style={styles.bottom}>
        <Appbar.Action
          color="blue"
          icon="camera-plus-outline"
          onPress={() => {
            getPermissionAsync();
          }}
        />
        <Appbar.Action
          color="blue"
          icon="video-plus"
          onPress={() => {
            props.navigation.navigate("Camera");
          }}
        />
        <Appbar.Action
          icon="map-marker"
          color="red"
          onPress={() => props.navigation.navigate("MapViewFile")}
        />
      </Appbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 4,
    alignItems: "stretch",
    backgroundColor: "white",
  },
  bottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "white",
  },
});

export default CreateNews;
