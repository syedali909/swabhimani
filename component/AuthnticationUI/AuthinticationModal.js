import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TouchableOpacity, ScrollView, TouchableWithoutFeedback
} from "react-native";
import { Button, IconButton, Title } from "react-native-paper";
import UserAuthenticator from "../AuthnticationUI/UserAuthenticator";

export default function AuthinticationModal(props) {
    return (
      <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.visible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
          <TouchableOpacity 
             style={{width:'100%',height:'100%'}}
            activeOpacity={1} 
            onPressOut={() => {props.setVisible(false)}}
          >
            <ScrollView 
              directionalLockEnabled={true} 
            >
              <TouchableWithoutFeedback>
                <View style={styles.modalView}>
                <UserAuthenticator/>
                </View>
              </TouchableWithoutFeedback>
            </ScrollView>
          </TouchableOpacity> 
      </Modal>
    </View>
    )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    marginTop:100,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
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
