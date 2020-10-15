import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Text,
  Alert,
} from "react-native";
import * as ImageManipulator1 from "expo-image-manipulator";
import { Card, IconButton, Snackbar, TextInput } from "react-native-paper";
import { ImageManipulator } from "expo-image-crop";
import ViewShot from "react-native-view-shot";
import { DragResizeBlock } from "react-native-drag-resize";
import { BlurView } from "expo-blur";

const ImageEditing = (props) => {
  props.navigation.setOptions({ headerShown: false });
  const [image, setImage] = useState(props.route.params?.link);
  const [toggle, settoggle] = useState(false);
  const [manpShow, setManpShow] = useState(false);
  const ref = useRef();
  const imgref = useRef();
  const { width, height } = Dimensions.get("window");
  const [istext, setistext] = useState(false);
  const [blurShow, setblurShow] = useState(false);
  const [backgImage, setbackgImage] = useState();
  const [hideCropView, sethideCropView] = useState(false);
  const [visible, setVisible] = React.useState(true);

  const _rotate90andFlip = async (originX, originY, width, height) => {
    const manipResult = await ImageManipulator1.manipulateAsync(
      image.uri,
      [{ crop: { originX, originY, width, height } }],
      { compress: 1, format: ImageManipulator1.SaveFormat.jpg }
    );
    setbackgImage(manipResult);
  };
  

  return (
    <View
      style={{
        justifyContent: "center",
        padding: 20,
        alignItems: "center",
        height,
        width,
        backgroundColor: "black",
      }}
    >
     <Snackbar
        visible={visible}
        style={{backgroundColor:"gray", marginBottom:100}}
        onDismiss={() => setVisible(false)}
        action={{
          label: 'Ok',
          onPress: () => {
            setVisible(false)
          },
        }}>
        you can revert the slection by click again on the component
      </Snackbar>
      <View style={{ width: 390, justifyContent: "center", height: 340 }}>
        <ViewShot ref={ref} options={{ format: "jpg", quality: 1 }}>
          <ImageBackground
            style={{ width: 390, height: 340 }}
            source={{
              uri: image.uri,
            }}
          >
            <ImageManipulator
              photo={{ uri: image.uri }}
              isVisible={manpShow}
              onPictureChoosed={({ uri: uriM }) => {
                setImage({ content: "image", uri: uriM });
                setManpShow(false);
              }}
              onToggleModal={() => settoggle(!toggle)}
            />
            {blurShow && (
              <View style={{ marginTop: -5, marginLeft: -2.5}}>
                <DragResizeBlock
                  isDisabled={hideCropView}
                  x={20}
                  y={20}
                  limitation={{ x: 0, y: 0, w: 400, h: 350 }}
                  ref={imgref}
                >
                  {hideCropView ? (
                    <ImageBackground
                      blurRadius={1}
                      source={{
                        uri: backgImage?.uri,
                      }}
                      style={{
                        height: "100%",
                        width: "100%",
                      }}
                    />
                  ) : (
                    <BlurView
                      intensity={200}
                      style={{ width: "100%", height: "100%" }}
                    />
                  )}
                </DragResizeBlock>
              </View>
            )}
            {istext && (
              <TextInput
                style={{
                  marginTop: "70%",
                  marginHorizontal: "30%",
                  width: 150,
                }}
                mode="outlined"
              />
            )}
          </ImageBackground>
        </ViewShot>
      </View>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          position: "absolute",
          top: 20,
          right: 10,
        }}
        onPress={async () => {
          const uri = await ref.current.capture();

          const manipResult = await ImageManipulator1.manipulateAsync(
            uri,
            [{ resize: { width: 400, height: 350 } }],
            {
              format: ImageManipulator1.SaveFormat.jpeg,
            }
          );

          setImage({content: "image",uri : manipResult.uri});
          setblurShow(false)
        }}
        activeOpacity={0.6}
      >
          <IconButton icon={"content-save"} color="white" size={30} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          position: "absolute",
          top: 20,
          left: 10,
        }}
        onPress={async () => {
          sethideCropView(true);
          const imageParm = imgref.current.state;
          await _rotate90andFlip(
            imageParm.x,
            imageParm.y,
            imageParm.w,
            imageParm.h
          );
        }}
        activeOpacity={0.6}
      >
        {blurShow && <IconButton icon="check" color="white" size={30} />}
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          position: "absolute",
          top: 20,
          left: 10,
        }}
        onPress={() =>
          props.navigation.navigate("CreateNews", {
            link: image,
          })
        }
        activeOpacity={0.6}
      >
       {!blurShow && <IconButton icon="arrow-left" color="white" size={30} />}
      </TouchableOpacity>
      <View style={{ flexDirection: "row", position: "absolute", bottom: 10 }}>
        <TouchableOpacity onPress={() => setManpShow(true)} activeOpacity={0.6}>
          <IconButton icon="crop" color="white" size={50} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setistext(!istext)}
          activeOpacity={0.6}
        >
          <IconButton icon="format-text" color="white" size={50} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setblurShow(!blurShow);
            sethideCropView(false);
          }}
          activeOpacity={0.6}
        >
          <IconButton icon="blur" color="white" size={50} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ImageEditing;
