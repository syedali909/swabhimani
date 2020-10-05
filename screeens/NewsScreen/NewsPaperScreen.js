import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  RefreshControl,
  Linking,
  Share,
  StyleSheet,
  Alert,
  Modal,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";

import { Colors } from "react-native/Libraries/NewAppScreen";
import { LocalizationContext } from "../../constant/localName";
import { useDispatch, useSelector } from "react-redux";
import { currentUsersInfo, loadNews } from "../../store/action/newsAction";
import { API, Auth, Storage } from "aws-amplify";

import {
  Avatar,
  Banner,
  Button,
  Card,
  Drawer,
  IconButton,
  List,
  Paragraph,
  Portal,
  Title,
  Provider,
  TouchableRipple,
} from "react-native-paper";
import Moment from "react-moment";
import moment from "moment";
import { listNewss } from "../../src/graphql/queries";
import { wait } from "../../utilits/NewsUpload";
import CardFooter from "../../component/NewsComponent/CardFooter";
import UserAuthenticator from "../../component/AuthnticationUI/UserAuthenticator";
import { TouchableHighlight } from "react-native-gesture-handler";
import { createLike } from "../../src/graphql/mutations";
import AuthinticationModal from "../../component/AuthnticationUI/AuthinticationModal";
import NewsItemList from "../../component/NewsComponent/NewsItemList";

const NewsPaperScreen = (props) => {
  const newslist = useSelector((state) => state.CreateNews.listNews);
  const user = useSelector((state) => state.CreateNews.user);
  const dispatch = useDispatch();
  const [listNews, setlistNews] = useState();
  const [loading, setloading] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [likebutton, setlikebutton] = useState("heart-outline");
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    async function fetchUserInfo() {
      await Auth.currentAuthenticatedUser()
        .then((data) => {
          console.log("user.attributes", data);
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
        initialNumToRender={4}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={(news) => (
          <Card style={{ marginBottom: 10 }}>
            <Card.Title
              title={news.item.ownerName}
              titleStyle={{ fontSize: 14, fontFamily: "NotoSans_400Regular" }}
              subtitle={
                <Moment element={Text} fromNow>
                  {moment(news.item.createdAt).toDate()}
                </Moment>
              }
              left={(props) => <Avatar.Icon {...props} icon="folder" />}
              right={(props) => (
                <View >
                  <NewsItemList visible={visible} setVisible={setVisible}/>
                </View>
              )}
            />
            <TouchableRipple
              onPress={() =>
                props.navigation.navigate("NewsInDetail", {
                  item: news.item,
                  user: user,
                })
              }
            >
              <View>
                <Card.Content>
                  <Paragraph style={{ fontFamily: "NotoSans_400Regular" }}>
                    {news.item.headline}
                  </Paragraph>
                </Card.Content>
                {news.item.uri && (
                  <Card.Cover
                    source={{
                      uri: "https://s3swabhimanibucket100153-swabhimani.s3.amazonaws.com/".concat(
                        news.item.uri
                      ),
                    }}
                    style={{ width: "100%" }}
                  />
                )}
              </View>
            </TouchableRipple>
            <CardFooter item={news.item} />
          </Card>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
    marginBottom: 100,
    marginHorizontal: 20,
  },
});

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
