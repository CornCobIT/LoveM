import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { COLORS } from "../theme/style";
import { useFriend } from "../context/FriendContext";
import Icon from "react-native-vector-icons/Ionicons";

export default function AddCard({ friend }) {
  const { sendFriendRequest, deleteFriendOrRequest, checkRequestSent } = useFriend();
  const [requestSent, setRequestSent] = useState(false);

  useEffect(() => {
    const checkAndSetRequestSent = async () => {
      const sent = await checkRequestSent(friend.id);
      setRequestSent(sent);
    };
    checkAndSetRequestSent();
  }, [friend.id]);

  const handleSendFriendRequest = async () => {
    try {
      await sendFriendRequest(friend.id);
      // Ngay sau khi gửi yêu cầu, cập nhật trạng thái requestSent
      setRequestSent(true);
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };

  const handleCancelFriendRequest = async (friendID) => {
    try {
      await deleteFriendOrRequest(friendID);
      // Ngay sau khi hủy yêu cầu, cập nhật trạng thái requestSent
      setRequestSent(false);
    } catch (error) {
      console.error("Error cancelling friend request:", error);
    }
  };


  return (
    <View style={styles.friend}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={styles.friendOutline}>
          <Image
            source={{ uri: friend.avatar }}
            style={styles.friendAvt}
          />
        </View>
        <Text style={styles.friendName}>{friend.name}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {requestSent ? (
          <TouchableOpacity
            style={styles.cancelIcon}
            onPress={() => handleCancelFriendRequest(friend.id)}
          >
            <Icon name="remove-circle" size={20} />
            <Text style={styles.iconText}>Cancel</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.addIcon}
            onPress={() => handleSendFriendRequest()}
          >
            <Image
              source={require("../assets/icons/plus.png")}
              style={styles.icon}
            />
            <Text style={styles.iconText}>Add</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  friend: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  friendOutline: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: COLORS.logo,
    borderWidth: 2,
    borderRadius: 9999,
    width: 60,
    height: 60,
  },
  friendAvt: {
    width: 50,
    height: 50,
    borderRadius: 9999,
    padding: 10,
  },
  friendName: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.white,
    paddingLeft: 15,
  },
  addIcon: {
    backgroundColor: COLORS.logo,
    borderRadius: 9999,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 12,
    marginRight: 5,
  },
  cancelIcon: {
    backgroundColor: COLORS.gray,
    borderRadius: 9999,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 12,
    marginRight: 5,
  },
  icon: {
    width: 12,
    height: 12,
    marginRight: 8,
  },
  iconText: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
