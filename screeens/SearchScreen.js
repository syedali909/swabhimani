import React from 'react'
import { View, Text } from 'react-native'
import AppHeader from '../component/AppHeader';
import { Searchbar } from 'react-native-paper';

 const  SearchScreen=(props)=> {
    props.navigation.setOptions(AppHeader(props,"defualt"));
    
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);
  
    return (
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
    );
}

export default SearchScreen;
