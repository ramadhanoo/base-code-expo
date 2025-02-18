import React, { useLayoutEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackParamList } from "./types";
import { PATHS } from "../constants/paths";
import AuthStack from "./AuthStack";
import MainStack from "./MainStack";
import { useSelector } from "react-redux";
import { RootState } from "../redux/reducers";
const Stack = createNativeStackNavigator<StackParamList>();

const Routes = () => {
  const userToken = useSelector((state: RootState) => state.auth);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {userToken.userToken ? (
        <Stack.Screen name={PATHS.MAIN_STACK} component={MainStack} />
      ) : (
        <Stack.Screen name={PATHS.AUTH_STACK} component={AuthStack} />
      )}
    </Stack.Navigator>
  );
};

export default Routes;
