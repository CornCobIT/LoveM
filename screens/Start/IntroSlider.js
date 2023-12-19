import React, { useState, useRef, useCallback } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { useNavigation } from "@react-navigation/native";

import { slides } from "../../data/intro";
import { COLORS, FONTS, STYLES } from "../../theme/style";
import Button from "../../components/Button";

const IntroSlider = () => {
  const navigation = useNavigation();
  const sliderRef = useRef(null);
  const [isLastSlide, setIsLastSlide] = useState(false);

  const onSlideChange = useCallback((index) => {
    setIsLastSlide(index === slides.length - 1);
  }, []);

  const onDone = useCallback(() => {
    navigation.navigate("Auth");
  }, [navigation]);

  const renderItem = useCallback(({ item }) => {
    return (
      <SlideItem item={item} />
    );
  }, []);

  return (
    <View style={styles.container}>
      <Text style={[STYLES.header, styles.header]}>
        Add the widget {"\n"} to your home screen
      </Text>
      <View style={styles.sliderContainer}>
        <AppIntroSlider
          renderItem={renderItem}
          data={slides}
          onDone={onDone}
          dotStyle={styles.dot}
          onSlideChange={onSlideChange}
          activeDotStyle={styles.activeDot}
          ref={sliderRef}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          text="I've enabled the widget"
          handlePress={() => navigation.navigate("Auth")}
          backgroundColor={isLastSlide ? COLORS.logo : COLORS.gray}
          color={isLastSlide ? COLORS.black : COLORS.darkGray}
        />
      </View>
    </View>
  );
};

const SlideItem = ({ item }) => {
  return (
    <View style={styles.slideItemContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={[STYLES.title, styles.title]}>{item.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightBlack,
  },
  header: {
    paddingTop: 50,
  },
  sliderContainer: {
    flex: 1,
    backgroundColor: COLORS.lightBlack,
  },
  buttonContainer: {
    marginHorizontal: 10,
    marginBottom: 20,
  },
  slideItemContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.lightBlack,
  },
  image: {
    width: 200,
    height: 310,
    borderRadius: 20,
  },
  title: {
    fontFamily: FONTS.title,
    fontSize: 20,
    color: COLORS.white,
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "center",
  },
  dot: {
    backgroundColor: COLORS.gray,
  },
  activeDot: {
    backgroundColor: COLORS.white,
  },
});

export default IntroSlider;
