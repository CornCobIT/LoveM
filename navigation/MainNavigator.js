import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeNavigator from "../navigation/HomeNavigator";
import StartNavigator from "../navigation/StartNavigator";
import Auth from "./Auth";

const Stack = createStackNavigator();

export default function MainNavigator() {
  // const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  // useEffect(() => {
  //   AsyncStorage.getItem('alreadyLaunched').then(value => {
  //     if (value == null) {
  //       AsyncStorage.setItem('alreadyLaunched', 'true'); // Nếu chưa từng mở ứng dụng, đặt giá trị 'true'
  //       setIsFirstLaunch(true); // Đặt isFirstLaunch thành true để hiển thị StartNavigator
  //     } else {
  //       setIsFirstLaunch(false); // Nếu đã mở ứng dụng trước đó, đặt isFirstLaunch thành false để bỏ qua StartNavigator
  //     }
  //   });
  // }, []);

  // if (isFirstLaunch === null) {
  //   return null;
  // } else if (isFirstLaunch === true) {
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
  // } else {
    // return (
    //   <NavigationContainer>
    //     <Stack.Navigator initialRouteName="HomeNavigator">
    //       <Stack.Screen
    //         name="Auth"
    //         component={Auth}
    //         options={{ headerShown: false }}
    //       />
    //       <Stack.Screen
    //         name="HomeNavigator"
    //         component={HomeNavigator}
    //         options={{ headerShown: false }}
    //       />
    //     </Stack.Navigator>
    //   </NavigationContainer>
    // );
  // }
}
