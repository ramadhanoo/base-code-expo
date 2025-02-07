import React from "react";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useLogin } from "./useLogin";
import Animated from "react-native-reanimated";
import { useTheme } from "@react-navigation/native";
import { BaseScreen, Card, CustomText } from "@/src/components";
import { TypeFonts } from "@/src/types/common";

const Login = () => {
  const { action, state } = useLogin();
  const theme = useTheme();

  return (
    <BaseScreen style={styles.container}>
      <SafeAreaView />
      <Text>Login Screen</Text>
      <TouchableOpacity style={styles.button} onPress={() => action.onLogin()}>
        <Text>Login</Text>
      </TouchableOpacity>
      <Text style={{ color: theme.colors.text }}>saha</Text>
      <Animated.View style={[styles.box, action.styleChart]} />
      <Button
        title="toggle"
        onPress={() => {
          state.randomWidth.value = Math.random() * 350;
        }}
      />
      <Card
        orientation="horizontal"
        onPress={() => {
          console.log("asuueee");
        }}
      >
        <CustomText size={30} type={TypeFonts.BOLD}>
          Assueee
        </CustomText>
        <Text>Assueee</Text>
      </Card>
    </BaseScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    width: 100,
    height: 80,
    backgroundColor: "black",
    margin: 30,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Login;
