import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  View,
  Platform,
  ScrollView,
  ToastAndroid,
} from "react-native";

import InputField from "../../components/InputField";
import { COLORS, STYLES } from "../../theme/style";
import ButtonCustom from "../../components/Button";
import HeaderLeft from "../../components/HeaderLeft";
import { useAuth } from "../../context/AuthContext";

export default function EditProfile({ navigation }) {
  const { user, updateUser } = useAuth();
  const [firstNameFocused, setFirstNameFocused] = useState(false);
  const [lastNameFocused, setLastNameFocused] = useState(false);
  const [firstName, setFirstName] = useState(user?.firstName||'');
  const [lastName, setLastName] = useState(user?.lastName || '');

  const handleFocus = (inputName) => {
    switch (inputName) {
      case "firstName":
        setFirstNameFocused(true);
        break;
      case "lastName":
        setLastNameFocused(true);
        break;
      default:
        break;
    }
  };

  const handleBlur = (inputName) => {
    switch (inputName) {
      case "firstName":
        setFirstNameFocused(false);
        break;
      case "lastName":
        setLastNameFocused(false);
        break;
      default:
        break;
    }
  };

  const handleSave = async () => {
    const updatedProfile = {
      firstName: firstName,
      lastName: lastName,
    };
  
    if (updatedProfile.firstName.length > 30) {
      throw new Error("< 30");
    }
  
    // Gọi hàm updateUser với updatedProfile
    updateUser(updatedProfile);
    showToast("Name updated successfully!");
    navigation.navigate("Profile");
  };
  

  const showToast = (message) => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };

  return (
    <View style={STYLES.container}>
      <HeaderLeft icon={"arrow-back"} handlePress={() => navigation.goBack()} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.headerContainer}>
            <Text style={STYLES.header}>Edit your name</Text>
          </View>
          <View style={styles.inputContainer}>
            <InputField
              label="First Name"
              value={firstName}
              placeholder="First name"
              keyboardType="default"
              secureTextEntry={false}
              isPasswordField={false}
              onFocus={() => handleFocus("firstName")}
              onBlur={() => handleBlur("firstName")}
              focused={firstNameFocused}
              toggleVisibility={false}
              onChangeText={setFirstName}
            />
            <InputField
              label="Last Name"
              value={lastName}
              placeholder="Last name"
              keyboardType="default"
              onFocus={() => handleFocus("lastName")}
              onBlur={() => handleBlur("lastName")}
              focused={lastNameFocused}
              onChangeText={setLastName}
            />
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <ButtonCustom
            text={"Save"}
            backgroundColor={COLORS.logo}
            handlePress={handleSave}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 30,
  },
  headerContainer: {
    marginBottom: 70,
  },
  inputContainer: {
    width: "100%",
  },
  buttonContainer: {
    padding: 30,
  },
});
