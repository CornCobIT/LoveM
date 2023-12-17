import React from 'react';
import { useFonts } from 'expo-font';
import Loading from './screens/Loading';
import MainNavigator from './navigation/MainNavigator';

const fetchFonts = {
  'Playfair': require('./assets/fonts/PlayfairDisplay.ttf'),
  'Sacramento': require('./assets/fonts/Sacramento.ttf'),
};

const App = () => {
  const [isLoaded] = useFonts(fetchFonts);
  if (!isLoaded) {
    return (
      <Loading />
    );
  } else {
    return (
      <MainNavigator />
    );
  }
};

export default App;
