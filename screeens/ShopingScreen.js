import React from 'react'
import { View, Text } from 'react-native'
import AppHeader from '../component/AppHeader';

const ShopingScreen= (props)=> {
    props.navigation.setOptions(AppHeader(props,"shopHeaderName"));
    return (
        <View>
            <Text>This is Shoping ShopingScreen</Text>
        </View>
    )
}

export default ShopingScreen;


