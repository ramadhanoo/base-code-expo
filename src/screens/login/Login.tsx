import React from "react";
import {
  ActivityIndicator,
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useLogin } from "./useLogin";
import Animated from "react-native-reanimated";
import { BaseScreen, Box, CustomText } from "@/src/components";
import { TypeFonts } from "@/src/types/common";
import Input from "@/src/components/Input";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "@react-navigation/native";
import { Colors } from "@/src/constants/colors";
import { Controller } from "react-hook-form";

const Login = () => {
  const { action, state, form } = useLogin();
  const { authState, setIsSecure, isSecure } = state;
  const { loading } = authState;
  const theme = useTheme();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <BaseScreen style={styles.container} edges={["top"]}>
      <ScrollView
        bounces={false}
        style={{ flex: 1 }}
        contentContainerStyle={styles.scroll}
      >
        <Box>
          <Controller
            name="username"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                parentStyle={{ marginHorizontal: 20 }}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                iconLeft={
                  <Ionicons
                    name="checkmark-circle"
                    size={32}
                    color={theme.colors.text}
                  />
                }
                placeholder="username"
                errorMessage={errors.username?.message}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                parentStyle={{ marginHorizontal: 20 }}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                iconRight={
                  <Ionicons
                    name="checkmark-circle"
                    size={32}
                    color={theme.colors.text}
                  />
                }
                onRightIconPress={() => setIsSecure(!isSecure)}
                placeholder="password"
                secureTextEntry={isSecure}
                errorMessage={errors.password?.message}
              />
            )}
          />
        </Box>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(action.onSubmit)}
        >
          {loading ? (
            <ActivityIndicator color={"#fff"} />
          ) : (
            <CustomText size={16} type={TypeFonts.BOLD} color={Colors.white}>
              Login
            </CustomText>
          )}
        </TouchableOpacity>
      </ScrollView>
    </BaseScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 20,
    justifyContent: "center",
  },
  scroll: {
    flex: 1,
    justifyContent: "center",
  },
  box: {
    width: 100,
    height: 80,
    backgroundColor: "black",
    margin: 30,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    borderRadius: 10,
  },
});

export default Login;
