import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useFriend } from "../context/FriendContext";
import { COLORS } from "../theme/style";
import Icon from "react-native-vector-icons/Ionicons";

export default function FriendCard({friend}) {
    const { deleteFriendOrRequest } = useFriend();

    const deleteFriendByID = (friendID) => {
      deleteFriendOrRequest(friendID)
    }
  return (
    <View  key={friend.id} style={styles.friend}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={styles.friendOutline}>
          <Image
            source={{ uri: friend.friend.avatar }}
            style={styles.friendAvt}
          />
        </View>
        <Text style={styles.friendName}>{friend.friend.name}</Text>
      </View>
      <TouchableOpacity style={styles.deleteIcon} onPress={() => deleteFriendByID(friend.id)}>
        <Icon name="close" size={20} color={COLORS.white} />
      </TouchableOpacity>
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
