import React from 'react';
import { useFonts } from 'expo-font';
import Start from './navigation/StartStack';
import Loading from './screens/Loading';

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
      <Start />
    );
  }
};

export default App;
