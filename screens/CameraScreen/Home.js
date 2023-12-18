import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { Camera, CameraType } from "expo-camera";
import { firebase } from "../../config";
import * as MediaLibrary from "expo-media-library";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

import { COLORS, STYLES } from "../../theme/style";

export default function HomeScreen() {
  const navigation = useNavigation();

  const [isLoading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [showFriendList, setShowFriendList] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [ratio, setRatio] = useState("1:1");
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === "granted");
    })();
  }, []);

  const toggleFriendList = () => {
    setShowFriendList(!showFriendList);
    // Ví dụ: gọi hàm để lấy danh sách bạn bè từ API hoặc hiển thị một Modal chứa danh sách bạn bè
  };

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri);
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const savePicture = async () => {
    if (!hasGalleryPermission) {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setHasGalleryPermission(status === "granted");

      if (status !== "granted") {
        alert(`We're very sorry 🥲`);
        return;
      }
    }

    try {
      await MediaLibrary.createAssetAsync(image);
      alert("Picture saved! 🎉");
    } catch (e) {
      console.log(e);
    }
  };

  const sendPicture = async () => {
    setUploading(true);
    if (!image) {
      alert("No image available!");
    } else {
      setLoading(true);
      try {
        const filename = `image-${Date.now()}`;
  
        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = () => {
            resolve(xhr.response);
          };
          xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError("Network request failed"));
          };
          xhr.responseType = "blob";
          xhr.open("GET", image, true);
          xhr.send(null);
        });
  
        const ref = firebase
          .storage()
          .ref()
          .child(`images/` + filename);
        await ref.put(blob);
  
        setUploading(false);
        Alert.alert("Image uploaded successfully! 🎉");
        setImage(null);
      } catch (e) {
        console.log(`Error upload image: ${e}`);
        alert("Failed to upload image!");
        setUploading(false);
      } finally {
        setLoading(false);
      }
    }
  };
  

  const flipCamera = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  if (hasCameraPermission === false || hasCameraPermission === '') {
    return (
      <View style={STYLES.center}>
        <Text style={STYLES.title}>No access to camera 🥲</Text>;
      </View>
    );
  }

  return (
    <>
      <StatusBar></StatusBar>
      <View style={[STYLES.container, { backgroundColor: COLORS.darkGray }]}>
        <View style={{ alignItems: "center", marginTop: 30 }}>
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <Icon style={styles.icon} name="people" size={27} />
            </View>

            <TouchableOpacity
              onPress={toggleFriendList}
              style={styles.toggleButton}
            >
              <Text style={styles.buttonText}>Friends</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate("ProfileScreen")} >
              <Icon
                style={styles.icon}
                name="person-circle-outline"
                size={30}
              />
            </TouchableOpacity>
          </View>
          {showFriendList && (
            <View style={styles.friendListContainer}>
              {/* Đây là nơi bạn sẽ hiển thị danh sách bạn bè */}
              <Text>List of Friends</Text>
              {/* ... */}
            </View>
          )}

          {!image ? (
            // Chụp hình
            <View style={styles.cameraFrame}>
              <Camera
                style={styles.cameraImage}
                type={type}
                flashMode={flash}
                ref={cameraRef}
                ratio={ratio}
              />
            </View>
          ) : isLoading ? (
            <ActivityIndicator size="large" color={COLORS.logo} />
          ) : (
            // Hiển thị hình
            <Image
              source={{ uri: image }}
              style={[
                styles.cameraFrame,
                type === Camera.Constants.Type.front && {
                  transform: [{ scaleX: -1 }],
                },
              ]}
            />
          )}

          {!image ? (
            // Chụp hình
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => {
                  setFlash(
                    flash === Camera.Constants.FlashMode.off
                      ? Camera.Constants.FlashMode.on
                      : Camera.Constants.FlashMode.off
                  );
                }}
              >
                <Icon
                  style={styles.icon}
                  name={
                    flash === Camera.Constants.FlashMode.off
                      ? "flash-outline"
                      : "flash"
                  }
                  size={40}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={takePicture}>
                <View style={styles.circleButton}>
                  <View style={styles.circle} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton} onPress={flipCamera}>
                <Icon
                  style={styles.icon}
                  name="camera-reverse-outline"
                  size={40}
                />
              </TouchableOpacity>
            </View>
          ) : (
            // Xem hình
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => setImage(null)}
              >
                <Icon style={styles.icon} name="close-outline" size={40} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => sendPicture()}>
                <View style={styles.circleButton}>
                  <Icon
                    style={styles.icon}
                    name="paper-plane-outline"
                    size={40}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton} onPress={savePicture}>
                <Icon style={styles.icon} name="download-outline" size={40} />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("ImageList")}>
            <Icon style={styles.icon} name="caret-down" size={40} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: "100%",
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 25,
    backgroundColor: "#A2A0A0",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    color: "white",
  },
  toggleButton: {
    backgroundColor: "#2E2E2E",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  friendListContainer: {
    backgroundColor: "lightgrey",
    padding: 20,
    marginTop: 10,
  },
  cameraFrame: {
    width: 350,
    height: 350,
    borderWidth: 2,
    borderColor: "white",
    marginTop: 20,
    borderRadius: 40,
  },
  cameraImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    position: "absolute",
    borderRadius: 40,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 40,
    width: "100%",
  },
  iconButton: {
    marginHorizontal: 50,
  },
  circleButton: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderColor: "#83951C",
    borderWidth: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    backgroundColor: "#fff",
    width: 85,
    height: 85,
    borderRadius: 100,
  },
});
