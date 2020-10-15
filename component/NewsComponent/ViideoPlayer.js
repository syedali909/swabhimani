import React, { useState } from "react";
import { Video } from "expo-av";
import VideoPlayer from "expo-video-player";
import { View } from "react-native";

const ViideoPlayer = (props) => {
  const [video, setvideo] = useState(props.route.params?.link);
  return (
    <View style={{flex:1,alignItems:"center"}}>
      <Video
        source={{ uri: video.uri }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay
        isLooping
        style={{ width: "98%", height: 300 ,marginTop:200, margin:20}}
      />
    </View>
  );
};

export default ViideoPlayer;
