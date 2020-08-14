import Amplify from 'aws-amplify'
import config from './aws-exports'
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MainNavigation } from './navigation/MainNavigation';


Amplify.configure(config)

export default function App() {
  return (
     <MainNavigation  />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
