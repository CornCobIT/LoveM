import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SplashScreen from "../screens/Start/SplashScreen";
import IntroSlider from "../screens/Start/IntroSlider";

const Stack = createStackNavigator();

export default function StartNavigator() {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="IntroSlide"
        component={IntroSlider}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
