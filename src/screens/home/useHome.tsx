import { useAppDispatch } from "@/src/redux/store";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { useCallback } from "react";
import { clearState } from "@/src/redux/slices/AuthSlice";
import { getUser } from "@/src/redux/actions/AuthAction";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/reducers";

export function useHome() {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const authState = useSelector((state: RootState) => state.auth);
  // const route = useRoute<RouteProp<StackParamList, typeof PATHS.LOGIN>>();
  const dispatch = useAppDispatch();
  
  const onLogout = useCallback(() => {
    dispatch(clearState());
  }, []);

  const hitUser = () => {
    console.log("dari home state", authState)
    dispatch(getUser())
  }

  return {
    navigation,
    action: {
      onLogout,
      hitUser
    },
    state: {},
  };
}
