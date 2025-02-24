import { getUser, loginProses } from "@/src/redux/actions/AuthAction";
import { useAppDispatch } from "@/src/redux/store";
import { PATHS } from "@/src/constants/paths";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/reducers";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PayloadAction } from "@reduxjs/toolkit";
import { UserToken } from "@/src/redux/types";
import { useState } from "react";
import { clearState } from "@/src/redux/slices/AuthSlice";

const formSchema = z.object({
  username: z.string().min(1, "Username tidak boleh kosong"),
  password: z.string().min(8, "Password must contain at least 8 character(s)"),
});

export function useLogin() {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  // const route = useRoute<RouteProp<StackParamList, typeof PATHS.LOGIN>>();
  const authState = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const [isSecure, setIsSecure] = useState<boolean>(true);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const response = (await dispatch(
      loginProses({ username: data.username, password: data.password })
    )) as PayloadAction<UserToken>;

    if (response.payload?.id) {
      dispatch(getUser());
    }
  };

  return {
    navigation,
    form,
    action: {
      onSubmit,
    },
    state: {
      authState,
      isSecure,
      setIsSecure,
    },
  };
}
