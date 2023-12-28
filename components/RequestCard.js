import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useFriend } from '../context/FriendContext';
import { COLORS } from '../theme/style';
import Icon from "react-native-vector-icons/Ionicons";

export default function RequestCard({ friend }) {
  const { acceptFriendRequest, deleteFriendOrRequest } = useFriend();
  const handleAcceptFriendRequest = async (friendshipID) => {
    try {
      await acceptFriendRequest(friendshipID);
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
  };

  const handleDeleteFriendRequest = async (friendshipID) => {
    try {
      await deleteFriendOrRequest(friendshipID);
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
  };

  return (
    <View style={styles.friend}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={styles.friendOutline}>
          <Image source={{ uri: friend.friend.avatar }} style={styles.friendAvt} />
        </View>
        <Text style={styles.friendName}>{friend.friend.name}</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity style={styles.acceptIcon} onPress={() => handleAcceptFriendRequest(friend.id)}>
          <Image source={require('../assets/icons/check.png')} style={styles.icon} />
          <Text style={styles.iconText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteIcon} onPress={() => handleDeleteFriendRequest(friend.id)}>
          <Icon name='close' size={20} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  friend: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  friendOutline: {
    alignItems: 'center',
    justifyContent: 'center',
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
    fontWeight: '600',
    color: COLORS.white,
    paddingLeft: 15,
  },
  acceptIcon: {
    backgroundColor: COLORS.logo,
    borderRadius: 9999,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 12,
    marginRight: 5,
  },
  deleteIcon: {
    backgroundColor: COLORS.gray,
    borderRadius: 9999,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 12,
  },
  icon: {
    width: 12,
    height: 12,
    marginRight: 8,
  },
  iconText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: COLORS.white,
  },
});
