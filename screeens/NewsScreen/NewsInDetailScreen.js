import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  FlatList,
  ScrollView,
  Dimensions,
  NativeModules,
} from "react-native";
import {
  ActivityIndicator,
  Card,
  Headline,
  IconButton,
  Paragraph,
  Button,
  Avatar,
} from "react-native-paper";
import CardFooter from "../../component/NewsComponent/CardFooter";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { API } from "aws-amplify";
import { useSelector } from "react-redux";
import AuthinticationModal from "../../component/AuthnticationUI/AuthinticationModal";
import { createComment } from "../../src/graphql/mutations";
import { YellowBox } from "react-native";
import Moment from "react-moment";
import moment from "moment";
import { useHeaderHeight } from "@react-navigation/stack";
import Constants from "expo-constants";

YellowBox.ignoreWarnings([
  "VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.", // TODO: Remove when fixed
]);
const Tab = createMaterialTopTabNavigator();

function SuggestionScreen(props) {

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
}

const CommentScreen = (props) => {
  const comment = props.route.params?.comment;
  return (
    <SafeAreaView style={{ marginBottom: 50 }}>
      <FlatList
        data={comment.items}
        keyExtractor={(comment) => comment.id}
        renderItem={(comment) => {
          return (
            <Card style={{marginBottom:5}}> 
              <Card.Title
                title={comment.item.ownerName}
                titleStyle={{
                  fontSize: 14,
                  fontFamily: "NotoSans_400Regular",
                }}
                subtitle={
                  <Moment element={Text} fromNow>
                    {moment(comment.item.createdAt).toDate()}
                  </Moment>
                }
                left={(props) => <Avatar.Icon {...props} icon="folder" />}
                right={(props) => (
                  <View
                    style={{
                      alignItems: "flex-end",
                      flexDirection: "column",
                    }}
                  >
                    <IconButton
                      {...props}
                      icon="dots-vertical"
                      onPress={() => {}}
                    />
                    <View style={{ flexDirection: "row" ,marginTop:'-10%' }}>
                      <CardFooter
                        item={comment.item}
                        likeDetails={{
                          commentId: comment.item.id,
                        }}
                        showShareCommnet={true}
                      />
                    </View>
                  </View>
                )}
              />
              <Card.Content style={{marginTop:'-2%'}}>
                <Paragraph style={{ fontFamily: "NotoSans_400Regular" }}>
                  {comment.item.content}
                </Paragraph>
              </Card.Content>
            </Card>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default function NewsInDetailScreen({ route }) {
  const [item] = useState(route.params?.item);
  const [newsText, setnewsText] = useState();
  const [text, setText] = React.useState("");
  const [visible, setVisible] = useState(false);
  const user = useSelector((state) => state.CreateNews.user);
  const [loading, setloading] = useState(false);
  const tabBarHight =
    Dimensions.get("screen").height -
    useHeaderHeight() -
    Constants.statusBarHeight;

  useEffect(() => {
    async function fetchData() {
      try {
        await fetch(
          "https://s3swabhimanibucket100153-swabhimani.s3.amazonaws.com/".concat(
            item.content
          )
        )
          .then((r) => r.text())
          .then((text) => {
            setnewsText(text);
          });
      } catch (error) {
        console.log("error", error);
      }
    }
    fetchData();
  }, [item]);

  useEffect(() => {
    user && setVisible(false);
  }, [user]);

  return (
    <View>
      <ScrollView>
        <Headline
          style={{
            paddingTop: 10,
            paddingLeft: 10,
            fontFamily: "NotoSans_400Regular",
          }}
        >
          {item.headline}
        </Headline>
        {item.uri
          ?.replace(/[[ ]/g, "")
          .replace("]", "")
          .split(",")
          .map((uri, i) => (
            <Card.Cover
              key={i}
              source={{
                uri: "https://s3swabhimanibucket100153-swabhimani.s3.amazonaws.com/".concat(
                  uri
                ),
              }}
              style={{ width: "100%" }}
            />
          ))}
        <Paragraph
          style={{
            padding: 10,
            textAlign: "justify",
            lineHeight: 30,
            justifyContent: "space-around",
            fontSize: 18,
            fontFamily: "NotoSans_400Regular",
          }}
        >
          {newsText}
        </Paragraph>
        <View style={{ backgroundColor: "white" }}>
          <CardFooter item={item} />
        </View>
        <AuthinticationModal visible={visible} setVisible={setVisible} />
        <View style={{ height: tabBarHight - 22, marginTop: -20 }}>
          <Tab.Navigator
            tabBarOptions={{
              labelStyle: { fontSize: 13, fontWeight: "bold" },
            }}
          >
            <Tab.Screen
              name="Comment"
              component={CommentScreen}
              initialParams={{ comment: item.comment }}
            />

            <Tab.Screen name="Suggestion" component={SuggestionScreen} />
          </Tab.Navigator>
        </View>
      </ScrollView>

      <View style={styles.container}>
        <TextInput
          placeholder="comment"
          value={text}
          placeholderTextColor={"gray"}
          style={{ width: "70%", padding: 10, fontSize: 20 }}
          onChangeText={(text) => setText(text)}
        />
        <IconButton
          icon="send"
          size={loading ? 0 : 22}
          onPress={
            text &&
            (async () => {
              setloading(true);
              const todoDetails = {
                newsId: item.id,
                content: text,
                ownerName: user.ownerName,
              };
              try {
                const newTodo = await API.graphql({
                  query: createComment,
                  variables: { input: todoDetails },
                });
                setText("");
              } catch (error) {
                user
                  ? Alert.alert("There is eroor in sign in")
                  : setVisible(true);
              }
              setloading(false);
            })
          }
        />
        {loading && <ActivityIndicator animating={loading} color="red" />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 5,
    backgroundColor: "#adb8c9",
    borderRadius: 20,
    marginHorizontal: 5,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "space-evenly",
  },
});
