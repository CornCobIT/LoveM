import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PageEmail from '../Pages/PageEmail';
import PagePassword from '../Pages/PagePassword';

const Stack = createNativeStackNavigator();

const LoginScreen = () => {
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PageEmail">
        <Stack.Screen
          name="PageEmail"
          component={PageEmail}
          options={{
            title: 'Page Email', //Set Header Title
            headerStyle: {
              backgroundColor: 'black', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="PagePassword"
          component={PagePassword}
          options={{
            title: 'Page Password', //Set Header Title
            headerStyle: {
              backgroundColor: 'black', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default LoginScreen;