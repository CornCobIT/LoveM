import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import { Camera } from "expo-camera";
import * as Contacts from "expo-contacts";

import Loading from "./components/Loading";
import MainNavigator from "./navigation/MainNavigator";
import { AuthProvider } from "./context/AuthContext";

const fetchFonts = {
  Playfair: require("./assets/fonts/PlayfairDisplay.ttf"),
  Sacramento: require("./assets/fonts/Sacramento.ttf"),
};

const App = () => {
  const [isLoaded] = useFonts(fetchFonts);

  useEffect(() => {
    getPermissions();
  }, []);

  async function getPermissions() {
    const { status: cameraStatus } =
      await Camera.requestCameraPermissionsAsync();
    const { status: contactsStatus } = await Contacts.requestPermissionsAsync();
    if (cameraStatus !== "granted" || contactsStatus !== "granted") {
      alert(`We're very sorry 🥲`);
    }
  }

  if (!isLoaded) {
    return <Loading visible={true} />;
  } else {
    return (
      <AuthProvider>
        <MainNavigator />
      </AuthProvider>
    );
  }
};

export default App;
