import React from 'react';
import { View, Text, Image, Touchable, StyleSheet } from 'react-native';
import {COLORS} from '../theme/style';

const ChooseScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image />
            <View style={styles.nameApp}>
                <Image source={require('../assets/logo.png')} />
                <Text style={styles.title}>Love M</Text>
            </View>
            <Text>Live pics from your friends, on your home screen</Text>
            <Touchable
                style={styles.button}
                onPress={() => navigation.navigate('RegisterScreen')}>
                <Text>Create an account</Text>
            </Touchable>

            <Touchable
                style={styles.button}
                onPress={() => navigation.navigate('LoginScreen')}>
                <Text>Login</Text>
            </Touchable>            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nameApp: {
        flexDirection: 'column',
    },
    title: {
        fontSize: 27,
    },
    button: {
        boderRadius: 10,
        backgroundColor: COLORS.green,
    },
});

export default ChooseScreen;
