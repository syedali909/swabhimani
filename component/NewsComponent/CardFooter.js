import React, { useEffect, useState } from "react";
import { View, Text, Linking, Share, Alert } from "react-native";
import { Button, Caption, Card, IconButton, Modal, Snackbar } from "react-native-paper";
import { DataStore } from "@aws-amplify/datastore";
import { createComment, createLike } from "../../src/graphql/mutations";
import { API } from "aws-amplify";
import AuthinticationModal from "../AuthnticationUI/AuthinticationModal";
import { useSelector } from "react-redux";

export default function CardFooter(props) {
  const likes = props.item.like.items;

  const user = useSelector(state => state.CreateNews.user)
  const [visible, setVisible] = useState(false);
  const [isLike, setisLike] = useState(likes.find((item)=> item.owner == user))
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "React Native | A framework for building native apps using React",
      });
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(
    () => {
      user && setVisible(false)
    },
    [user],
  )

  return (
    <View>
      <Card.Actions style={{ justifyContent: "space-around" }}>
        <View style={{flexDirection:'row',alignItems:'center'}}>
        <IconButton
          icon={isLike ?"thumb-up" : "thumb-up-outline" }
          color={isLike && "blue"}
          title="abcd"
          style={{color:'blue'}}
          onPress={!isLike &&( async () => {

            const todoDetails = {
              newsId: props.item.id,
            };
            try {
              const newTodo = await API.graphql({
                query: createLike,
                variables: { input: todoDetails },
              });
              setisLike(true)
            } catch (error) {
              user
                ? Alert.alert("There is eroor in sign in")
                : setVisible(true);
            }
          })}
        />
          <Caption>{likes.length==0 ? "" : likes.length}</Caption>

        </View>
        <IconButton icon="thumb-down-outline" />
        <IconButton icon="comment-outline" />
        <IconButton icon="share-variant" onPress={onShare} />
      </Card.Actions>
      <AuthinticationModal visible={visible} setVisible={setVisible}/>
    </View>
  );
}
