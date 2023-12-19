import { StyleSheet, View, TouchableOpacity, Text, } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import React from "react";
import { COLORS } from "../theme/style";


const HeaderLeft = ({ icon, name, handlePress }) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.headerButton} onPress={handlePress}>
        <Icon name={icon} size={27} style={styles.icon} />
        <Text style={styles.title}>{name}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HeaderLeft;

const styles = StyleSheet.create({
  headerContainer: {
    paddingVertical: 12,
    backgroundColor: COLORS.lightBlack,
  },
  headerButton: {
    width: "auto",
    alignItems: "center",
    flexDirection: "row",
  },
  icon: {
    color: COLORS.white,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.white,
  },
});
