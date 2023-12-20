import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect } from "react";
import { firebase } from "../config";

import LoginScreen from "../screens/Login";
import RegisterScreen from "../screens/Register";
import HomeNavigator from "./HomeNavigator";

const Stack = createStackNavigator();

export default function Auth() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscriber = firebase
      .auth()
      .onAuthStateChanged((authenticatedUser) => {
        if (authenticatedUser) {
          setUser(authenticatedUser);
        } else {
          setUser(null);
        }
        setInitializing(false);
      });

    return subscriber; 
  }, []);

  if (initializing) return null;

  return (
    <Stack.Navigator initialRouteName={user ? "HomeNavigator" : "Login"}>
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
      <Stack.Screen
        name="HomeNavigator"
        component={HomeNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
