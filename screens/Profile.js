import React from 'react';
import {
  View,
  Scrollview,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ProfileScreen = () => {
  return (
    <Scrollview style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.avatar}>
          <Image
            style={styles.imgStyle}
            source={{
              uri: 'https://walkersarewelcome.org.uk/wp-content/uploads/computer-icons-google-account-icon-design-login-png-favpng-jFjxPac6saRuDE3LiyqsYTEZM.jpg',
            }}
          />
          <Icon name="add-circle-outline" size={27} color="#455e14" />
        </View>
        <Text style={styles.textStyle}>Account</Text>
        <TouchableOpacity style={styles.editButton}>
          <Text>Edit Info</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bigTitle}>
        <View style={styles.titlesContainer}>
          <Icon name="account" size={27} />
          <Text>Wigget Setup</Text>
        </View>
        <TouchableOpacity style={styles.toggleButton}>
          <Icon name="add-circle" size={27} />
          <Text>Add the Widget</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toggleButton}>
          <Icon style={styles.toggleButton} name="help-circle" size={27} />
          <Text>Widget Tutorial</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bigTitle}>
        <View style={styles.titlesContainer}>
          <Icon name="person-outline" size={27} />
          <Text>General</Text>
        </View>
        <TouchableOpacity style={styles.toggleButton}>
          <Icon name="mail" size={27} />
          <Text>Change email address</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toggleButton}>
          <Icon name="help-circle" size={27} />
          <Text>Get help</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toggleButton}>
          <Icon name="send" size={27} />
          <Text>Share feedback</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bigTitle}>
        <View style={styles.titlesContainer}>
          <Icon name="heart" size={27} />
          <Text>About</Text>
        </View>
        <TouchableOpacity style={styles.toggleButton}>
          <Icon style={styles.toggleButton} name="logo-tiktok" size={27} />
          <Text>TikTok</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toggleButton}>
          <Icon name="logo-instagram" size={27} />
          <Text>Instagram</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toggleButton}>
          <Icon name="logo-twitter" size={27} />
          <Text>Twitter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toggleButton}>
          <Icon name="share" size={27} />
          <Text>Share Locket</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toggleButton}>
          <Icon name="star" size={27} />
          <Text>Rate Locket</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toggleButton}>
          <Icon name="" size={27} />
          <Text>Terms of Service</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toggleButton}>
          <Icon name="lock-closed" size={27} />
          <Text>Privacy Policy</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bigTitle}>
        <View style={styles.titlesContainer}>
          <Icon name="alert-circle" size={27} />
          <Text>Danger Zone</Text>
        </View>
        <TouchableOpacity style={styles.toggleButton}>
          <Icon name="log-out" size={27} />
          <Text>Sign Out</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toggleButton}>
          <Icon name="trash-outline" size={27} />
          <Text>Delete account</Text>
        </TouchableOpacity>
      </View>
    </Scrollview>
  );
};

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
  },
  bigTitle: {
    flexDirection: 'column',
  },
});

export default ProfileScreen;
