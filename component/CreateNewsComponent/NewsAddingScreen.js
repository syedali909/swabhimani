import React, { useEffect, useState, useCallback, Component } from "react";
import {
    View,
    StyleSheet,
    Image,
    KeyboardAvoidingView,
    ScrollView,
    Alert,
  } from "react-native";
  import { Appbar, Button, TextInput } from "react-native-paper";
  import { LocalizationContext } from "../../constant/localName";
  import * as Permissions from "expo-permissions";
  import * as ImagePicker from "expo-image-picker";
  import { Video } from "expo-av";


  
const NewsAddingScreen= (props) => {
    const {navigation,route}= props.props;
    navigation.setOptions({
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
      const [captureLink, setcaptureLink] = useState(route.params?.link);
      const isVideoLink = route.params?.isVideo;
      const { t } = React.useContext(LocalizationContext);
      const [picker, setpicker] = React.useState(false);
      const [videorec, setvideorec] = useState(false);
      const [image, setimage] = React.useState("");
      const [newsHeadLine, setnewsHeadLine] = useState();
      const [newsContent, setnewsContent] = useState();
      const [collapsed, setCollapsed] = useState(true);
      const hasUnsavedChanges = Boolean(newsHeadLine);
    
    
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
          setcaptureLink(result);
        }
        console.log(result.uri);
      };
    
      React.useEffect(
        () =>
          navigation.addListener("beforeRemove", (e) => {
            const action = e.data.action;
            if (!hasUnsavedChanges) {
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
        [hasUnsavedChanges, navigation]
      );
     
        return (
            props.authState=== 'signedIn' ?
                <View style={{ backgroundColor: "white", flex: 1 }}>
                  <View style={styles.container}>
                    <ScrollView>
                      <TextInput
                        placeholder={t("HeadLineofNews")}
                        mode="outlined"
                        style={{ backgroundColor: "white", height: 35 }}
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
                          paddingBottom:10,
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
                        navigation.navigate("Camera");
                      }}
                    />
                    <Appbar.Action
                      icon="map-marker"
                      color="red"
                      onPress={() => navigation.navigate("MapViewFile")}
                    />
                  </Appbar>
                </View>
              : <></>
            )
    
}


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