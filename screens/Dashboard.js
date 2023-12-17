import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { firebase } from '../config';
import { COLORS } from '../theme/style';
import Icon from 'react-native-vector-icons/Ionicons';

const Dashboard = () => {
  // const [name, setName] = useState('');

  useEffect(() => {
    firebase.firestore().collection('user')
      .doc(firebase.auth().currentUser.uid).get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setName(snapshot.data())
        }
        else {
          console.log('User does not exist')
        }
      })
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.headerContainer}>
          <View style={styles.avatar}>
            <Image
              style={styles.imgStyle}
              source={{
                uri: 'https://walkersarewelcome.org.uk/wp-content/uploads/computer-icons-google-account-icon-design-login-png-favpng-jFjxPac6saRuDE3LiyqsYTEZM.jpg',
              }}
            />
            <Icon name="add-circle-outline" size={20} color="#455e14" />
          </View>
          <Text style={styles.textStyle}>Account</Text>
          <TouchableOpacity style={styles.editButton}>
            <Text>Edit Info</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bigTitle}>
          <View style={styles.titlesContainer}>
            <Icon name="account" size={20} />
            <Text style={{paddingLeft: 5}}>Wigget Setup</Text>
          </View>
          <TouchableOpacity style={styles.toggleButton}>
            <Icon name="add-circle" size={20} />
            <Text style={{paddingLeft: 5}}>Add the Widget</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toggleButton}>
            <Icon style={styles.toggleButton} name="help-circle" size={20} />
            <Text style={{paddingLeft: 5}}>Widget Tutorial</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bigTitle}>
          <View style={styles.titlesContainer}>
            <Icon name="person-outline" size={20} />
            <Text style={{paddingLeft: 5}}>General</Text>
          </View>
          <TouchableOpacity style={styles.toggleButton}>
            <Icon name="mail" size={20} />
            <Text style={{paddingLeft: 5}}>Change email address</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toggleButton}>
            <Icon name="help-circle" size={20} />
            <Text style={{paddingLeft: 5}}>Get help</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toggleButton}>
            <Icon name="send" size={20} />
            <Text style={{paddingLeft: 5}}>Share feedback</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bigTitle}>
          <View style={styles.titlesContainer}>
            <Icon name="heart" size={20} />
            <Text style={{paddingLeft: 5}}>About</Text>
          </View>
          <TouchableOpacity style={styles.toggleButton}>
            <Icon style={styles.toggleButton} name="logo-tiktok" size={20} />
            <Text style={{paddingLeft: 5}}>TikTok</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toggleButton}>
            <Icon name="logo-instagram" size={20} />
            <Text style={{paddingLeft: 5}}>Instagram</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toggleButton}>
            <Icon name="logo-twitter" size={20} />
            <Text style={{paddingLeft: 5}}>Twitter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toggleButton}>
            <Icon name="share" size={20} />
            <Text style={{paddingLeft: 5}}>Share Locket</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toggleButton}>
            <Icon name="star" size={20} />
            <Text style={{paddingLeft: 5}}>Rate Locket</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toggleButton}>
            <Icon name="" size={20} />
            <Text style={{paddingLeft: 5}}>Terms of Service</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toggleButton}>
            <Icon name="lock-closed" size={20} />
            <Text style={{paddingLeft: 5}}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bigTitle}>
          <View style={styles.titlesContainer}>
            <Icon name="alert-circle" size={20} />
            <Text style={{paddingLeft: 5}}>Danger Zone</Text>
          </View>
          <TouchableOpacity style={styles.toggleButton}
            onPress={() => { firebase.auth().signOut() }}>
            <Icon name="log-out" size={20} />
            <Text style={{paddingLeft: 5}}>Sign Out</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toggleButton}>
            <Icon name="trash-outline" size={20} />
            <Text style={{paddingLeft: 5}}>Delete account</Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    flexDirection: 'row',
  },
  imgStyle: {
    width: 50,
    height: 50,
    borderWidth: 0.5,
  },
  textStyle: {
    fontSize: 27,
    fontWeight: 'bold',
  },
  editButton: {
    borderRightColor: 10,
    backgroundColor: 'gray',
  },
  titlesContainer: {
    flexDirection: 'row',
  },
  toggleButton: {
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: 'gray',
    marginTop: 5,
    paddingLeft: 10,
    alignItems: 'center',
    height: 30,
  },
  bigTitle: {
    flexDirection: 'column',
    margin: 10,
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 5,
  },
});


export default Dashboard;