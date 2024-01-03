import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import FriendList from "../screens/CameraScreen/FriendList";
import HomeScreen from "../screens/CameraScreen/Home";
import ProfileNavigator from "../navigation/ProfileNavigator";
import DisplayScreen from "../screens/CameraScreen/DisplayScreen";
import ImageList from "../screens/CameraScreen/ImageList";
import Auth from "./Auth";

const Stack = createStackNavigator();

export default function HomeNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
        key="HomeScreenKey"
      />
      <Stack.Screen
        name="DisplayScreen"
        component={DisplayScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ImageList"
        component={ImageList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FriendList"
        component={FriendList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AuthScreen"
        component={Auth}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
