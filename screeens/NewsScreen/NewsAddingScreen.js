import React, { useEffect, useState, useCallback, Component } from "react";
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import {
  ActivityIndicator,
  Appbar,
  Avatar,
  Button,
  Caption,
  IconButton,
  Snackbar,
  TextInput,
  TouchableRipple,
} from "react-native-paper";
import { LocalizationContext } from "../../constant/localName";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { Video } from "expo-av";
import { useSelector, useDispatch } from "react-redux";
import {
  createNewsAction,
  currentUsersInfo,
} from "../../store/action/newsAction";
import * as Network from "expo-network";
import { uploadAsync } from "expo-file-system";
import { uploadToStorage } from "../../utilits/NewsUpload";
import { Auth, Storage } from "aws-amplify";
import * as ImageManipulator from "expo-image-manipulator";
import VideoRecording from "../../component/NewsComponent/VideoRecording";
import Icon from "react-native-vector-icons/FontAwesome";
import { TouchableHighlight } from "react-native-gesture-handler";

const NewsAddingScreen = (props) => {
  const { navigation, route } = props.props;
  const user = useSelector((state) => state.CreateNews.user);
  const [captureLink, setcaptureLink] = useState(route.params?.link);
  const isVideoLink = route.params?.isVideo;
  const { t } = React.useContext(LocalizationContext);
  const [newsHeadLine, setnewsHeadLine] = useState("");
  const [newsContent, setnewsContent] = useState("");
  const dispatch = useDispatch();
  const [isNetwrokConnected, setisNetwrokConnected] = useState(false);
  const state = useSelector((state) => state);
  const [isUploading, setisUploading] = useState(false);
  const [visible, setVisible] = React.useState(false);

  navigation.setOptions({
    headerRight: () => {
      return (
        <Button
          icon="plus"
          mode="text"
          color="white"
          onPress={() =>
            inputPostFilter(newsHeadLine, 20) &&
            inputPostFilter(newsContent, 50) &&
            toUpload()
          }
        >
          Post
        </Button>
      );
    },
  });

  const toUpload = async () => {
    setisUploading(true);
    const uploaded = await uploadToStorage(
      captureLink?.uri,
      newsHeadLine,
      newsContent,
      user.ownerName
    );
    console.log("uploaded", uploaded);
    dispatch(createNewsAction(uploaded));
    if (uploaded) {
      setcaptureLink(null);
      setnewsHeadLine("");
      setnewsContent("");
    }
    setisUploading(false);
  };

  const postAlert = (alertMessage) => {
    Alert.alert("Incomplete News?", alertMessage, [
      { text: "Ok", style: "ok", onPress: () => {} },
    ]);
  };

  const inputPostFilter = (text, length) => {
    let trimtext = text.trim();
    let islength = trimtext.length > length;

    if (!islength) {
      length === 20
        ? postAlert("Please atleast 20 charchter of news headline")
        : length === 50 &&
          postAlert("Please atleast 50 charchter of news content");
    }
    return islength;
  };

  useEffect(() => {
    setcaptureLink(route.params?.link);
  }, [route.params]);

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
      if (result.uri.includes("jpg")) {
        const manipresult = await ImageManipulator.manipulateAsync(
          result.uri,
          [{ resize: { width: 400, height: 350 } }],
          { format: "jpeg" },
         { videoExportPreset: ImagePicker.VideoExportPreset.LowQuality}

        );
        setcaptureLink({ content: "image", uri: manipresult.uri });
      }
      if (result.uri.includes("mp4")) {
        setcaptureLink({ content: "video", uri: result.uri });
      }
    }
  };

  React.useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        const action = e.data.action;
        if (!newsHeadLine && !newsContent) {
          return;
        }

        e.preventDefault();

        Alert.alert(
          "Discard changes?",
          "You have unsaved changes. Are you sure to discard them and leave the screen?",
          [
            { text: "Don't leave", style: "cancel", onPress: () => {} },
            {
              text: "Discard",
              style: "destructive",
              onPress: () => navigation.dispatch(action),
            },
          ]
        );
      }),
    [newsContent, newsHeadLine, navigation]
  );

  const getNetworkStatus = async () => {
    const networkStatus = await Network.getNetworkStateAsync();
    const netBoolean =
      networkStatus.isConnected && networkStatus.isInternetReachable;
    setisNetwrokConnected(!netBoolean);
  };
  getNetworkStatus();

  if (isNetwrokConnected) {
    return (
      <View>
        <Caption>Please Check Internet Connection</Caption>
      </View>
    );
  }

  return props.authState === "signedIn" ? (
    isUploading ? (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    ) : (
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <View style={styles.container}>
          <ScrollView>
            <TextInput
              placeholder={t("HeadLineofNews")}
              mode="outlined"
              style={{ backgroundColor: "white", height: 35 }}
              value={newsHeadLine}
              onChangeText={(text) => {
                if (text.length > 140) {
                  return;
                }
                setnewsHeadLine(text);
              }}
              editable
            />
            <TextInput
              multiline={true}
              placeholder={t("ContentofNews")}
              style={{
                paddingBottom: 10,
                backgroundColor: "white",
              }}
              mode="outlined"
              numberOfLines={13}
              value={newsContent}
              onChangeText={(text) => {
                setnewsContent(text);
              }}
            />
            {captureLink?.uri && (
              <View
                style={{
                  marginStart: 15,
                  marginTop: 15,
                  width: 120,
                  height: 120,
                }}
              >
                <Image
                  style={{
                    width: 100,
                    height: 100,
                    resizeMode: "cover",
                  }}
                  source={{
                    uri: captureLink.uri,
                  }}
                />
                <TouchableOpacity
                  style={{ position: "absolute", top: -12, left: 85 }}
                  activeOpacity={10}
                  onPressOut={async() => {
                    // navigation.navigate("ImageEditing", {
                    //   link: captureLink,
                    // });
                    const response = await fetch(captureLink.uri)

                    const blob = await response.blob()


                    
                    await Storage.put('yourKeyHere.mp4', blob, {
                      contentType: 'video/mp4',
                    })

                    // navigation.navigate("VideoPlay", {
                    //   link: captureLink,
                    // });
                  }}
                >
                  <Avatar.Icon icon="pencil" color="white" size={25} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ position: "absolute", bottom: 9, left: 85 }}
                  activeOpacity={10}
                  onPressOut={() => setcaptureLink(null)}
                >
                  <Avatar.Icon icon="close" color="white" size={25} />
                </TouchableOpacity>
              </View>
            )}
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
              //navigation.navigate("Camera");
              setVisible(true);
            }}
          />
          <Appbar.Action
            icon="map-marker"
            color="red"
            onPress={() => navigation.navigate("MapViewFile")}
          />
        </Appbar>
        <VideoRecording
          setcaptureLink={setcaptureLink}
          visible={visible}
          setVisible={setVisible}
        />
      </View>
    )
  ) : (
    <></>
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

export default NewsAddingScreen;
