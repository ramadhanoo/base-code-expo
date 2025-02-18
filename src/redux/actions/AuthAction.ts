import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { UserToken } from "../types";
import { Api, Endpoint, TError, TResponse } from "@/src/network";
import AppToast from "@/src/constants/AppToast";

type TLoginPayload = {
  username: string;
  password: string;
  expiresInMins?: number
};

export const loginProses = createAsyncThunk<
  UserToken,
  TLoginPayload,
  { rejectValue: TError | undefined }
>(
  "auth/login",
  async ({ username, password }: TLoginPayload, { rejectWithValue }) => {
    try {
      const response = await Api.post<UserToken>(Endpoint.login, {
        username,
        password,
        expiresInMins: 1
      });
      return response;
    } catch (error) {
      const response = (error as AxiosError)?.response?.data as TError;
      AppToast.showError({ title: response?.message ?? "Something wrong!" });
      if (!response) {
        return rejectWithValue({
          message: "Failed to login",
        });
      }
      return rejectWithValue({
        message: response.message,
      });
    }
  }
);

export const getUser = createAsyncThunk<
  UserToken,
  undefined,
  { rejectValue: TError | undefined }
>("auth/get_user", async (_, { rejectWithValue }) => {
  try {
    const response = await Api.get<UserToken>(Endpoint.get_user);
    return response;
  } catch (error) {
    const response = (error as AxiosError)?.response?.data as TError;
    AppToast.showError({ title: response?.message ?? "Something wrong!" });
    if (!response) {
      return rejectWithValue({
        message: "Failed to login",
      });
    }
    return rejectWithValue({
      message: response.message,
    });
  }
});
