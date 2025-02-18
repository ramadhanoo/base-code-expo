import React from "react";
import { StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
import {
  SafeAreaView,
  SafeAreaViewProps,
} from "react-native-safe-area-context";

type BaseScreenProps = SafeAreaViewProps & {
  children: React.ReactNode;
};

const BaseScreen: React.FC<BaseScreenProps> = ({
  children,
  edges = [],
  ...props
}) => {
  const theme = useTheme();
  return (
    <SafeAreaView
      {...props}
      edges={edges}
      style={[
        styles.container,
        { backgroundColor: theme.colors.background },
        props.style,
      ]}
    >
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default BaseScreen;
