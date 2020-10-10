import React from "react";
import { View, Text } from "react-native";
import AppHeader from "../component/AppHeader";
import { IconButton, Searchbar } from "react-native-paper";
import Constants from "expo-constants";

const SearchScreen = (props) => {
 

  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <View style={{marginTop:Constants.statusBarHeight}}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
    </View>
  );
};

export default SearchScreen;
