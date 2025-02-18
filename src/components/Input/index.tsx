import React, { ReactElement } from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  ViewStyle,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { TypeFonts } from "@/src/types/common";
import Box from "../Box";
import CustomText from "../CustomText";
import { Colors } from "@/src/constants/colors";

type InputProps = TextInputProps & {
  parentStyle?: ViewStyle;
  containerStyle?: ViewStyle;
  errorMessage?: string;
  iconLeft?: ReactElement;
  iconRight?: ReactElement;
  onRightIconPress?: () => void;
  onLeftIconPress?: () => void;
  label?: string;
};

const Input: React.FC<InputProps> = ({
  containerStyle,
  style,
  errorMessage = "",
  parentStyle,
  iconLeft,
  iconRight,
  onRightIconPress,
  onLeftIconPress,
  label,
  ...props
}) => {
  const theme = useTheme();
  return (
    <Box style={parentStyle}>
      {label && (
        <CustomText
          size={17}
          type={TypeFonts.MEDIUM}
          style={[styles.labelText, { color: theme.colors.text }]}
        >
          {label}
        </CustomText>
      )}
      <Box
        style={[
          styles.container,
          errorMessage && { borderWidth: 1, borderColor: Colors.danger },
          { backgroundColor: theme.colors.card },
          containerStyle,
        ]}
        orientation={"horizontal"}
      >
        <Pressable onPress={onLeftIconPress}>{iconLeft && iconLeft}</Pressable>
        <TextInput
          {...props}
          style={[styles.inputBox, { color: theme.colors.text }, style]}
        />
        <Pressable onPress={onRightIconPress}>
          {iconRight && iconRight}
        </Pressable>
      </Box>
      {errorMessage && (
        <CustomText size={15} style={styles.errorText}>
          {errorMessage}
        </CustomText>
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 57,
    borderRadius: 16,
    padding: 7,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingHorizontal: 15,
    marginTop: 10,
  },
  inputBox: {
    flex: 1,
    fontFamily: TypeFonts.REGULAR,
    fontSize: 17,
  },
  errorText: {
    color: Colors.danger,
    marginTop: 8,
  },
  labelText: {
    color: Colors.darkGrey,
  },
});

export default Input;
