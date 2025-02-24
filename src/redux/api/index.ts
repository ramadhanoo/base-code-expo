import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../reducers";
import { AuthAPI } from "@/src/constants/ApiUrls";
import { getStore, getUserToken } from "../store";
import { clearState, setNewToken } from "../slices/AuthSlice";
import { BASE_URL } from "@/src/constants/configs";

interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.user.userToken?.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// Custom baseQuery untuk handle 401 dan refresh token
export const customBaseQuery: typeof baseQuery = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const userToken = getUserToken();
    const refreshToken = userToken?.userToken?.refreshToken;
    const refreshResult = await baseQuery(
      {
        url: AuthAPI.REFRESH_TOKEN,
        method: "POST",
        body: {
          refreshToken: refreshToken,
          expiresInMins: 1,
        },
      },
      api,
      extraOptions
    );
    const refreshData = refreshResult.data as RefreshTokenResponse;
    if (refreshData) {
      // Simpan token baru ke Redux store
      getStore().dispatch(
        setNewToken({
          accessToken: refreshData.accessToken,
          refreshToken: refreshData.refreshToken,
        })
      );
      // Ulangi request sebelumnya dengan token baru
      result = await baseQuery(args, api, extraOptions);
    } else {
      getStore().dispatch(clearState()); // Handle logout jika refresh token gagal
    }
  }

  return result;
};
