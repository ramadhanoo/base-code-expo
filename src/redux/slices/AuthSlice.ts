import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthState, UserToken } from "../types";
import { PURGE } from "redux-persist";
import { TError } from "@/src/network/types";
import { loginProses } from "../actions/AuthAction";

const initialState: AuthState = {
  loading: false,
  userToken: null,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearState: (state) => {
      state.userToken = null;
    },
    setNewToken: (
      state: AuthState,
      { payload }: PayloadAction<{ accessToken: string; refreshToken: string }>
    ) => {
      state.userToken = {
        ...state.userToken,
        accessToken: payload.accessToken,
        refreshToken: payload.refreshToken,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      return initialState;
    });

    builder.addCase(
      loginProses.fulfilled,
      (state: AuthState, { payload }: PayloadAction<UserToken>) => {
        state.loading = false;
        state.userToken = payload;
        state.success = true;
      }
    );

    builder.addCase(
      loginProses.rejected,
      (
        state: AuthState,
        { payload }: PayloadAction<TError | null | undefined>
      ) => {
        state.loading = false;
        state.error = payload;
        state.success = false;
      }
    );

    builder.addCase(loginProses.pending, (state: AuthState) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });

    // builder.addMatcher(
    //   (action) => action.type.endsWith("/pending"),
    //   (state: AuthState) => {
    //     state.loading = true;
    //     state.error = null;
    //     state.success = false;
    //   }
    // );
  },
});

const AuthReducer = authSlice.reducer;
export const { clearState, setNewToken } = authSlice.actions;
export default AuthReducer;
