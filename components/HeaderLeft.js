import { StyleSheet, View, TouchableOpacity, Text, } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import React from "react";
import { COLORS } from "../theme/style";


const HeaderLeft = ({ icon, name, handlePress }) => {
  return (
    <View >
      <TouchableOpacity style={styles.headerButton} onPress={handlePress}>
        <Icon name={icon} size={27} style={styles.icon} />
        <Text style={styles.title}>{name}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HeaderLeft;

const styles = StyleSheet.create({
  headerButton: {
    width: "auto",
    alignItems: "center",
    flexDirection: "row",
    paddingBottom: 10,
  },
  icon: {
    color: COLORS.black,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
