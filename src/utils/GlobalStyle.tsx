import { DefaultTheme, Theme } from "@react-navigation/native";

export const LightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#fff",
    text: "#333333",
    card: "#F0EEED",
  },
};

export const DarkTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#1A1A1D",
    text: "#fff",
    card: "#3D3D3D",
  },
};

export const fontAssets = {
  "Poppins-Black": require("../../assets/fonts/Poppins-Black.ttf"),
  "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
  "Poppins-Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
  "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
  "Poppins-Italic": require("../../assets/fonts/Poppins-Italic.ttf"),
  "Poppins-Light": require("../../assets/fonts/Poppins-Light.ttf"),
  "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
};
