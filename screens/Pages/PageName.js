import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {COLORS} from './theme/style';

const PageName = ({ navigation }) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

  const handleRegister = () => {
    alert('Đăng ký thành công!');
    navigation.navigate('LoginScreen');
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.pageStyle}>
          <View style={styles.main}>
            <Text style={styles.titleName}>What's your name?</Text>
            <View style={styles.sectionStyle}>
              <TextInput
                placeholder="First Name"
                value={firstname}
                onChangeText={setFirstname}
                autoCapitalize="none"
                style={styles.textInput}
              />
            </View>

            <View style={styles.sectionStyle}>
              <TextInput
                placeholder="Last Name"
                value={lastname}
                onChangeText={setLastname}
                autoCapitalize="none"
                style={styles.textInput}
              />
            </View>
          </View>
          <View style={styles.formatButton}>
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.textButton}>Register</Text>
            </TouchableOpacity>
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
  textInput: {
    width: '100%',
    paddingLeft: 10,
  },
  sectionStyle: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    borderWidth: 0.5,
    height: 50,
    margin: 10,
    borderRadius: 10,
    width: '100%',
  },
  pageStyle: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 2,
    margin: 10,
  },
  main: {
    marginTop: 200,
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
    width: '100%',
    height: 50,
    backgroundColor: COLORS.green,
    flexDirection: 'row',
  },
  textButton: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default PageName;
