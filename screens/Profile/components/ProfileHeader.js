import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { auth } from "../../../config";
import Icon from "react-native-vector-icons/Ionicons";
import { useActionSheet } from "@expo/react-native-action-sheet";
import * as ImagePicker from "expo-image-picker";

import { COLORS, STYLES } from "../../../theme/style";
import HeaderLeft from "../../../components/HeaderLeft";
import { useAuth } from "../../../context/AuthContext";

export default function ProfileHeader({ navigation }) {
  const { showActionSheetWithOptions } = useActionSheet();
  const [image, setImage] = useState(null);
  const { user, updateUser, uploadAvatar } = useAuth();
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");

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

  useEffect(() => {
    setFirstName(user?.firstName || '');
    setLastName(user?.lastName || '');
  }, [user]);
  useEffect(() => {
    if (user && user.avatar) {
      setImage(user.avatar);
    }
  }, [user]);


  const updateProfilePicture = async (result) => {
    if (result.canceled) return;
    try {
      const asset = result.assets[0];
      const uri = asset.uri;
      const downloadURL = await uploadAvatar(uri);
      const db = getFirestore();
      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, { photoURL: downloadURL });
      updateUser({
        avatar: downloadURL,
      });
      setImage(downloadURL);
      navigation.navigate('ProfileScreen');
    } catch (error) {
      console.error("Error updating profile picture:", error);
    }
  };
  
  const onAddPress = async () => {
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
        let result;
        switch (buttonIndex) {
          case 0:
            result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [1, 1],
              quality: 1,
            });
            break;
          case 1:
            result = await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [1, 1],
              quality: 1,
            });
            break;
          case 2:
            return;
          default:
            return;
        }
  
        if (!result.canceled) {
          await updateProfilePicture(result);
        }
      }
    );
  };
  //   try {
  //     const uri = selectedImage.assets[0]?.uri;
  //     const response = await fetch(uri);
  //     const blob = await response.blob();

  //     const filename = `avatars/avatar_${user.uid}`;
  //     const ref = firebase.storage().ref().child(filename);
  //     await ref.put(blob);

  //     const downloadURL = await ref.getDownloadURL();

  //     updateUserAvatar({
  //       avatar: downloadURL,
  //       // photoURL: downloadURL,
  //     });

  //     await firebase
  //       .firestore()
  //       .collection("users")
  //       .doc(user.uid)
  //       .update({ photoURL: downloadURL });

  //     showToast("Profile picture updated successfully!");
  //     setImage(downloadURL);
  //   } catch (error) {
  //     console.error("Error updating profile picture:", error);
  //   }
  //   //   await user.updateProfile({
  //   //     photoURL: uri,
  //   //   });
  //   //   setImage(uri);
  //   //   showToast("Profile picture updated successfully!");
  //   //   firebase
  //   //     .firestore()
  //   //     .collection("users")
  //   //     .doc(user.uid)
  //   //     .update({ photoURL: uri });
  //   //   updateUserProfile({ avatar: uri, photoURL: uri });
  //   // } catch (error) {
  //   //   console.log("Error updating profile picture: ", error);
  //   // }
  // };

  // const onAddPress = () => {
  //   const options = ["Choose from Library", "Take a Photo", "Cancel"];
  //   const cancelButtonIndex = 2;

  //   showActionSheetWithOptions(
  //     {
  //       options,
  //       cancelButtonIndex,
  //       title: "Change your avatar",
  //       message: "Select an option to update your profile picture",
  //     },
  //     async (buttonIndex) => {
  //       switch (buttonIndex) {
  //         case 0:
  //           let resultFromLibrary = await ImagePicker.launchImageLibraryAsync({
  //             mediaTypes: ImagePicker.MediaTypeOptions.All,
  //             allowsEditing: true,
  //             aspect: [1, 1],
  //             quality: 1,
  //           });

  //           if (!resultFromLibrary.canceled) {
  //             await updateProfilePicture(resultFromLibrary);
  //           }
  //           break;
  //         case 1:
  //           let resultFromCamera = await ImagePicker.launchCameraAsync({
  //             mediaTypes: ImagePicker.MediaTypeOptions.All,
  //             allowsEditing: true,
  //             aspect: [1, 1],
  //             quality: 1,
  //           });

  //           if (!resultFromCamera.canceled) {
  //             await updateProfilePicture(resultFromCamera);
  //           }
  //           break;
  //         case 2:
  //           break;
  //         default:
  //           break;
  //       }
  //     }
  //   );
  // };

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
      <HeaderLeft
        icon={"arrow-back"}
        name={"Profile"}
        handlePress={() => navigation.navigate("Home")}
      />
      <View style={styles.profile}>
        <View style={styles.profileOutline}>
          <Image
            alt="avatar"
            source={{
              uri: image,
            }}
            style={styles.profileAvatar}
          />
          <View style={styles.iconContainer}>
            <TouchableOpacity style={styles.iconBg} onPress={onAddPress}>
              <Image
                style={styles.buttonIcon}
                source={require("../../../assets/icons/plus.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.profileName}>
          {firstName} {lastName}
        </Text>

        <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
          <View style={styles.profileAction}>
            <Text style={styles.profileActionText}>Edit Profile</Text>
            <Icon color="#fff" name="pencil" size={16} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profile: {
    padding: 20,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e3e3e3",
    backgroundColor: COLORS.lightBlack,
  },
  profileOutline: {
    borderColor: COLORS.darkGray,
    borderWidth: 3,
    borderRadius: 9999,
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
    color: COLORS.white,
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
    backgroundColor: COLORS.darkGray,
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
    backgroundColor: COLORS.lightBlack,
  },
  buttonIcon: {
    height: 12,
    width: 12,
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
