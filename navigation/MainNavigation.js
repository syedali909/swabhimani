// You can import Ionicons from @expo/vector-icons if you use Expo or
// react-native-vector-icons/Ionicons otherwise.
import * as React from "react";
import { Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import NewsPaperScreen from "../screeens/NewsPaperScreen";
import ShopingScreen from "../screeens/ShopingScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SearchScreen from "../screeens/SearchScreen";

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTitleStyle: {},
  headerBackTitleStyle: {},
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};
export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        defaultNavOptions,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = route.name === "NewsPaperNav" ? "news" : "shop";
          // You can return any component that you like here!
          return <Entypo name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "blue",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="NewsPaperNav" component={NewsPaperNavigator} />
      <Tab.Screen name="ShopingNav" component={ShopNavigator} />
    </Tab.Navigator>
  );
};

export const NewsPaperNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultNavOptions}>
      <Stack.Screen name="News" component={NewsPaperScreen} />
    </Stack.Navigator>
  );
};

export const ShopNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultNavOptions}>
      <Stack.Screen name="Shoping" component={ShopingScreen} />
    </Stack.Navigator>
  );
};

const MainPageNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultNavOptions}>
      <Stack.Screen name="MainPage" component={TabNavigator} />
    </Stack.Navigator>
  );
};

export const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName={'Home'}>
      <Drawer.Screen name="Find" component={SearchScreen} options={{title:''}} />
        <Drawer.Screen name="Home" component={TabNavigator} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};