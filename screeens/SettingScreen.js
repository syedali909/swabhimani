import React from "react";
import { View, Text } from "react-native";
import { RadioButton, Button, IconButton } from "react-native-paper";
import AppHeader from "../component/AppHeader";
import { LocalizationContext } from "../constant/localName";
import { Auth } from "aws-amplify";
import { useDispatch } from "react-redux";
import { currentUsersInfo } from "../store/action/newsAction";
import Icon from "react-native-vector-icons/Ionicons";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function SettingScreen(props) {
  props.navigation.setOptions({
    headerTitle: "Setting",
    headerLeft: () => (
      <View style={{marginLeft:10}}>
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

  // props.navigation.setOptions(AppHeader(props,"Setting"))
  const [value, setValue] = React.useState("first");
  const dispatch = useDispatch();
  const signOut = async () => {
    try {
      await Auth.signOut();
      dispatch(currentUsersInfo(null));
    } catch (error) {
      console.log("error signing out: ", error);
    }
  };

  return (
    <RadioButton.Group
      onValueChange={(value) => {
        setValue(value), setLocale(value);
      }}
      value={value}
    >
      <View>
        <Text>Marathi</Text>
        <RadioButton value="mr" />
      </View>
      <View>
        <Text>English</Text>
        <RadioButton value="en" />
      </View>
      <Button icon="camera" mode="contained" onPress={() => signOut()}>
        signOut
      </Button>
    </RadioButton.Group>
  );
}
