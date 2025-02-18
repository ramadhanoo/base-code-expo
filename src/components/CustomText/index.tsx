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
  color?: string;
};

const CustomText: React.FC<CustomTextProps> = ({
  type = TypeFonts.REGULAR,
  children,
  color = useTheme().colors.text,
  size = 12,
  ...props
}) => {
  return (
    <Text
      {...props}
      style={[
        {
          fontFamily: type,
          color: color,
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
