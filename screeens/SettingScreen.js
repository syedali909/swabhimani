import React from "react";
import { View, Text } from "react-native";
import { LocalizationContext } from "../App";
import { RadioButton } from "react-native-paper";
import AppHeader from '../component/AppHeader';


export default function SettingScreen(props) {
  const { t, locale, setLocale } = React.useContext(LocalizationContext);

  // props.navigation.setOptions(AppHeader(props,"Setting"))
  const [value, setValue] = React.useState('first');

  return (
      <RadioButton.Group
        onValueChange={(value) => {setValue(value), setLocale(value)}}
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
      </RadioButton.Group>
  );
}
