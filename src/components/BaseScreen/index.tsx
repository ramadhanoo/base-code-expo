import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { Theme, useTheme } from "@react-navigation/native";

type BaseScreenProps = ViewProps & {
  children: React.ReactNode;
};

const BaseScreen: React.FC<BaseScreenProps> = ({ children, ...props }) => {
  const theme = useTheme();
  return (
    <View
      {...props}
      style={[
        styles.container,
        { backgroundColor: theme.colors.background },
        props.style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default BaseScreen;
