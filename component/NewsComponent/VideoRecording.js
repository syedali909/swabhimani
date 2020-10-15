import React from "react";
import {
  View,
  Text,
  Dimensions,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { IconButton } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

const VideoRecording = (props) => {
  const {visible, setVisible,setcaptureLink} = props;
  const dimension = Dimensions.get("screen").height;
  const onDismissSnackBar = () => setVisible(false);

  return (
    <Modal transparent={true} visible={visible} onDismiss={onDismissSnackBar}>
      <TouchableOpacity
        style={{ width: "100%", height: "100%" }}
        activeOpacity={1}
        onPressOut={() => {
          setVisible(false);
        }}
      >
        <TouchableWithoutFeedback>
          <View
            style={{
              marginTop: dimension - dimension * 0.25,
              height: dimension * 0.25,
              borderRadius: 20,
              backgroundColor: "#35383d",
              flexDirection: "row",
            }}
          >
            <View style={{   alignItems:'center', flexDirection:"column"}}> 
            <IconButton
              icon="video-image"
              color="white"
              size={50}
              onPress={async () => {
                const result = await ImagePicker.launchCameraAsync({
                  mediaTypes: ImagePicker.MediaTypeOptions.Images,
                  allowsEditing: true,
                });
                setcaptureLink({content:"video", uri:result.uri})
                setVisible(false);
              }}
            />
            <Text style={{marginTop:-20,color:'white'}}>Photo</Text>
            </View>
            <View style={{   alignItems:'center', flexDirection:"column"}}> 
            <IconButton
              icon="video"
              color="white"
              size={50}
              onPress={async () => {
                const result = await ImagePicker.launchCameraAsync({
                  mediaTypes: ImagePicker.MediaTypeOptions.Videos,
                  allowsEditing: true,
                });
                setcaptureLink({content:"video", uri:result.uri})
                setVisible(false);
              }}
            />
            <Text style={{marginTop:-20,color:'white'}}>Video</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

export default VideoRecording;
