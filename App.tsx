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
import { DarkTheme, fontAssets, LightTheme } from "./src/utils/GlobalStyle";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StackParamList } from "./src/routes";
import Toast from "react-native-toast-message";
import ToastConfig from "./src/config/ToastConfig";

const App = () => {
  const navigationRef =
    createNavigationContainerRef<NavigationContainerRef<StackParamList>>();
  const routeNameRef = useRef<string>();
  const store = getStore();
  const scheme = useColorScheme();
  const [fontsLoaded] = useFonts(fontAssets);

  const handleStateChange = useCallback(() => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;

    if (previousRouteName !== currentRouteName) {
      routeNameRef.current = currentRouteName;
    }
  }, []);

  const startUp = useCallback(async () => {
    await SplashScreen.preventAutoHideAsync();
    if (fontsLoaded) {
      setTimeout(async () => {
        await SplashScreen.hideAsync();
      }, 2000);
    }
  }, [fontsLoaded]);

  useEffect(() => {
    startUp();
  }, [startUp]);

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
        <Boot />
      </NavigationContainer>
      <Toast
        config={ToastConfig}
        position={"bottom"}
        bottomOffset={100}
        visibilityTime={3000}
      />
    </Provider>
  );
};

export default App;
