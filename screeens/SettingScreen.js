import React from "react";
import { View, Text } from "react-native";
import { RadioButton , Button} from "react-native-paper";
import AppHeader from "../component/AppHeader";
import { LocalizationContext } from "../constant/localName";
import { Auth } from "aws-amplify";

export default function SettingScreen(props) {
  const { t, locale, setLocale } = React.useContext(LocalizationContext);

  // props.navigation.setOptions(AppHeader(props,"Setting"))
  const [value, setValue] = React.useState("first");

  const  signOut= async()=> {
    try {
        await Auth.signOut();
    } catch (error) {
        console.log('error signing out: ', error);
    }
}


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
      <Button
        icon="camera"
        mode="contained"
        onPress={() => signOut()}
      >
       signOut
      </Button>
    </RadioButton.Group>
  );
}
