import React from "react";
import {
  StyleSheet,
  TouchableOpacityProps,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "@react-navigation/native";

type CardProps = TouchableOpacityProps & {
  children?: React.ReactNode;
  orientation: "horizontal" | "vertical";
};

const Card: React.FC<CardProps> = ({
  orientation = "vertical",
  children,
  ...props
}) => {
  const theme = useTheme();
  return (
    <TouchableOpacity
      {...props}
      activeOpacity={0.7}
      style={[
        styles[orientation],
        { backgroundColor: theme.colors.card },
        props.style,
      ]}
    >
      {children}
    </TouchableOpacity>
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

export default Card;
