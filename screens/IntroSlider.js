import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { slides } from '../data/intro';
import { FONTS } from '../theme/style';
import Button from '../components/Button';

const IntroSlider = ({ navigation }) => {
  const [showRealApp, setShowRealApp] = useState(false);

  const renderItem = ({ item }) => (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );

  const onDone = () => {
    setShowRealApp(true);
    navigation.navigate('ChooseScreen');
  };

  const renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Text style={styles.buttonText}>Next</Text>
      </View>
    );
  };

  const renderDoneButton = () => {
    return (
      <TouchableOpacity style={styles.buttonCircle} onPress={onDone}>
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
    );
  };

  const renderSkipButton = () => {
    return (
      <TouchableOpacity style={styles.buttonCircle} onPress={onDone}>
        <Text style={styles.buttonText}>Skip</Text>
      </TouchableOpacity>
    );
  };

  if (showRealApp) {
    return <Start />;
  } else {
    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>Add the widget to your home screen</Text>
        <AppIntroSlider
          renderItem={renderItem}
          data={slides}
          onDone={onDone}
          renderNextButton={renderNextButton}
          renderDoneButton={renderDoneButton}
          renderSkipButton={renderSkipButton}
          dotStyle={styles.dot}
          activeDotStyle={styles.activeDot}
        />
        <Button text='I`ve enabled the widget' onPress={onDone} /> 
      </View>
    );
  }
};

export default IntroSlider;

const styles=StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontFamily: FONTS.normal,
    fontSize: 24,
    color: '#000',
    fontWeight: 'bold',
    position: 'absolute',
    top: 100,
    alignSelf: 'center',
    textAlign: 'center',
  },
  image: {
    width: 200,
    height: 300,
  },
  text: {
    fontFamily: FONTS.normal,
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
  },
  dot: {
    backgroundColor: 'rgba(0, 0, 0, .2)',
  },
  activeDot: {
    backgroundColor: '#000',
  },
  buttonCircle: {
    width: 60,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
  },
});
