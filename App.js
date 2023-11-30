import { StyleSheet, Text, View } from 'react-native'
import React, {Component} from 'react'

import { useFonts } from 'expo-font';

import Start from './navigation/StartStack'
import Loading from './screens/Loading';

const fetchFonts = {
    'Title': require('./assets/fonts/Title.ttf'),
    'Normal': require('./assets/fonts/Normal.ttf'),
  };


const App = () => {
  const [isLoaded] = useFonts(fetchFonts);
  
  if (!isLoaded) {
    return (
      <Loading />
    );
  } else {
    return (
      <Start />
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
  },
});

export default App;