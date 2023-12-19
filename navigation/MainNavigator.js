import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeNavigator from "../navigation/HomeNavigator";
import StartNavigator from "../navigation/StartNavigator";
import Auth from "./Auth";

const Stack = createStackNavigator();

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StartNavigator">
        <Stack.Screen
          name="StartNavigator"
          component={StartNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeNavigator"
          component={HomeNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
