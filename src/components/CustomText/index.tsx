import React from "react";
import {
  Text,
  TextProps,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { TypeFonts } from "@/src/types/common";

type CustomTextProps = TextProps & {
  children: React.ReactNode;
  type?: TypeFonts;
  size?: number;
};

const CustomText: React.FC<CustomTextProps> = ({
  type = TypeFonts.REGULAR,
  children,
  size = 12,
  ...props
}) => {
  const theme = useTheme();
  return (
    <Text
      {...props}
      style={[
        {
          fontFamily: type,
          color: theme.colors.text,
          fontSize: size,
        },
        props.style,
      ]}
    >
      {children}
    </Text>
  );
};

export default CustomText;
