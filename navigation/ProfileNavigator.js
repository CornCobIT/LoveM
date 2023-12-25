import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ProfileScreen from "../screens/Profile/Profile";
import EditProfile from "../screens/Profile/EditProfile";
import Intro from "../screens/Profile/components/Intro";
import ChangeEmail from "../screens/Profile/components/ChangeEmail";

const Stack = createStackNavigator();

export default function ProfileNavigator() {
  return (
    <Stack.Navigator initialRouteName="ProfileScreen">
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Intro"
        component={Intro}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChangeEmail"
        component={ChangeEmail}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
