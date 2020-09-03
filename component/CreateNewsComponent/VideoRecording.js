import React, { useState, useEffect, useRef } from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import { Camera } from "expo-camera";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as Permissions from "expo-permissions";
import { Video } from 'expo-av';
import VideoPlayer from 'expo-video-player'

export default function VideoRecording(props) {
  props.navigation.setOptions({ headerShown: false });

  const [hasPermission, setHasPermission] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setflash] = useState(Camera.Constants.FlashMode.of);
  const [captureImg, setcaptureImg] = useState();
  const [camFuncVideo, setcamFuncVideo] = useState(false);
  const [isVideoRecding, setisVideoRecding] = useState(false);
  const [isPause, setIsPause] = useState(false);

  const refcam = useRef();
  useEffect(() => {
    (async () => {
      const { status } = await Permissions.askAsync(
        Permissions.CAMERA,
        Permissions.AUDIO_RECORDING
      );
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const snap = async () => {
    let photo;
    if (!camFuncVideo) {
      photo = await refcam.current.takePictureAsync();
    } else {
      setisVideoRecding(true);
      photo = await refcam.current.recordAsync();
    }

    setcaptureImg(photo);
    console.log("photo", photo);
  };

  if (captureImg) {
    console.log("captureImg", captureImg);
    return camFuncVideo ? (
<VideoPlayer
  videoProps={{
    shouldPlay: true,
    resizeMode: Video.RESIZE_MODE_CONTAIN,
    source: {
      uri: captureImg.uri     },
  }}
  inFullscreen={true}
/>
    ) : (
      <View style={{ flex: 1 }}>
        <Image source={{ uri: captureImg.uri }} style={{ flex: 1 }} />
      </View>
    );
  }

  const capturePhoto = () => {
    return (
      <View
        style={{
          marginBottom: 70,
          alignItems: "center",
          justifyContent: "space-around",
          height: 80,
          backgroundColor: "transparent",
          flexDirection: "row",
        }}
      >
        <Icon.Button
          name="camera-switch"
          size={40}
          backgroundColor="transparent"
          onPress={() =>
            setType(
              type !== Camera.Constants.Type.back
                ? Camera.Constants.Type.back
                : Camera.Constants.Type.front
            )
          }
        />

        <Icon.Button
          name={camFuncVideo ? "circle-slice-8" : "circle-outline"}
          size={80}
          color={camFuncVideo ? "red" : "white"}
          backgroundColor="transparent"
          onPress={() => {
            snap();
          }}
        />

        <Icon.Button
          name="flash"
          size={40}
          backgroundColor="transparent"
          onPress={() =>
            setflash(
              flash === Camera.Constants.FlashMode.torch
                ? Camera.Constants.FlashMode.of
                : Camera.Constants.FlashMode.torch
            )
          }
        />
      </View>
    );
  };

  const captureVideo = () => {
    return (
      <View
        style={{
          marginBottom: 70,
          alignItems: "center",
          justifyContent: "space-around",
          height: 80,
          backgroundColor: "transparent",
          flexDirection: "row",
        }}
      >
        <Icon.Button
          name={isPause ? "play-circle-outline" : "pause-circle-outline"}
          size={40}
          backgroundColor="transparent"
          onPress={() => {
            isPause
              ? refcam.current.resumePreview()
              : refcam.current.pausePreview();
            setIsPause(isPause ? false : true);
          }}
        />

        <Icon.Button
          name="record-circle"
          size={80}
          color="red"
          backgroundColor="transparent"
          onPress={() => {
            refcam.current.stopRecording();
            setisVideoRecding(false);
          }}
        />

        <Icon.Button
          name="flash"
          size={40}
          backgroundColor="transparent"
          onPress={() =>
            setflash(
              flash === Camera.Constants.FlashMode.torch
                ? Camera.Constants.FlashMode.of
                : Camera.Constants.FlashMode.torch
            )
          }
        />
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Camera
        ref={refcam}
        style={{ flex: 1, flexDirection: "column-reverse" }}
        type={type}
        flashMode={flash}
      >
        {isVideoRecding ? captureVideo() : capturePhoto()}
        <TouchableOpacity
          style={{ marginBottom: 70, flexDirection: "column-reverse" }}
          onPress={() => {
            setcamFuncVideo(camFuncVideo ? false : true);
          }}
        >
          <Text style={{ fontSize: 20, alignSelf: "center", color: "white" }}>
            {camFuncVideo ? "Photo" : "Video"}
          </Text>
        </TouchableOpacity>
      </Camera>
    </View>
  );
}
