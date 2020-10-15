import React from "react";
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import {
  RadioButton,
  Button,
  IconButton,
  Title,
  Subheading,
  Avatar,
  TouchableRipple,
  Snackbar,
  Portal,
  Provider,
} from "react-native-paper";
import AppHeader from "../component/AppHeader";
import { LocalizationContext } from "../constant/localName";
import { Auth } from "aws-amplify";
import { useDispatch, useSelector } from "react-redux";
import { currentUsersInfo } from "../store/action/newsAction";
import Icon from "react-native-vector-icons/Ionicons";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { TouchableItem } from "react-native-tab-view";
import * as ImagePicker from "expo-image-picker";

export default function SettingScreen(props) {
  props.navigation.setOptions({
    headerTitle: "Setting",
    headerLeft: () => (
      <View style={{ marginLeft: 10 }}>
        <Icon.Button
          size={25}
          style={{ backgroundColor: Colors.primary }}
          name="md-arrow-back"
          onPress={() => {
            props.navigation.goBack();
          }}
        />
      </View>
    ),
  });

  const { t, locale, setLocale } = React.useContext(LocalizationContext);
  const user = useSelector((state) => state.CreateNews.user);
  const [value, setValue] = React.useState("first");
  const [visible, setVisible] = React.useState(false);
  const dimension = Dimensions.get("screen").height;

  const onDismissSnackBar = () => setVisible(false);
  return (
    <View style={{ padding: 10 }}>
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
                marginTop: dimension - dimension * 0.2,
                height: dimension * 0.2,
                borderRadius: 20,
                backgroundColor: "#35383d",
                flexDirection: "row",
              }}
            >
              <IconButton
                icon="camera"
                color="white"
                size={50}
                onPress={async () => {
                  const result = await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                  });

                  console.log(result);
                }}
              />
              <IconButton
                icon="folder"
                color="white"
                size={50}
                onPress={async () => {
                  await ImagePicker.launchImageLibraryAsync();
                }}
              />
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          onPress={async () => {
            setVisible(true);
          }}
        >
          <Avatar.Text
            size={150}
            label={user?.ownerName?.substring(0, 2)?.toUpperCase()}
          />
        </TouchableOpacity>
        <Button
          labelStyle={{ fontStyle: "italic", color: "black" }}
          onPress={() => {}}
        >
          {user?.ownerName}
        </Button>
      </View>

      <RadioButton.Group
        onValueChange={(value) => {
          setValue(value), setLocale(value);
        }}
        value={value}
      >
        <View>
          <Title>Change Language to</Title>
          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <Subheading>मराठी</Subheading>
            <RadioButton value="mr" />
          </View>
          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <Subheading>English</Subheading>
            <RadioButton value="en" />
          </View>
        </View>
      </RadioButton.Group>
    </View>
  );
}
