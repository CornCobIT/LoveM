import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  Alert,
  FlatList,
  TextInput,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { Camera } from "expo-camera";
import { firebase } from "../../config";
import * as MediaLibrary from "expo-media-library";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";
import { COLORS, STYLES } from "../../theme/style";
import Loading from "../../components/Loading";

export default function HomeScreen() {
  const [friendList, setFriendList] = useState([
    { id: "1", name: "Alice" },
    { id: "2", name: "Bob" },
    { id: "3", name: "Charlie" },
    // Thêm các thông tin bạn bè khác nếu cần
  ]);
  const { user, uploadImage } = useAuth();
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(false);
  const [showFriendList, setShowFriendList] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [ratio, setRatio] = useState("1:1");
  const cameraRef = useRef(null);

  const [cameraKey, setCameraKey] = useState(0);

  const resetCamera = () => {
    setCameraKey((prevKey) => prevKey + 1);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      resetCamera();
    });

    return unsubscribe;
  }, [navigation]);

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

  const sendPicture = async () => {
    if (!image) {
      alert("No image available!");
    } else {
      setLoading(true);
      try {
        await uploadImage(image, caption);
        setImage(null);
        setCaption(null);
      } catch (e) {
        console.log(`Error upload image: ${e}`);
        alert("Failed to upload image!");
      } finally {
        setLoading(false);
      }
    }
  };  

  const takePicture = async () => {
    if (cameraRef && hasCameraPermission) {
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

  const flipCamera = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  if (hasCameraPermission === false || hasCameraPermission === "") {
    return (
      <View style={STYLES.center}>
        <Text style={STYLES.title}>No access to camera 🥲</Text>;
      </View>
    );
  }

  return (
    <>
      <StatusBar></StatusBar>
      <View
        style={[
          STYLES.container,
          { justifyContent: "center", position: "relative" },
        ]}
      >
        <View style={{ alignItems: "center", marginTop: 30 }}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => navigation.navigate("FriendList")}
            >
              <Icon style={styles.icon} name="people" size={27} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={toggleFriendList}
              style={styles.toggleButton}
            >
              <Text style={STYLES.title}>Friends</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => navigation.navigate("ProfileScreen")}
            >
              <Icon
                style={styles.icon}
                name="person-circle-outline"
                size={30}
              />
            </TouchableOpacity>
          </View>
          {showFriendList && (
            <FlatList
              data={friendList}
              renderItem={({ item }) => (
                <View style={styles.friendListContainer}>
                  <Image style={{ height: 30, width: 30, borderRadius: 9999, marginRight: 10,}} source={require('../../assets/qr-code.png')} />
                  <Text style={styles.buttonText}>{item.name}</Text>
                </View>
              )}
              keyExtractor={(item) => item.id}
              style={{
                position: "absolute",
                top: 75,
                zIndex: 1,
                maxHeight: 300,
                width: 220,
                backgroundColor: COLORS.darkGray,
                borderRadius: 10,
                padding: 5,
                elevation: 5,
              }}
            />
          )}

          {!image ? (
            // Chụp hình
            <View style={styles.cameraFrame}>
              <Camera
                key={`Camera-${cameraKey}`}
                style={styles.cameraImage}
                type={type}
                flashMode={flash}
                ref={cameraRef}
                ratio={ratio}
              />
            </View>
          ) : isLoading ? (
            <Loading />
          ) : (
            // Hiển thị hình

            <View style={styles.postContainer}>
              <Image
                source={{ uri: image }}
                style={[
                  styles.postImage,
                  styles.cameraFrame,
                  type === Camera.Constants.Type.front && {
                    transform: [{ scaleX: -1 }],
                  },
                ]}
              />
              <View style={styles.captionContainer}>
                <TextInput
                  style={styles.caption}
                  placeholder="Add a caption"
                  placeholderTextColor={COLORS.white}
                  onChangeText={(text) => {
                    if (text.length <= 27) {
                      setCaption(text);
                    }
                  }}
                  value={caption}
                  maxLength={27}
                />
              </View>
            </View>
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
          <TouchableOpacity onPress={() => navigation.navigate("DisplayScreen")}>
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
    backgroundColor: COLORS.darkGray,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    color: "white",
  },
  toggleButton: {
    backgroundColor: COLORS.darkGray,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  friendListContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  cameraFrame: {
    width: 350,
    height: 350,
    marginTop: 20,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: COLORS.white,
    overflow: "hidden",
    marginTop: 20,
  },
  cameraImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    position: "absolute",
  },
  postContainer: {
    alignItems: "center",
    position: "relative",
  },
  postImage: {
    height: 300,
    width: 300,
    borderRadius: 20,
  },
  captionContainer: {
    position: "absolute",
    bottom: 20,
    backgroundColor: "rgba(128, 128, 128, 0.5)",
    marginTop: 10,
    borderRadius: 20,
  },
  caption: {
    padding: 10,
    fontSize: 20,
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
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
