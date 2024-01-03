import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Share,
  StyleSheet,
  Image,
  Alert,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { storage } from "../../config";
import { useNavigation } from "@react-navigation/native";
import { COLORS, STYLES } from "../../theme/style";
import * as MediaLibrary from "expo-media-library";
import Swiper from "react-native-swiper";
import { useAuth } from "../../context/AuthContext";
import { useFriend } from "../../context/FriendContext";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

export default function DisplayScreen() {
  const navigation = useNavigation();
  const [imageUrl, setImageUrl] = useState([]);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [showFriendList, setShowFriendList] = useState(false);
  const user = useAuth();
  const { getFriendList } = useFriend();
  const [friendList, setFriendList] = useState([]);

  const toggleFriendList = () => {
    setShowFriendList(!showFriendList);
  };

  if (imageUrl === 0) {
    return (
      <View
        style={[STYLES.container, { padding: 30, justifyContent: "center" }]}
      >
        <View style={{ marginTop: 30 }}>
          <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
            <Icon name="caret-up" size={40} color={"white"} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: "center",
            flex: 1,
            flexDirection: "column",
            padding: 30,
            marginTop: 100,
          }}
        >
          <Icon
            name="images"
            size={100}
            color={"white"}
            style={{ marginBottom: 10 }}
          />
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 27,
              color: "white",
              marginBottom: 10,
              justifyContent: "center",
            }}
          >
            Send your first Locket
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 22,
              color: "gray",
              justifyContent: "center",
            }}
          >
            Your picture will appear on your friends' home screens
          </Text>
        </View>
      </View>
    );
  }

  const onActionButtonPress = () => {
    Alert.alert(
      "Action",
      "Choose an action for the photo:",
      [
        { text: "Delete Photo", onPress: onDeletePhoto },
        { text: "Download Photo", onPress: onDownloadPhoto },
        { text: "Cancel", style: "cancel" },
      ],
      { direction: "down" }
    );
  };

  const onDeletePhoto = () => {
    // Perform the delete action here
    Alert.alert(
      "Delete Photo",
      "Are you sure you want to delete this photo?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => deletePhoto() },
      ],
      { justifyContent: "center" }
    );
  };

  const deletePhoto = () => {
    const storageRef = storage.ref();
    const imagesRef = storageRef.ref(storageRef.fullPath);

    imagesRef
      .delete()
      .then(() => {
        console.log("Delete Photo Successfully!");
      })
      .catch((e) => {
        console.log("Error white deleting photo.", e);
      });
  };

  const onDownloadPhoto = () => {
    Alert.alert("Download Photo", "Do you want to download this photo?", [
      { text: "Cancel", style: "cancel" },
      { text: "Download", onPress: () => downloadPhoto() },
    ]);
  };

  const downloadPhoto = async () => {
    if (!hasGalleryPermission) {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setHasGalleryPermission(status === "granted");

      if (status !== "granted") {
        alert(`We're very sorry 🥲`);
        return;
      }
    }

    try {
      await MediaLibrary.createAssetAsync(item.url);
      alert("Downloaded successfully! 🎉");
    } catch (e) {
      console.log(e);
    }
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "Want to share this image?",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  // useEffect(() => {
  //     // Retrieve image URLs from Firebase Storage
  //     const fetchImageUrls = async () => {
  //         const storageRef = storage.ref();
  //         const imagesRef = storageRef.child('images');

  //         const imageList = await imagesRef.listAll();
  //         const urls = await Promise.all(
  //             imageList.items.map(async (item) => {
  //                 const url = await item.getDownloadURL();
  //                 const metadata = await item.getMetadata();
  //                 const caption = metadata.customMetadata.caption;
  //                 const name = metadata.customMetadata.userName;
  //                 const id = metadata.customMetadata.userId;

  //                 return { url, caption, name, id };
  //             })
  //         );
  //         setImageUrl(urls);
  //     };

  //     fetchImageUrls();
  // }, [user.uid]);

  useEffect(() => {
    const fetchFriendList = async () => {
      try {
        const friends = await getFriendList();
        setFriendList(friends);
      } catch (error) {
        console.error("Error fetching friend list:", error);
      }
    };
    fetchFriendList();
  }, [getFriendList]);

  useEffect(() => {
    const fetchImageUrls = async () => {
      if (friendList.length > 0) {
        const storageRef = storage.ref();
        const imagesRef = storageRef.child("images");
    
        const imageList = await imagesRef.listAll();
        const urls = await Promise.all(
          imageList.items.map(async (item, index) => {
            const url = await item.getDownloadURL();
            const metadata = await item.getMetadata();
            const caption = metadata.customMetadata.caption;
            const name = metadata.customMetadata.userName;
            const id = metadata.customMetadata.userId;
            const timestamp = metadata.timeCreated;
    
            // Kiểm tra xem ảnh thuộc về người dùng hiện tại hoặc bạn bè của họ không
            if (id === user.uid || friendList.includes(id)) {
              return {
                url,
                caption,
                name,
                id,
                timestamp,
                key: index.toString(),
              };
            }
            return null;
          })
        );
    
        // Loại bỏ các phần tử null (ảnh không thuộc về người dùng hiện tại hoặc bạn bè của họ)
        const filteredUrls = urls.filter((item) => item !== null);
    
        // Sắp xếp mảng URL theo thời gian tạo giảm dần
        const sortedUrls = filteredUrls.sort(
          (a, b) => b.timestamp - a.timestamp
        );
    
        setImageUrl(sortedUrls);
      }
    };
    
    fetchImageUrls();
  }, [user.uid, friendList]);

  const reverseUrl = imageUrl.reverse();

  const renderItem = (item, index, key) => {
    if (!item.caption) {
      return (
        <View
          key={key}
          style={{ width: screenWidth, height: screenHeight, marginTop: 80 }}
        >
          <View style={styles.postContainer}>
            <Image source={{ uri: item.url }} style={styles.image} />
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.caption}>{item.name}</Text>
          </View>
        </View>
      );
    }
    return (
      <View
        key={key}
        style={{ width: screenWidth, height: screenHeight, marginTop: 80 }}
      >
        <View style={styles.postContainer}>
          <Image source={{ uri: item.url }} style={styles.image} />
          <View style={styles.captionContainer}>
            <Text style={styles.caption}>{item.caption}</Text>
          </View>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.caption}>{item.name}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[STYLES.container, { flex: 1 }]}>
      <View style={[styles.header, { marginTop: 30, alignItems: "center" }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="caret-up" size={40} color={"white"} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={toggleFriendList}
          style={styles.toggleButton}
        >
          <Text style={STYLES.title}>Friends</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onActionButtonPress}>
          <Icon name="ellipsis-vertical-circle" size={40} color={"white"} />
        </TouchableOpacity>
      </View>

      <Swiper showsPagination={false} loop={false} horizontal={false}>
        {reverseUrl.map((item, index) =>
          renderItem(item, index, index.toString())
        )}
      </Swiper>

      <View style={styles.interaction}>
        <TouchableOpacity onPress={() => navigation.navigate("ImageList")}>
          <Icon name="images" size={27} color={COLORS.white} />
        </TouchableOpacity>

        <View style={styles.feeling}>
          <TouchableOpacity>
            <Icon name="chatbubble-outline" size={27} color={COLORS.white} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="heart" size={27} color={"#FF0000"} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="flame" size={27} color={"#FF8C00"} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="happy" size={27} color={"#FFD700"} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={onShare}>
          <Icon name="share-social-outline" size={27} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  interaction: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
    marginBottom: 30,
  },
  feeling: {
    flexDirection: "row",
  },
  toggleButton: {
    backgroundColor: COLORS.darkGray,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 380,
    width: screenWidth,
    borderRadius: 30,
    margin: 10,
  },
  postContainer: {
    alignItems: "center",
    position: "relative",
  },
  captionContainer: {
    position: "absolute",
    bottom: 20,
    backgroundColor: "rgba(20, 20, 20, 0.5)",
    marginTop: 10,
    borderRadius: 20,
  },
  caption: {
    padding: 10,
    fontSize: 20,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  feeling: {
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: COLORS.gray,
    borderRadius: 50,
    padding: 5,
    width: 200,
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
});
