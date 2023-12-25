import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
// import { firebase } from "../config";
import { useAuth } from "../context/AuthContext";
import { COLORS } from "../theme/style";
import InputField from "../components/InputField";
import ButtonCustom from "../components/Button";
import Loading from "../components/Loading";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useAuth();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <>
      <StatusBar></StatusBar>
      <View style={styles.container}>
        <View style={styles.pageStyle}>
          <View style={styles.main}>
            <Image
              source={require("../assets/logo.png")}
              style={styles.imgStyle}
            />
            <Text style={styles.titleName}>Login</Text>
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
              toggleVisibility={() => setIsPasswordVisible(!isPasswordVisible)}
            />
          </View>

          <ButtonCustom
            text={"Login"}
            color={COLORS.white}
            backgroundColor={COLORS.logo}
            handlePress={() => login(email, password)}
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
              Don't have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text
                style={{ color: COLORS.logo, fontWeight: "bold", fontSize: 16 }}
              >
                Register Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Loading visible={isLoading} />
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
  titleName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
  imgStyle: {
    width: 200,
    height: 200,
    borderRadius: 20,
    marginBottom: 10,
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

export default LoginScreen;
