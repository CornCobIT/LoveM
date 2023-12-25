import React, { useCallback } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../../../config";
import { useAuth } from "../../../context/AuthContext";
import { COLORS } from "../../../theme/style";


const iconColor = (icon) => {
  if (icon === "trash") {
    return COLORS.red;
  } else {
    return COLORS.white;
  }
};

const Setting = ({ header, items }) => {
  const navigation = useNavigation();
  const { updateUser, logout } = useAuth();
  
  const handlePress = useCallback((id) => {
    if (id === "widget") {
      navigation.navigate("Intro");
    } else if (id === "changeEmail"){
      navigation.navigate("ChangeEmail")
    } else if (id === "logout") {
      Alert.alert(
        "Confirmation",
        "Are you sure you want to log out?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Log Out",
            onPress: handleLogout,
            style: "destructive",
          },
        ],
        { cancelable: false }
      );
    } else if (id === "delete") {
      handleDeleteAccount();
    }
  }, []);

  const handleLogout = async () => {
    try {
      logout();
      updateUser(null); 
      navigation.navigate("Auth");
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      // Hiển thị thông báo xác nhận xóa tài khoản
      Alert.alert(
        "Confirmation",
        "Are you sure you want to delete your account?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Delete",
            onPress: async () => {
              // Thực hiện xóa tài khoản từ Firebase
              const user = firebase.auth().currentUser;
              if (user) {
                deleteUser(user)
                  .then(() => {
                    console.log("User deleted successfully!");
                    updateUserProfile(null);
                  })
                  .catch((error) => {
                    console.error("Error deleting user: ", error);
                  });
              }
            },
            style: "destructive",
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error("Error deleting account: ", error);
    }
  };

  return (
    <View style={styles.section} key={header[0].id}>
      <View style={styles.sectionHeader}>
        <Icon name={header[0].iconName} size={22} style={styles.sectionIcon} />
        <Text style={styles.sectionHeaderText}>{header[0].label}</Text>
      </View>
      <View style={styles.sectionBody}>
        {items.map(({ id, label, icon, type, value }, index) => {
          return (
            <View
              key={id}
              style={[styles.rowWrapper, index === 0 && { borderTopWidth: 0 }]}
            >
              <TouchableOpacity onPress={() => handlePress(id)}>
                <View style={styles.row}>
                  <Icon
                    color={iconColor(icon)}
                    name={icon}
                    style={styles.rowIcon}
                    size={22}
                  />

                  <Text style={styles.rowLabel}>{label}</Text>

                  <View style={styles.rowSpacer} />

                  {(type === "select" || type === "link") && (
                    <Icon color="#ababab" name="chevron-forward" size={22} />
                  )}
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default Setting;

const styles = {
  section: {
    backgroundColor: COLORS.lightBlack,
  },
  sectionHeader: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.white,
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  sectionBody: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.white,
  },
  sectionIcon: { paddingRight: 15, color: COLORS.white },
  header: {
    paddingLeft: 24,
    paddingRight: 24,
    marginBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1d1d1d",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#929292",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingRight: 24,
    height: 50,
  },
  rowWrapper: {
    paddingLeft: 24,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#e3e3e3",
    backgroundColor: COLORS.darkGray,
  },
  rowIcon: {
    marginRight: 12,
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: "500",
    color: COLORS.white,
  },
  rowValue: {
    fontSize: 17,
    color: "#616161",
    marginRight: 4,
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
};
