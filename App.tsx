import {
  NavigationContainer,
  NavigationContainerRef,
  createNavigationContainerRef,
} from "@react-navigation/native";
import React, { useCallback, useEffect, useRef } from "react";
import { Boot } from "./src";
import { Provider } from "react-redux";
import { getStore } from "./src/redux/store";
import { useColorScheme } from "react-native";
import { DarkTheme, LightTheme } from "./src/utils/GlobalStyle";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StackParamList } from "./src/routes";

const App = () => {
  const navigationRef =
    createNavigationContainerRef<NavigationContainerRef<StackParamList>>();
  const routeNameRef = useRef<string>();
  const store = getStore();
  const scheme = useColorScheme();

  // Load Custom Fonts
  const [fontsLoaded] = useFonts({
    "Poppins-Black": require("./assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Italic": require("./assets/fonts/Poppins-Italic.ttf"),
    "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
      if (fontsLoaded) {
        setTimeout(async() => {
          await SplashScreen.hideAsync();
        }, 3000)
    
      }
    }
    prepare();
  }, [fontsLoaded]);

  const handleStateChange = useCallback(() => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;

    if (previousRouteName !== currentRouteName) {
      routeNameRef.current = currentRouteName;
    }
  }, []);

  if (!fontsLoaded) return null;

  return (
    <Provider store={store}>
      <NavigationContainer
        theme={scheme === "dark" ? DarkTheme : LightTheme}
        ref={navigationRef}
        onReady={() => {
          routeNameRef.current = navigationRef.getCurrentRoute()?.name;
        }}
        onStateChange={handleStateChange}
      >
        <StatusBar style="auto" />
        <Boot />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
