import React from 'react'
import { View, Text } from 'react-native'
import Icon from "react-native-vector-icons/FontAwesome";
import { Colors } from 'react-native/Libraries/NewAppScreen';

const ShopingScreen= (props)=> {
    props.navigation.setOptions({
        headerTitle: "Shoping Screen",
        headerRight: () => {
          return (
            <Icon.Button
              style={{ backgroundColor: Colors.primary }}
              name={Platform.OS === "android" ? "search" : "search"}
              onPress={() => {
                props.navigation.navigate("Find");
              }}
            />
          );
        },
        headerLeft: () => {
          return (
            <Icon.Button
              style={{ backgroundColor: Colors.primary }}
              name={Platform.OS === "android" ? "navicon" : "navicon"}
              onPress={() => {
                props.navigation.toggleDrawer();
              }}
            />
          );
        },
      });
    return (
        <View>
            <Text>This is Shoping ShopingScreen</Text>
        </View>
    )
}

export default ShopingScreen;