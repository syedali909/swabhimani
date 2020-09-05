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
import SettingScreen from "../screeens/SettingScreen";
import { LocalizationContext } from "../constant/localName";
import CreateNews from "../screeens/NewsScreen/CreateNews";
import { t } from "i18n-js";
import VideoRecording from "../component/CreateNewsComponent/AppCamera";
import MapViewfile from "../component/CreateNewsComponent/PlaceFinder";


const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTitleStyle: {},
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
    headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};


const getTabBarVisible = (route, naviName) =>{
    for(var i=0;i<naviName.length;i++){
        if(route?.state?.routes?.filter(element => element.name === naviName[i])[0]?.name === naviName[i] ){
            return false;
        }
    }
    return true
}

export const TabNavigator = () => {
  const  t  = LocalizationContextRef();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        return ({
        // tabBarVisible:()=> console.log('router.name', router.name.routeNames),

        tabBarIcon: ({ focused, color, size }) => {
          let iconName = route.name === "NewsPaperNav" ? "news" : "shop";
          // You can return any component that you like here!
        //  route.state?.routes[1].name
         return <Entypo name={iconName} size={size} color={color} />;
        },
      tabBarVisible :  getTabBarVisible(route, ["CreateNews","MapViewFile"])
      
      })}}
      tabBarOptions={{
        activeTintColor: "blue",
        inactiveTintColor: "gray",
        
      }}
    >
      <Tab.Screen name="NewsPaperNav" component={NewsPaperNavigator} options={{title:t("TabNews")}} />
      <Tab.Screen name="ShopingNav" component={ShopNavigator} options={{title:t("TabShop")}} />
    </Tab.Navigator>
  );
};

export const NewsPaperNavigator = () => {
  const  t  = LocalizationContextRef();
  return (
    <Stack.Navigator screenOptions={defaultNavOptions}>
      <Stack.Screen name="News" component={NewsPaperScreen} />
      <Stack.Screen name="CreateNews" component={CreateNews} options={{headerTitle:t('CreateNews'),}} />
      <Stack.Screen name="Camera" component={VideoRecording}/>
      <Stack.Screen name="MapViewFile" component={MapViewfile} />

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

const UtilitiesScreen = () => {
  return (
    <Stack.Navigator screenOptions={defaultNavOptions}>
      <Stack.Screen name="LanSetting" component={SettingScreen} />
    </Stack.Navigator>
  );
};

export const MainNavigation = () => {
  const  t  = LocalizationContextRef();
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName={"Home"} backBehavior="order">
        <Drawer.Screen name="Home" component={TabNavigator} options={{drawerLabel:t("Home")}} />
        <Drawer.Screen name="Setting" component={UtilitiesScreen} options={{drawerLabel:t("Setting")}} />
        <Drawer.Screen name="Find"  component={SearchScreen} options={{drawerLabel:t("Find")}} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const LocalizationContextRef = () =>{
  const { t } = React.useContext(LocalizationContext);
   return t;
}