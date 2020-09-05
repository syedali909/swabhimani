import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  BackHandler,
  Alert,
} from "react-native";
import { Appbar, Button, Card, TextInput } from "react-native-paper";
import { LocalizationContext } from "../../constant/localName";
import { Colors } from "react-native/Libraries/NewAppScreen";

import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { Video } from "expo-av";

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

  const captureLink = props.route.params?.link;
  const isVideoLink = props.route.params?.isVideo;
  const { t } = React.useContext(LocalizationContext);
  const [picker, setpicker] = React.useState(false);
  const [videorec, setvideorec] = useState(false);
  const [image, setimage] = React.useState("");
  const [newsHeadLine, setnewsHeadLine] = useState();
  const [newsContent, setnewsContent] = useState();
  const [collapsed, setCollapsed] = useState(true);
  const hasUnsavedChanges = Boolean(newsHeadLine);
  const navigation= props.navigation;


  const getPermissionAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    console.log("status", status);
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    } else {
      imagepick();
    }
  };

    React.useEffect(
      () =>
        navigation.addListener('beforeRemove', (e) => {
          const action = e.data.action;
          if (!hasUnsavedChanges) {
            return;
          }
          e.preventDefault();

          Alert.alert(
            'Discard changes?',
            'You have unsaved changes. Are you sure to discard them and leave the screen?',
            [
              { text: "Don't leave", style: 'cancel', onPress: () => {} },
              {
                text: 'Discard',
                style: 'destructive',
                onPress: () => navigation.dispatch(action),
              },
            ]
          );
        }),
      [hasUnsavedChanges, navigation]
    );

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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      enabled
      keyboardVerticalOffset={-160}
    >
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <View style={styles.container}>
          <ScrollView>
            <TextInput
              placeholder={t("HeadLineofNews")}
              mode="outlined"
              style={{ backgroundColor: "white", height: 30 }}
              value={newsHeadLine}
              onChangeText={(text) => {
                setnewsHeadLine(text);
              }}
              editable
            />
            <TextInput
              multiline={true}
              placeholder={t("ContentofNews")}
              style={{
                backgroundColor: "white",
              }}
              mode="outlined"
              numberOfLines={13}
              value={newsContent}
              onChangeText={(text) => {
                setnewsContent(text);
              }}
            />
            {captureLink &&
              (isVideoLink ? (
                <Video
                  source={{
                    uri: captureLink.uri,
                  }}
                  shouldPlay={false}
                  style={{
                    marginStart: 15,
                    marginTop: 15,
                    width: 100,
                    height: 100,
                  }}
                />
              ) : (
                <Image
                  style={{
                    marginStart: 15,
                    marginTop: 10,
                    width: 100,
                    height: 100,
                    resizeMode: "cover",
                  }}
                  source={{ uri: captureLink.uri }}
                />
              ))}
          </ScrollView>
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
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: "stretch",
    backgroundColor: "white",
    paddingBottom: 50,
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
