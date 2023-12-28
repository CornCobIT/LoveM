import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import HeaderLeft from "../../components/HeaderLeft";
import { COLORS, STYLES } from "../../theme/style";
import Icon from "react-native-vector-icons/Ionicons";
import { useFriend } from "../../context/FriendContext";
import AddCard from "../../components/AddCard";
import { useAuth } from "../../context/AuthContext";
import RequestCard from "../../components/RequestCard";
import FriendCard from "../../components/FriendCard";

export default function FriendList({ navigation }) {
  const { searchUsers, getFriendList, getSentFriendRequests } = useFriend();
  const { user } = useAuth();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [friendList, setFriendList] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchKeyword !== "") {
        const results = await searchUsers(searchKeyword);
        setSearchResults(results); // Update search results
      } else {
        setSearchResults([]); // Clear search results if searchKeyword is empty
      }
    };
    fetchSearchResults();
  }, [searchKeyword, searchUsers, user]);

  useEffect(() => {
    const fetchFriendList = async () => {
      try {
        const friends = await getFriendList();
        setFriendList(friends);
      } catch (error) {
        console.error("Error fetching friend list:", error);
      }
    };

    const fetchSentRequests = async () => {
      try {
        const sentRequests = await getSentFriendRequests();
        setFriendRequests(sentRequests);
      } catch (error) {
        console.error("Error fetching sent friend requests:", error);
      }
    };

    fetchFriendList();
    fetchSentRequests();
  }, [getFriendList, getSentFriendRequests]);

  const handleSearch = async (query) => {
    setSearchKeyword(query);
    if (query !== "") {
      try {
        const results = await searchUsers(query);
        setSearchResults(results);
      } catch (error) {
        console.error("Error searching users:", error);
      }
    } else {
      setSearchResults([]);
    }
  };

  return (
    <ScrollView style={[STYLES.container, styles.container]}>
      <HeaderLeft
        icon={"arrow-back"}
        name={"Friend List"}
        handlePress={() => navigation.navigate("Home")}
      />
      <View style={[STYLES.center, styles.headingContainer]}>
        <Text style={STYLES.header}>Your Friends</Text>
        <Text style={[STYLES.title, { paddingVertical: 5 }]}>
          {`${friendList.length} out of 20 friends added`}
        </Text>
        <View style={styles.searchContainer}>
          <View style={[styles.inputSection, styles.inputSectionBlurred]}>
            <View style={styles.borderText}>
              <Icon
                name="search"
                style={styles.iconBlurred}
                size={20}
                color={COLORS.gray}
              />
              <TextInput
                placeholder="Add a new friend"
                clearButtonMode="always"
                placeholderTextColor={COLORS.gray}
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
                onChangeText={(text) => handleSearch(text)}
                value={searchKeyword}
              />
              {searchKeyword !== "" ? (
                <TouchableOpacity onPress={() => handleSearch("")}>
                  <Icon
                    name="close"
                    size={20}
                    color={COLORS.gray}
                    style={styles.iconBlurred}
                  />
                </TouchableOpacity>
              ) : (
                <View />
              )}
            </View>
          </View>
        </View>
      </View>
      {/* Hiển thị kết quả tìm kiếm */}
      {searchKeyword !== "" && (
        <View style={styles.friendContainer}>
          <Text style={styles.sectionHeaderText}>Search Results:</Text>
          {searchResults.length > 0 ? (
            searchResults.map((friend) => (
              <AddCard key={friend.id} friend={friend} />
            ))
          ) : (
            <Text style={styles.sectionHeaderText}>No results</Text>
          )}
        </View>
      )}

      <View style={styles.searchContainer}>
        <View style={styles.sectionHeader}>
          <Icon
            name="people"
            color={COLORS.white}
            size={20}
            style={{ paddingRight: 5 }}
          />
          <Text style={styles.sectionHeaderText}>Your friends</Text>
        </View>
        {/* Hiển thị danh sách bạn bè */}
        <View style={styles.section}>
          {friendList.length > 0 ? (
            <View>
              {friendList.map((friend) => (
                <FriendCard friend={friend} key={friend.id} />
              ))}
            </View>
          ) : (
            <View style={{ paddingHorizontal: 30, paddingTop: 10 }}>
              <Text style={styles.sectionHeaderText}>{"No friends 🥲"}</Text>
            </View>
          )}
          {/* Hiển thị danh sách yêu cầu kết bạn */}
          {friendRequests.length > 0 && (
            <View>
              {friendRequests.map((friend) => (
                <RequestCard key={friend.id} friend={friend} />
              ))}
            </View>
          )}
        </View>
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
  inputSection: {
    marginBottom: 20,
    borderWidth: 1.5,
    borderRadius: 20,
    flexDirection: "row",
    backgroundColor: COLORS.white,
  },
  inputSectionBlurred: {
    borderColor: COLORS.gray,
    color: COLORS.gray,
  },
  iconBlurred: {
    marginRight: 15,
  },
  borderText: {
    flexDirection: "row",
    width: "100%",
    height: 57,
    borderRadius: 40,
    alignItems: "center",
    paddingLeft: 20,
  },
  input: {
    flex: 1,
    fontSize: 16,
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
    flexDirection: "row",
    alignItems: "center",
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.white,
    textTransform: "uppercase",
    letterSpacing: 1.2,
    paddingBottom: 8,
  },
  sectionIcon: { paddingRight: 15, color: COLORS.white },
  friend: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  friendContainer: {
    paddingHorizontal: 20,
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
    height: 40,
    width: 40,
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
