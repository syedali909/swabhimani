import React, { useEffect, useState } from "react";
import { View, Text, Linking, Share, Alert } from "react-native";
import { Button, Caption, Card, IconButton, Modal, Snackbar } from "react-native-paper";
import { DataStore } from "@aws-amplify/datastore";
import { createComment, createLike } from "../../src/graphql/mutations";
import { API } from "aws-amplify";
import AuthinticationModal from "../AuthnticationUI/AuthinticationModal";
import { useSelector } from "react-redux";
import { likeResponse } from "../../utilits/NewsUtilts";

export default function CardFooter(props) {
  const showShareCommnet = !props.showShareCommnet 
  const likes = props.item.like.items;
  const user = useSelector(state => state.CreateNews.user)
  const [visible, setVisible] = useState(false);
  const [isLike, setisLike] = useState(likes?.find((item)=> item.owner == user?.owner))
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
    <View >
      <Card.Actions style={{ justifyContent: "space-around",marginBottom:-25  }}>
        <View style={{flexDirection:'row',alignItems:'center'}}>
        <IconButton
          icon={isLike ?"thumb-up" : "thumb-up-outline" }
          color={isLike && "blue"}
          title="abcd"
          style={{color:'blue'}}
          onPress={!isLike &&likeResponse(props.likeDetails, setisLike, user, setVisible)}
        />
          <Caption>{likes?.length==0 ? "" : likes?.length}</Caption>

        </View>
        <IconButton icon="thumb-down-outline" />
        {showShareCommnet && <IconButton icon="comment-outline" />}        
        {showShareCommnet &&<IconButton icon="share-variant" onPress={onShare} />}
      </Card.Actions>
      <AuthinticationModal visible={visible} setVisible={setVisible}/>
    </View>
  );
}



