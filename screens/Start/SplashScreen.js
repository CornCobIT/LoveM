import React, { useCallback, useEffect, useState, useRef } from "react";
import {
  View,
  Animated,
  StyleSheet,
  Dimensions,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { COLORS, STYLES } from "../../theme/style";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const { width } = Dimensions.get("window");

export default function Splash({ navigation }) {
  const [appIsReady, setAppIsReady] = useState(false);
  const logoAnim = useRef(new Animated.Value(0)).current;
  const textAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(Entypo.font);
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (appIsReady) {
      Animated.sequence([
        Animated.timing(logoAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(textAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]).start(() => navigation.navigate("IntroSlide"));
    }
  }, [appIsReady]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: COLORS.lightBlack,
      }}
      onLayout={onLayoutRootView}
    >
      <Animated.Image
        source={require("../../assets/logo.png")}
        style={[
          styles.logo,
          {
            transform: [
              {
                translateX: logoAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [width, 0], // Logo will move from right to left
                }),
              },
            ],
          },
        ]}
      />
      <Animated.Text
        style={[
          STYLES.header,
          {
            opacity: textAnim,
            paddingLeft: 10,
          },
        ]}
      >
        Love me & Love you
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  logo: {
    width: 100,
    height: 100,
  },
  text: {
    fontSize: 24,
    marginLeft: 15,
  },
});
