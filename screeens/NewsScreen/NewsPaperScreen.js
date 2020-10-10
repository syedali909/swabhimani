import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  RefreshControl,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";

import { Colors } from "react-native/Libraries/NewAppScreen";
import { LocalizationContext } from "../../constant/localName";
import { useDispatch, useSelector } from "react-redux";
import { currentUsersInfo, loadNews } from "../../store/action/newsAction";
import { Auth } from "aws-amplify";

import { CardList } from "../../component/NewsComponent/CardList";


const NewsPaperScreen = (props) => {
  const newslist = useSelector((state) => state.CreateNews.listNews);
  const user = useSelector((state) => state.CreateNews.user);
  const dispatch = useDispatch();
  const [] = useState();
  const [] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [] = useState("heart-outline");
  const [] = useState(false);
  useEffect(() => {
    async function fetchUserInfo() {
      await Auth.currentAuthenticatedUser()
        .then((data) => {
          let user = { owner: data.username, ownerName: data.attributes.name };
          dispatch(currentUsersInfo(user));
        })
        .catch((err) => console.log(err));
    }
    fetchUserInfo();

    dispatch(loadNews());
  }, []);

  const { t } = React.useContext(LocalizationContext);
  props.navigation.setOptions({
    headerTitle: t("newsHeaderName"),
    headerRight: () => {
      return (
        <View style={{ flexDirection: "row" }}>
          <Icon.Button
            style={{ backgroundColor: Colors.primary }}
            name={Platform.OS === "android" ? "video-camera" : "video-camera"}
            onPress={() => {
              props.navigation.navigate("Find");
            }}
          />
          <Icon.Button
            style={{ backgroundColor: Colors.primary }}
            name={Platform.OS === "android" ? "search" : "search"}
            onPress={() => {
              props.navigation.navigate("Find");
            }}
          />
          <MIcon.Button
            style={{ backgroundColor: Colors.primary }}
            name={
              Platform.OS === "android" ? "newspaper-plus" : "newspaper-plus"
            }
            onPress={() => {
              props.navigation.navigate("CreateNews");
            }}
          />
        </View>
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

  const onRefresh = React.useCallback( () => {
    setRefreshing(true);
    dispatch(loadNews());

    setTimeout(()=>{
      setRefreshing(false)
    },2000)
  }, []);

  return (
    <View>
      <FlatList
        data={newslist}
        keyExtractor={(news) => news.id}
        initialNumToRender={3}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={(news) => (
          <CardList news={news} props={props} user={user} />
        )}
      />
    </View>
  );
};


export default NewsPaperScreen;

// const myInit = { // OPTIONAL
//   headers: {query:listNewss}, // OPTIONAL
// }
// async function apiuse() {
//   return await API.get("lambdarest", "/news", myInit);
// }

// const items = apiuse()
//   .then((response) => {
//     console.log("response has been come out" );
//   })
//   .catch((error) => {
//     console.log("error has been come out" );
//   });
