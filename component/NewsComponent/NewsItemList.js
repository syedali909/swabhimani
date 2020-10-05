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
} from "react-native";
import { Button, Divider, IconButton, Title } from "react-native-paper";
import UserAuthenticator from "../AuthnticationUI/UserAuthenticator";

export default function NewsItemList() {
  const [modalVisible, setModalVisible] = useState(false);
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
          Alert.alert("Modal has been closed.");
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
                <Button icon="campfire" onPress={() => {}}>
                  Abusue / Voilent
                </Button>
                <Button icon="nature-people" onPress={() => {}}>
                  Against the policey
                </Button>
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    marginTop: "125%",
    backgroundColor: "#ebf2ed",
    bottom: 0,
    padding: 35,
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
