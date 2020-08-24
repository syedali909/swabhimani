import React from 'react'
import { View, Text } from 'react-native'
import Icon from "react-native-vector-icons/FontAwesome";
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { LocalizationContext } from '../App';


const AppHeader = (props,name) => {
    const { t } = React.useContext(LocalizationContext);
     
    return {
      headerTitle: t(name),
      headerRight: () => {
        return (
          <Icon.Button
            style={{ backgroundColor: Colors.primary }}
            name={Platform.OS === "android" ? "search" : "search"}
            onPress={() => {
              props.navigation.navigate("Find");
            } } />
        );
      },
      headerLeft: () => {
        return (
          <Icon.Button
            style={{ backgroundColor: Colors.primary }}
            name={Platform.OS === "android" ? "navicon" : "navicon"}
            onPress={() => {
              props.navigation.toggleDrawer();
            } } />
        );
      },
    };
  }

  export default  AppHeader;



