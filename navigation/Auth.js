import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import LoginScreen from "../screens/Login";
import RegisterScreen from "../screens/Register";
import StartNavigator from "./StartNavigator";
import { useStart } from "../context/StartContext";

const Stack = createStackNavigator();

export default function Auth() {
  const { isFirstLaunch } = useStart();
  let routeName;
  if (isFirstLaunch === null) {
    return null;
  }
  else if (isFirstLaunch === true) {
    routeName = "StartNavigator";
  } else {
    routeName = "Login";
  }
  
  return (
    <Stack.Navigator initialRouteName={{ routeName }}>
      <Stack.Screen
        name="StartNavigator"
        component={StartNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

