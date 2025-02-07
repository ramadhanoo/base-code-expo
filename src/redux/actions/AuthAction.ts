import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios"; 
import { UserToken } from "../types";
import { Api, Endpoint, TError, TResponse } from "@/src/network";

type TLoginPayload = { 
  username: string;
  password: string;
};

export const loginProses = createAsyncThunk<
  UserToken,
  TLoginPayload,
  {rejectValue: TError | undefined}
>('auth/login', async ({username, password}: TLoginPayload, {rejectWithValue}) => {
  try {
    const response = await Api.post<UserToken>(Endpoint.login, {
      username,
      password,
    });
    return response;
  } catch (error) {
    const response = (error as AxiosError)?.response as unknown as TError;
    if (!response) {
      return rejectWithValue({
        message: 'Failed to login',
      });
    }
    return rejectWithValue(response);
  }
});