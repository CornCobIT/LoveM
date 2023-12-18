import { View, Text, TouchableOpacity, TextInput, StyleSheet, SafeAreaView, Image } from 'react-native'
import React, { useState } from 'react';
import { firebase } from '../config';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../theme/style';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  registerUser = async (email, password, firstName, lastName) => {
    await firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase.auth().currentUser.sendEmailVerification({
          handleCodeInApp: true,
          url: 'https://lovem-415cd.firebaseapp.com',
        })
          .then(() => {
            alert('Verification email send')
          }).catch((error) => {
            alert(error.message)
          })
          .then(() => {
            firebase.firestore().collection('users')
              .doc(firebase.auth().currentUser.uid)
              .set({
                firstName,
                lastName,
                email,
              })
          })
          .catch((error) => {
            alert(error.message)
          })
      })
      .catch((error) => {
        alert(error.message)
      })
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.pageStyle}>
          <View style={styles.main}>
            <Image
              source={require('../assets/logo.png')}
              style={styles.imgStyle} />
            <Text style={styles.titleName}>Create an account</Text>
            <View style={styles.sectionStyle}>
              <Icon name="person-outline" size={27} style={styles.iconStyle} />
              <TextInput
                placeholder="First Name"
                onChangeText={(firstName) => setFirstName(firstName)}
                autoCorrect={false}
                style={styles.textInput}
              />
            </View>

            <View style={styles.sectionStyle}>
              <Icon name="person-outline" size={27} style={styles.iconStyle} />
              <TextInput
                placeholder="Last Name"
                onChangeText={(lastName) => setLastName(lastName)}
                autoCorrect={false}
                style={styles.textInput}
              />
            </View>

            <View style={styles.sectionStyle}>
              <Icon name="mail-outline" size={27} style={styles.iconStyle} />
              <TextInput
                placeholder="Email"
                onChangeText={(email) => setEmail(email)}
                autoCapitalize='none'
                autoCorrect={false}
                style={styles.textInput}
              />
            </View>

            <View style={styles.sectionStyle}>
              <Icon
                name="lock-closed-outline"
                size={27}
                style={styles.iconStyle}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
                autoCapitalize='none'
                autoCorrect={false}
              />
            </View>

            <View style={styles.formatButton}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => registerUser(email, password, firstName, lastName)}>
                <Text style={styles.textButton}>REGISTER</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  titleName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  },
  imgStyle: {
    width: 200,
    height: 200,
    borderRadius: 20,
    marginBottom: 10,
  },
  textInput: {
    width: 300,
  },
  iconStyle: {
    marginLeft: 10,
    marginRight: 10,
  },
  sectionStyle: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    borderWidth: 0.5,
    height: 50,
    marginTop: 10,
    borderRadius: 10,
  },
  pageStyle: {
    flexDirection: 'column',
    margin: 10,
  },
  main: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  formatButton: {
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    margin: 10,
    width: 320,
    height: 50,
    backgroundColor: COLORS.logo,
  },
  textButton: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  textCheckBox: {
    margin: 10,
    color: 'white',
  },
});

export default RegisterScreen;