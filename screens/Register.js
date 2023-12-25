import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  StatusBar,
  Alert,
} from "react-native";
import ButtonCustom from "../components/Button";
import InputField from "../components/InputField";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../theme/style";
import Loading from "../components/Loading";
import { useAuth } from "../context/AuthContext";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { register, isLoading } = useAuth();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const validateInputs = () => {
    if (!firstName || !lastName || !email || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return false;
    }
    return true;
  };

  const handleRegister = () => {
    if (validateInputs()) {
      register(email, password, firstName, lastName);
      navigation.navigate("Login");
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
                isPasswordField={true}
                secureTextEntry={!isPasswordVisible}
                toggleVisibility={() =>
                  setIsPasswordVisible(!isPasswordVisible)
                }
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
  errorTextStyle: {
    color: "red",
    textAlign: "center",
    fontSize: 14,
  },
});

export default RegisterScreen;
