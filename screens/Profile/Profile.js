import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { ActionSheetProvider } from '@expo/react-native-action-sheet'; 
import { useNavigation } from "@react-navigation/native";

import ProfileHeader from "./components/ProfileHeader";
import Setting from "./components/Setting";
import SECTIONS from "./components/dataSetting";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const handleLogout = async () => {
    try {
      navigation.navigate("AuthScreen");
      logout();
    } catch (error) {
      console.log("Error logging out: ", error);
    }
  };
  
  return (
    <ActionSheetProvider>
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ProfileHeader navigation={navigation} />
        {SECTIONS.map(({ header, items }, index) => (
          <Setting key={index.toString()} header={header} items={items} navigation={handleLogout}/>
        ))}
      </ScrollView>
    </View>
    </ActionSheetProvider>
  );
}

const styles = StyleSheet.create({
  container: { 
    backgroundColor: "#f6f6f6", 
    flex: 1,  
  },
  scrollContainer: {
    paddingBottom: 24,
  },
});
