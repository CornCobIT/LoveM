import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useActionSheet } from "@expo/react-native-action-sheet";
import * as ImagePicker from "expo-image-picker";

import { COLORS, STYLES } from "../../../theme/style";
import HeaderLeft from "../../../components/HeaderLeft";

export default function ProfileHeader({ navigation }) {
  const { showActionSheetWithOptions } = useActionSheet();
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const onAddPress = () => {
    const options = ["Choose from Library", "Take a Photo", "Cancel"];
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        title: "Change your avatar",
        message: "Select an option to update your profile picture",
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            let resultFromLibrary = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.All,
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
            });

            if (!resultFromLibrary.canceled) {
              setImage(resultFromLibrary.assets[0].uri);
            }
            break;
          case 1:
            let resultFromCamera = await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.All,
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
            });

            if (!resultFromCamera.canceled) {
              setImage(resultFromCamera.assets[0].uri);
            }
            break;
          case 2:
            // code to cancel
            break;
          default:
            break;
        }
      }
    );
  };

  return (
    <View style={STYLES.container}>
      <HeaderLeft
        icon={"arrow-back"}
        handlePress={()=> navigation.goBack()}
      />
      <View style={styles.profile}>
        <View style={styles.profileOutline}>
          <Image
            alt="avatar"
            source={{
              uri:
                image ||
                "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80",
            }}
            style={styles.profileAvatar}
          />
          <View style={styles.iconContainer}>
            <TouchableOpacity style={styles.iconBg} onPress={onAddPress}>
              <Icon
                style={styles.buttonIcon}
                name="add"
                size={24}
                color={COLORS.white}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.profileName}>John Doe</Text>

        <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
          <View style={styles.profileAction}>
            <Text style={styles.profileActionText}>Edit Profile</Text>
            <Icon color="#fff" name="pencil" size={16} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profile: {
    padding: 10,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e3e3e3",
  },
  profileOutline: {
    borderColor: COLORS.gray,
    borderWidth: 3,
    borderRadius: 9999,
    marginTop: 30,
  },
  profileAvatar: {
    width: 100,
    height: 100,
    borderRadius: 9999,
    margin: 5,
  },
  profileName: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: "600",
    color: "#090909",
  },
  profileEmail: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: "400",
    color: "#848484",
  },
  profileAction: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007bff",
    borderRadius: 20,
  },
  profileActionText: {
    marginRight: 8,
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },
  iconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    marginRight: 0,
    marginBottom: 0,
    flexDirection: "column",
    borderRadius: 9999,
    height: 37,
    width: 37,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  iconBg: {
    backgroundColor: COLORS.logo,
    borderRadius: 9999,
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    width: 30,
  },
});
