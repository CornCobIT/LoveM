import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { firebase } from '../config';

import LoginScreen from './Login';
import RegisterScreen from './Register';
import Header from '../components/Header';
import Dashboard from './Dashboard';

import { COLORS } from '../theme/style'

const Stack = createStackNavigator();

function Auth() {
    const [initializing, setInittializing] = useState(true);
    const [user, setUser] = useState();

    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInittializing(false);
    }

    useEffect(() => {
        const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

    if (initializing) return null;

    if (!user) {
        return (
            <Stack.Navigator>
                <Stack.Screen
                    name='Login'
                    component={LoginScreen}
                    options={{
                        headerTitle: () => <Header name="Love M" />,
                        headerStyle: {
                            height: 150,
                            borderBottomLeftRadius: 50,
                            borderBottomRightRadius: 50,
                            backgroundColor: COLORS.green,
                            elevation: 25
                        }
                    }}
                />

                <Stack.Screen
                    name='Register'
                    component={RegisterScreen}
                    options={{
                        headerTitle: () => <Header name="Love M" />,
                        headerStyle: {
                            height: 150,
                            borderBottomLeftRadius: 50,
                            borderBottomRightRadius: 50,
                            backgroundColor: COLORS.green,
                            elevation: 25
                        }
                    }}
                />
            </Stack.Navigator>
        )
    }

    return (
        <Stack.Navigator>
            <Stack.Screen
                    name='Dashboard'
                    component={Dashboard}
                    options={{
                        headerTitle: () => <Header name="Dashboard" />,
                        headerStyle: {
                            height:150,
                            borderBottomLeftRadius: 50,
                            borderBottomRightRadius:50,
                            backgroundColor: COLORS.green,
                            elevation:25
                        }
                    }}
                    />
        </Stack.Navigator>
    );
}

export default () => {
    return (
        <NavigationContainer>
            <Auth/>
        </NavigationContainer>
    )
}