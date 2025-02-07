import { DefaultTheme, Theme } from "@react-navigation/native";

export const LightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#f0f0f0",
    text: "#333333",
    card: "#F5F7F8",
  },
};

export const DarkTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#1A1A1D",
    text: "#fff",
    card: "#3C3D37",
  },
};
