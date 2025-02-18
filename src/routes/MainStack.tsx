import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackParamList } from "./types";
import { PATHS } from "../constants/paths";
import Home from "../screens/home/Home";

const Stack = createNativeStackNavigator<StackParamList>();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={PATHS.HOME} component={Home} />
    </Stack.Navigator>
  );
};

export default MainStack;
