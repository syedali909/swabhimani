import { API, graphqlOperation, Storage } from "aws-amplify";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions
} from "react-native";
import {
  Button,
  Divider,
  IconButton,
  Title,
  ActivityIndicator,
} from "react-native-paper";
import { useSelector } from "react-redux";
import {
  deleteComment,
  deleteLike,
  deleteNews,
} from "../../src/graphql/mutations";
import { getNews } from "../../src/graphql/queries";

export default function NewsItemList(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.CreateNews.user);
  return (
    <View style={styles.centeredView}>
      <IconButton
        icon="dots-vertical"
        onPress={() => {
          setModalVisible(true);
        }}
      />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <TouchableOpacity
          style={{ width: "100%", height: "100%" }}
          activeOpacity={1}
          onPressOut={() => {
            setModalVisible(false);
          }}
        >
          <ScrollView directionalLockEnabled={true}>
            <TouchableWithoutFeedback>
              <View style={styles.modalView}>
                <Button icon="do-not-disturb-off" onPress={() => {}}>
                  Do Not Suggest
                </Button>
                <Button icon="close-box-multiple" onPress={() => {}}>
                  Fake news/Rumour
                </Button>
                <Button icon="bell-outline" onPress={() => {}}>
                  Subscribe
                </Button>
                <Button
                  icon="campfire"
                  onPress={() => {
                  }}
                >
                  Abusue / Voilent
                </Button>
                <Button
                  icon="nature-people"
                  onPress={() => {
                  }}
                >
                  Against the policey
                </Button>
                {((user?.owner == "syedali909@gmail.com" &&
                  user?.ownerName == "swabhimani") ||
                  user?.owner == props.item?.owner) && (
                  <Button
                    icon="nature-people"
                    onPress={async () => {
                      Alert.alert(
                        "Delete Confirmation",
                        "Are you sure to delete the news",
                        [
                          {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel",
                          },
                          {
                            text: "OK",
                            onPress: async () => {
                              try {
                                setLoading(true);
                                const id = props.item.id;
                                const news = await API.graphql(
                                  graphqlOperation(getNews, { id: id })
                                );

                                news.data.getNews.comment.items.map(
                                  async (item) => {
                                    item.like.items.map(async (item) => {
                                      await API.graphql({
                                        query: deleteLike,
                                        variables: { input: { id: item.id } },
                                      });
                                    });
                                    await API.graphql({
                                      query: deleteComment,
                                      variables: { input: { id: item.id } },
                                    });
                                  }
                                );
                                news.data.getNews.like.items.map(
                                  async (item) => {
                                    await API.graphql({
                                      query: deleteLike,
                                      variables: { input: { id: item.id } },
                                    });
                                  }
                                );

                                await API.graphql({
                                  query: deleteNews,
                                  variables: { input: { id: id } },
                                });

                                console.log(
                                  "news.data.getNews.content",
                                  news.data.getNews.content
                                );
                                await Storage.remove(
                                  news.data.getNews.content.replace(
                                    "public/",
                                    ""
                                  )
                                ).then((result) => console.log(result));

                                if (news.data.getNews.uri) {
                                  news.data.getNews.uri
                                    .replace("public/", "")
                                    .replace(/[[ ]/g, "")
                                    .replace("]", "")
                                    .split(",")
                                    .map(async (uri) => {
                                      console.log("uri", uri);
                                      await Storage.remove(uri);
                                    });
                                }

                                setLoading(false);
                                setModalVisible(false);
                              } catch (error) {
                                Alert.alert("Error", "error in deleting file");
                                console.log("error", error);
                                setLoading(false);
                                setModalVisible(false);
                              }
                            },
                          },
                        ],
                        { cancelable: false }
                      );
                    }}
                  >
                    delete the news
                  </Button>
                )}
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </TouchableOpacity>
      </Modal>
      <Modal animationType="fade" transparent={true} visible={loading}>
        <ActivityIndicator
          style={{ marginTop: "60%" }}
          size={70}
          color="blue"
        />
      </Modal>
    </View>
  );
}

const dimension = Dimensions.get("screen").height;
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    marginTop:dimension-(dimension*0.38),
    height: dimension*0.38,
    backgroundColor: "#ebf2ed",
    bottom: 0,
    paddingBottom:50,
    paddingHorizontal: 35,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
