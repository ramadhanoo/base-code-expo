import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackParamList } from "./types";
import { PATHS } from "../constants/paths";
import Login from "../screens/login/Login";

const Stack = createNativeStackNavigator<StackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={PATHS.LOGIN} component={Login} />
    </Stack.Navigator>
  );
};

export default AuthStack;
