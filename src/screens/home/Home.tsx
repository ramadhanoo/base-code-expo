import { BaseScreen, CustomText } from "@/src/components";
import { RootState } from "@/src/redux/reducers";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { useHome } from "./useHome";

const Home = () => {
  const authState = useSelector((state: RootState) => state.auth.user.userInfo);
  const { action } = useHome();

  return (
    <BaseScreen edges={["top"]}>
      <CustomText>haii {authState?.email} apa kabar</CustomText>
      <TouchableOpacity style={styles.button} onPress={() => action.onLogout()}>
        <CustomText>Logout</CustomText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => action.hitUser()}>
        <CustomText>hit user</CustomText>
      </TouchableOpacity>
    </BaseScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "red",
    padding: 10,
  },
});

export default Home;
