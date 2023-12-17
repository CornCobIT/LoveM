import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../theme/style';

const PageEmail = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isSelected, setSelection] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.pageStyle}>
          <View style={styles.main}>
            <Text style={styles.titleName}>What's your email?</Text>
            <View style={styles.sectionStyle}>
              <Icon name="mail-outline" size={27} style={styles.iconStyle} />
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                style={styles.textInput}
              />
            </View>
          </View>

          <View style={styles.formatButton}>
            <View style={styles.CheckBox}>
              <Text style={styles.textCheckBox}>
                By tapping Continue, you are agreeing to our Terms of Service
                and Privacy Policy
              </Text>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('PagePassword')}>
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
    height: 50,
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
    height: 50,
    backgroundColor: COLORS.green,
    flexDirection: 'row',
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

export default PageEmail;
