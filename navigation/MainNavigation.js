// You can import Ionicons from @expo/vector-icons if you use Expo or
// react-native-vector-icons/Ionicons otherwise.
import * as React from "react";
import { Dimensions, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import NewsPaperScreen from "../screeens/NewsScreen/NewsPaperScreen";
import ShopingScreen from "../screeens/ShopingScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { Colors } from "react-native/Libraries/NewAppScreen";
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import SearchScreen from "../screeens/SearchScreen";
import SettingScreen from "../screeens/SettingScreen";
import { LocalizationContext } from "../constant/localName";
import NewsAddingScreen from "../screeens/NewsScreen/NewsAddingWithAuth";
import { t } from "i18n-js";
import VideoRecording from "../component/NewsComponent/AppCamera";
import MapViewfile from "../component/NewsComponent/PlaceFinder";
import NewsInDetailScreen from "../screeens/NewsScreen/NewsInDetailScreen";
import { Button, IconButton, Title } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useDispatch, useSelector } from "react-redux";
import { Auth } from "aws-amplify";
import { currentUsersInfo } from "../store/action/newsAction";
import ImageEditing from "../component/NewsComponent/ImageEditing";
import ViideoPlayer from "../component/NewsComponent/ViideoPlayer";

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTitleStyle: {},
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const getTabBarVisible = (route, naviName) => {
  for (var i = 0; i < naviName.length; i++) {
    if (
      route?.state?.routes?.filter((element) => element.name === naviName[i])[0]
        ?.name === naviName[i]
    ) {
      return false;
    }
  }
  return true;
};

export const TabNavigator = () => {
  const t = LocalizationContextRef();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        return {
          // tabBarVisible:()=> console.log('router.name', router.name.routeNames),

          tabBarIcon: ({ focused, color, size }) => {
            let iconName = route.name === "NewsPaperNav" ? "news" : "shop";
            // You can return any component that you like here!
            //  route.state?.routes[1].name
            return <Entypo name={iconName} size={size} color={color} />;
          },
          tabBarVisible: getTabBarVisible(route, [
            "CreateNews",
            "MapViewFile",
            "NewsInDetail",
          ]),
        };
      }}
      tabBarOptions={{
        activeTintColor: "blue",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="NewsPaperNav"
        component={NewsPaperNavigator}
        options={{ title: t("TabNews") }}
      />
      <Tab.Screen
        name="ShopingNav"
        component={ShopNavigator}
        options={{ title: t("TabShop") }}
      />
    </Tab.Navigator>
  );
};

export const NewsPaperNavigator = () => {
  const t = LocalizationContextRef();
  return (
    <Stack.Navigator screenOptions={defaultNavOptions}>
      <Stack.Screen name="News" component={NewsPaperScreen} />
      <Stack.Screen name="NewsInDetail" component={NewsInDetailScreen} />
      <Stack.Screen
        name="CreateNews"
        component={NewsAddingScreen}
        options={{ headerTitle: t("CreateNews") }}
      />
      <Stack.Screen name="ImageEditing" component={ImageEditing} />
      <Stack.Screen name="VideoPlay" component={ViideoPlayer} />
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

function CustomDrawerContent(props) {
  const user = useSelector((state) => state.CreateNews.user);
  const dispatch = useDispatch();

  const screenSize = Dimensions.get("screen").height;
  return (
    <View style={{ paddingBottom: 20 }}>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: Colors.primary,
          alignItems: "center",
        }}
      >
        <IconButton
          size={50}
          color="white"
          icon="account"
          onPress={() => {
            // Navigate using the `navigation` prop that you received
            props.navigation.navigate("Home");
          }}
        />
        <Title style={{ fontStyle: "italic", color: "white" }}>
          Hello {user?.ownerName}{" "}
        </Title>
      </View>
      <DrawerItemList {...props} activeBackgroundColor="white" />
      <Button
        style={{
          margin: 5,
          backgroundColor: "#e8e4da",
          alignSelf: "center",
          position: "absolute",
          top: screenSize - screenSize*0.13,
        }}
        labelStyle={{ color: "black" }}
        onPress={() => signOut(dispatch)}
      >
        SignOut
      </Button>
    </View>
  );
}

export const MainNavigation = () => {
  const t = LocalizationContextRef();
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen
          name="Home"
          component={TabNavigator}
          options={{
            drawerLabel: t("Home"),
            drawerIcon: (props) => (
              <Icon name="home" size={23} color={props.color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Setting"
          component={UtilitiesScreen}
          options={{
            drawerLabel: t("Setting"),
            drawerIcon: (props) => (
              <Icon name="settings" size={23} color={props.color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Find"
          component={SearchScreen}
          options={{
            drawerLabel: t("Find"),
            drawerIcon: (props) => (
              <Icon name="youtube-searched-for" size={23} color={props.color} />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const signOut = async (dispatch) => {
  try {
    await Auth.signOut();
    dispatch(currentUsersInfo(null));
  } catch (error) {
    console.log("error signing out: ", error);
  }
};

const LocalizationContextRef = () => {
  const { t } = React.useContext(LocalizationContext);
  return t;
};
