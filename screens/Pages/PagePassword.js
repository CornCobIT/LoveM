import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../theme/style';

const PagePassword = ({ navigation }) => {
  const [password, setPassword] = useState('');

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.pageStyle}>
          <View style={styles.main}>
            <Text style={styles.titleName}>Choose a password</Text>
            <View style={styles.sectionStyle}>
              <Icon
                name="lock-closed-outline"
                size={27}
                style={styles.iconStyle}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Mật khẩu"
                secureTextEntry={true}
                onChangeText={handlePasswordChange}
                value={password}
              />
            </View>
            <Text style={{ color: 'white', marginTop: 5 }}>
              Your password must be at least{' '}
              <Text style={styles.bold}>8 chracters</Text>
            </Text>
          </View>
          <View style={styles.formatButton}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('PageName')}>
              <Text style={styles.textButton}>Continue</Text>
              <Icon
                name="arrow-forward-outline"
                size={27}
                style={styles.iconStyle}
                color={'white'}
              />
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
    height: 40,
    marginTop: 10,
    borderRadius: 10,
    width: '90%',
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
    width: '90%',
    height: 40,
    backgroundColor: COLORS.green,
    flexDirection: 'row',
  },
  textButton: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  bold: {
    fontWeight: 'bold',
    color: 'yellow',
  },
});

export default PagePassword;
