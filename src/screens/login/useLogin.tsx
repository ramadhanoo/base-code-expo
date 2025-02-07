

import { loginProses } from "@/src/redux/actions/AuthAction";
import { useAppDispatch } from "@/src/redux/store";
import { useEffect } from "react";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated';

export function useLogin() {
  const dispatch = useAppDispatch();
  const randomWidth = useSharedValue(10);

  const config = {
    duration: 500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const styleChart = useAnimatedStyle(() => {
    return {
      width: withTiming(randomWidth.value, config),
    };
  });
   
  const onLogin = async () => {
    const data = await dispatch(loginProses({ username: 'emilys', password: 'emilyspass' }))
    console.log("datanya", data)
  };

  return {
    action: {
      onLogin,
      styleChart
    },
    state: {
      randomWidth
    },
  };
}
