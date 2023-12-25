// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";

// import HomeNavigator from "../navigation/HomeNavigator";
// import Auth from "./Auth";

// const Stack = createStackNavigator();

// export default function MainNavigator() {
//     return (
//       <NavigationContainer>
//         <Stack.Navigator initialRouteName="Auth">
//           <Stack.Screen
//             name="Auth"
//             component={Auth}
//             options={{ headerShown: false }}
//           />
//           <Stack.Screen
//             name="HomeNavigator"
//             component={HomeNavigator}
//             options={{ headerShown: false }}
//           />
//         </Stack.Navigator>
//       </NavigationContainer>
//     );
// }

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeNavigator from "../navigation/HomeNavigator";
import Auth from "./Auth";
import { useAuth } from "../context/AuthContext";

const Stack = createStackNavigator();

export default function MainNavigator() {
  const { user } = useAuth();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen name="HomeNavigator" component={HomeNavigator} options={{header: () => null}}/>
        ) : (
          <Stack.Screen name="Auth" component={Auth} options={{header: () => null}}/>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
