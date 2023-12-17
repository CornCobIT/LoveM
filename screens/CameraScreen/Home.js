import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

import { STYLES } from "../../theme/style";
import ButtonCustom from "../../components/Button";

export default function HomeScreen({ navigation }) {
  return (
    <View
      style={[
        STYLES.container,
        { justifyContent: "center", alignItems: "center" },
      ]}
    >
      <Text style={STYLES.title}>Home</Text>
      <ButtonCustom
        text="Come back intro"
        handlePress={() => navigation.navigate("IntroSlide")}
      />
      <ButtonCustom
        text="Go to Profile"
        handlePress={() => navigation.navigate("ProfileScreen")}
      />
    </View>
  );
}
