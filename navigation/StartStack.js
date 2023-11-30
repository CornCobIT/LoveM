import React, { useEffect, useState, useRef } from "react";
import { Animated, StyleSheet, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import SplashScreen from "../screens/SplashScreen";
import IntroSlideScreen from "../screens/IntroSlider"; // Import your IntroSlideScreen

const Stack = createStackNavigator();

export default function Start() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        {/* SplashScreen which will come once for 5 Seconds */}
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          // Hiding header for Splash Screen
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="IntroSlider"
          component={IntroSlideScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
  },
});
