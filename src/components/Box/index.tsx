import React from "react";
import { StyleSheet, ViewProps, View } from "react-native";
import Animated, { AnimatedProps } from "react-native-reanimated";

type BoxProps = AnimatedProps<ViewProps> & {
  children?: React.ReactNode;
  orientation?: "horizontal" | "vertical";
};

const Box: React.FC<BoxProps> = ({
  orientation = "vertical",
  children,
  ...props
}) => {
  return (
    <Animated.View
      {...props}
      style={[
        styles[orientation],
        props.style,
      ]}
    >
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  horizontal: {
    flexDirection: "row",
  },
  vertical: {
    flexDirection: "column",
  },
});

export default Box;
