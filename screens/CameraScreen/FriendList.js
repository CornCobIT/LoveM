import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import HeaderLeft from "../../components/HeaderLeft";
import { COLORS, STYLES } from "../../theme/style";
import Icon from "react-native-vector-icons/Ionicons";
import InputField from "../../components/InputField";

export default function FriendList({ navigation }) {
  return (
    <ScrollView style={[STYLES.container, styles.container]}>
      <HeaderLeft
        icon={"arrow-back"}
        name={"Friend List"}
        handlePress={() => navigation.goBack()}
      />
      <View style={[STYLES.center, styles.headingContainer]}>
        <Text style={STYLES.header}>Your Friends</Text>
        <Text style={[STYLES.title, { paddingVertical: 5 }]}>
          $1 out of 20 friends added
        </Text>
        <View style={styles.searchContainer}>
          <InputField icon={"search"} placeholder={"Add a new friend"} />
        </View>
      </View>

      <View style={styles.friendContainer}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon
              name="person-add"
              size={20}
              color={COLORS.white}
              style={styles.sectionIcon}
            />
            <Text style={styles.sectionHeaderText}>
              Find friends from QR code
            </Text>
          </View>
          <View style={styles.sectionBody}>
            <View style={styles.qrCode}>
              <TouchableOpacity style={styles.findOutline}>
                <Image
                  source={require("../../assets/qr-code.png")}
                  style={styles.findLogo}
                />
              </TouchableOpacity>
              <Text style={styles.findName}>Show QR Code</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon
              name="people"
              size={20}
              color={COLORS.white}
              style={styles.sectionIcon}
            />
            <Text style={styles.sectionHeaderText}>Your Friends</Text>
          </View>
          <View style={styles.sectionBody}>
            <View style={styles.friend}>
              <TouchableOpacity style={{flexDirection: "row", alignItems: "center"}} >
                <View style={styles.friendOutline}>
                  <Image
                    source={require("../../assets/qr-code.png")}
                    style={styles.friendAvt}
                  />
                </View>
                <Text style={styles.friendName}>Friend 1</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteIcon} onPress={() => {}}>
                <Icon name="close" size={20} color={COLORS.white} />
              </TouchableOpacity>
            </View>

            <View style={styles.friend}>
              <TouchableOpacity style={{flexDirection: "row", alignItems: "center"}} >
                <View style={styles.friendOutline}>
                  <Image
                    source={require("../../assets/qr-code.png")}
                    style={styles.friendAvt}
                  />
                </View>
                <Text style={styles.friendName}>Friend 1</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteIcon} onPress={() => {}}>
                <Icon name="close" size={20} color={COLORS.white} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Suggestions by phone number */}
        {/* <View style={STYLES.section}>
          <View style={STYLES.sectionHeader}>
            <Image
              source={require('../../assets/icons/star.png')}
              style={[STYLES.sectionIcon, { width: 20, height: 20, marginRight: 12, }]}
            />
            <Text style={STYLES.sectionHeaderText}>Suggestions</Text>
          </View>
          <View style={styles.sectionBody}>
            <View style={styles.friend}>
              <TouchableOpacity style={{flexDirection: "row", alignItems: "center"}} >
                <View style={styles.friendOutline}>
                  <Image
                    source={require("../../assets/qr-code.png")}
                    style={styles.friendAvt}
                  />
                </View>
                <Text style={styles.friendName}>Friend 1</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.addIcon} onPress={() => {}}>
                <Image source={require('../../assets/icons/plus.png')} style={styles.icon} />
                <Text style={styles.iconText}>Add</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View> */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.lightBlack,
  },
  headingContainer: {
    paddingTop: 30,
    paddingBottom: 20,
  },
  searchContainer: {
    paddingHorizontal: 24,
    paddingTop: 10,
  },
  sectionBody: {
    paddingHorizontal: 24,
    padding: 10,
    flexDirection: "column",
  },
  qrCode: {
    backgroundColor: COLORS.darkGray,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    paddingVertical: 10,
  },
  findOutline: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: COLORS.gray,
    borderWidth: 2,
    borderRadius: 9999,
    width: 60,
    height: 60,
  },
  findLogo: {
    width: 50,
    height: 50,
    borderRadius: 9999,
    padding: 10,
  },
  findName: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.white,
  },
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
  sectionIcon: { paddingRight: 15, color: COLORS.white },
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
  deleteIcon: {
    backgroundColor: COLORS.gray,
    borderRadius: 9999,
    height: 35,
    width: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  addIcon: {
    backgroundColor: COLORS.logo,
    borderRadius: 9999,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 12,
  },
  icon: {
    width: 12,
    height: 12,
    marginRight: 8,
  },
  iconText: {
    fontWeight: "bold",
    fontSize: 18,
  }
});
