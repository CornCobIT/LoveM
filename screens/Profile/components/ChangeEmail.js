import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { useAuth } from "../../../context/AuthContext";
import InputField from "../../../components/InputField";
import ButtonCustom from "../../../components/Button";
import { COLORS, STYLES } from "../../../theme/style";
import HeaderLeft from "../../../components/HeaderLeft";
import { auth } from "../../../config";

const ChangeEmail = ({ navigation }) => {
  const { user, updateUserEmail } = useAuth();
  const [newEmail, setNewEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleChangeEmail = async () => {
    // const result = await updateUserEmail(newEmail, password);
    // if (result.success) {
    //   Alert.alert("Success", "Email updated successfully.");
    //   navigation.goBack();
    // } else {
    //   Alert.alert("Error", result.error.message);
    // }
    auth.sendPasswordResetEmail(auth.currentUser.email)
    .then(() => {
      alert("Password reset email sent successfully")
    }).catch((error) => {
      alert(error)
    })
  };
  

  // return (
  //   <View style={STYLES.container}>
  //     <HeaderLeft icon={"arrow-back"} handlePress={() => navigation.goBack()} />
  //     <View style={styles.container}>
  //       <Text style={[STYLES.header, { paddingBottom: 30 }]}>
  //         Enter new email
  //       </Text>
  //       <InputField
  //         onChangeText={setNewEmail}
  //         placeholder="New Email"
  //         keyboardType="email-address"
  //         autoCapitalize="none"
  //         value={newEmail}
  //       />
  //       <InputField
  //         onChangeText={setPassword}
  //         placeholder="Confirm password to change email"
  //         isPasswordField={true}
  //         secureTextEntry={!isPasswordVisible}
  //         toggleVisibility={() => setIsPasswordVisible(!isPasswordVisible)}
  //       />
  //     </View>
  //     <View style={styles.buttonContainer}>
  //       <ButtonCustom
  //         text="Change Email"
  //         handlePress={handleChangeEmail}
  //         color={COLORS.white}
  //         backgroundColor={COLORS.logo}
  //       />
  //     </View>
  //   </View>
  // );
};

export default ChangeEmail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: "center",
  },
  buttonContainer: {
    padding: 30,
  },
});
