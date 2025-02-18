/* eslint-disable react/react-in-jsx-scope */
import Animated, {SlideInDown, SlideOutDown} from 'react-native-reanimated';
import {Text, TextStyle, ViewStyle, useWindowDimensions} from 'react-native';
import { Colors } from '../constants/colors';

type ToastProp = {
  title: string;
  type: 'info' | 'success' | 'error';
};

const ToastApp = ({title, type = 'info'}: ToastProp) => {
  const {width} = useWindowDimensions();

  let textStyle: TextStyle = {
    color: '#cccccc',
    fontSize: 14,
    lineHeight: 17,
    paddingLeft: 16,
  };
  let toastStyle: ViewStyle = {
    flex: 1,
    flexDirection: 'row',
    width: width - 48,
    padding: 20,
    borderRadius: 6,
    borderWidth: 1,
    backgroundColor: '#ffffff',
    borderColor: '#cccccc',
  };

  if (type === 'success') {
    textStyle = {color: '#22bb33'};
    toastStyle = {...toastStyle, ...{borderColor: '#22bb33'}};
  } else if (type === 'error') {
    textStyle = {color: '#fff', fontSize: 16};
    toastStyle = {...toastStyle, ...{borderColor: Colors.danger, backgroundColor: Colors.danger}};
  }

  return (
    <Animated.View
      entering={SlideInDown}
      exiting={SlideOutDown}
      style={toastStyle}>
      <Text style={[textStyle]}>{title}</Text>
    </Animated.View>
  );
};

type Prop = {
  text1: string;
};

const ToastConfig: any = {
  success: ({text1}: Prop) => {
    return <ToastApp title={text1} type="success" />;
  },
  error: ({text1}: Prop) => {
    return <ToastApp title={text1} type="error" />;
  },
  info: ({text1}: Prop) => {
    return <ToastApp title={text1} type="info" />;
  },
};

export default ToastConfig;
