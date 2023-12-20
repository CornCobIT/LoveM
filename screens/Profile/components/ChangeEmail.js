import React, { useState } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { useAuth } from "../../../context/AuthContext";
import InputField from "../../../components/InputField";
import ButtonCustom from "../../../components/Button";
import { STYLES } from "../../../theme/style";

const ChangeEmail = ({ navigation }) => {
  const [newEmail, setNewEmail] = useState("");
  const { user, updateUserProfile } = useAuth();

  const handleChangeEmail = async () => {
    try {
      if (user) {
        await user.updateEmail(newEmail);
        await user.sendEmailVerification(); // Gửi email xác nhận
        Alert.alert(
          "Email updated successfully! Please verify your new email."
        );
        updateUserProfile({ email: newEmail }); // Cập nhật thông tin người dùng trong Context
      }
    } catch (error) {
      console.error("Error updating email: ", error);
      if (error.code === "auth/email-already-in-use") {
        Alert.alert("The new email is already in use by another account.");
      } else {
        Alert.alert("Failed to update email. Please try again.");
      }
    }
  };

  return (
    <View style={STYLES.container}>
      <HeaderLeft icon={"arrow-back"} handlePress={() => navigation.goBack()} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <View style={styles.headerContainer}>
          <Text style={STYLES.header}>Enter new email:</Text>
        </View>
        <InputField
          onChangeText={(text) => setNewEmail(text)}
          value={newEmail}
          placeholder="New Email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <View style={styles.buttonContainer}>
          <ButtonCustom
            text="Change Email"
            handlePress={handleChangeEmail}
            color={COLORS.white}
            backgroundColor={COLORS.logo}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChangeEmail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  keyboardView: {
    flex: 1,
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
