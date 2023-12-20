import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Image,
  StatusBar,
  Alert,
  Modal,
} from "react-native";
import { firebase } from "../config";
import ButtonCustom from "../components/Button";
import InputField from "../components/InputField";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../theme/style";
import Loading from "../components/Loading";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getDownloadURL = async () => {
    try {
      const imageURL = await firebase.storage().ref('avt.jpg').getDownloadURL();
      console.log("Image URL:", imageURL);
      return imageURL;
    } catch (error) {
      console.log("Error getting image URL:", error);
      return null;
    }
  };

  const registerUser = async (email, password, firstName, lastName) => {
    const defaultAvatar = await getDownloadURL();
    try {
      setIsLoading(true);
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      await firebase.auth().currentUser.sendEmailVerification({
        handleCodeInApp: true,
        url: "https://lovem-c1e24.firebaseapp.com",
      });
      await firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .set({
          firstName,
          lastName,
          email,
          avatar: defaultAvatar,
        });
      Alert.alert("Register successfully! 🎉", "Verification email sent");
      navigation.navigate('Login');
    } catch (error) {
      console.log("Register failed: " + error);
      if (error.code === "auth/invalid-email") {
        alert("The email address is not valid.");
      } else if (error.code === "auth/weak-password") {
        alert("The password must be 6 characters long or more.");
      } else if (error.code === "auth/email-already-in-use") {
        alert("The email address is already in use by another account.");
      } else {
        alert("Register failed! 🥲");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const validateInputs = () => {
    if (!firstName || !lastName || !email || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return false;
    }
    return true;
  };

  const handleRegister = () => {
    if (validateInputs()) {
      registerUser(email, password, firstName, lastName);
    }
  };

  return (
    <>
      <StatusBar></StatusBar>
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.pageStyle}>
            <View style={styles.main}>
              <Image
                source={require("../assets/logo.png")}
                style={styles.imgStyle}
              />
              <Text style={styles.titleName}>Create an account</Text>
              <InputField
                icon={"person-outline"}
                placeholder={"First name"}
                onChangeText={(firstName) => setFirstName(firstName)}
              />
              <InputField
                icon={"person"}
                placeholder={"Last name"}
                onChangeText={(lastName) => setLastName(lastName)}
              />
              <InputField
                icon={"mail"}
                placeholder={"Email"}
                onChangeText={(email) => setEmail(email)}
              />
              <InputField
                icon={"lock-closed"}
                placeholder={"Password"}
                onChangeText={(password) => setPassword(password)}
                secureTextEntry={true}
              />
            </View>
            <ButtonCustom
              text={"Register"}
              color={COLORS.white}
              backgroundColor={COLORS.logo}
              handlePress={handleRegister}
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 20,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  color: COLORS.white,
                }}
              >
                Do you have an account?{" "}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text
                  style={{
                    color: COLORS.logo,
                    fontWeight: "bold",
                    fontSize: 16,
                  }}
                >
                  Login
                </Text>
              </TouchableOpacity>
            </View>
            <Loading visible={isLoading} />
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.lightBlack,
  },
  scrollContainer: {
    flex: 1,
  },
  titleName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
  imgStyle: {
    width: 100,
    height: 100,
    borderRadius: 20,
    marginBottom: 10,
    marginTop: 30,
  },
  textInput: {
    width: 300,
  },
  iconStyle: {
    marginLeft: 10,
    marginRight: 10,
  },
  sectionStyle: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    borderWidth: 0.5,
    height: 50,
    marginTop: 10,
    borderRadius: 10,
  },
  pageStyle: {
    flexDirection: "column",
    margin: 10,
  },
  main: {
    justifyContent: "center",
    alignItems: "center",
  },
  formatButton: {
    alignItems: "center",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    margin: 10,
    width: 320,
    height: 50,
    backgroundColor: COLORS.logo,
  },
  textButton: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  textCheckBox: {
    margin: 10,
    color: "white",
  },
});

export default RegisterScreen;
