import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { TDefaultData, TError, TResponse } from "./types";
import { getStore, getUserToken } from "../redux/store";
import { BASE_URL as DEFAULT_BASE_URL } from "../constants/configs";
import { clearState, setNewToken } from "../redux/slices/AuthSlice";
import { AuthAPI } from "../constants/ApiUrls";

let abortController = new AbortController();

const abortAll = () => {
  abortController.abort();
  abortController = new AbortController();
};

// Factory function untuk membuat axios instance
const createHttpInstance = (baseURL: string = DEFAULT_BASE_URL) => {
  const instance = axios.create({
    baseURL,
    timeout: 10000, //10 detik
  });

  instance.interceptors.request.use(async (config) => {
    const userToken = getUserToken();
    const token = userToken?.userToken?.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  instance.interceptors.response.use(
    async (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      // Jika token expired (401) dan bukan refresh-token request
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true; // Tandai request ini agar tidak looping
        // jika logic auto logout
        // dispatch(clearState());
        try {
          const newToken = await refreshAccessToken();
          if (newToken) {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return axios(originalRequest); // Ulangi request sebelumnya dengan token baru
          } 
        } catch (refreshError) {
          getStore().dispatch(clearState());
        }
      }

      return Promise.reject(error);
    }
  );
  return instance;
};

// Fungsi refresh token
const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const userToken = getUserToken();
    const refreshToken = userToken?.userToken?.refreshToken;
    if (!refreshToken) throw new Error("No refresh token available");
    const response = await axios.post<
      TResponse<{ accessToken: string; refreshToken: string }>
    >(`${DEFAULT_BASE_URL}${AuthAPI.REFRESH_TOKEN}`, {
      refreshToken: refreshToken,
      expiresInMins: 1,
    });
    const newAccessToken = response.data.accessToken;
    getStore().dispatch(
      setNewToken({
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      })
    );

    return newAccessToken;
  } catch (error) {
    throw error
  }
};

// Fungsi request API dengan retry logic
const request = async <T>(
  method: "get" | "post" | "patch" | "delete",
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
  baseURL: string = DEFAULT_BASE_URL
): Promise<TResponse<T>> => {
  try {
    const http = createHttpInstance(baseURL);
    const response = await http[method]<TResponse<T>>(url, data, {
      ...config,
      signal: abortController.signal,
    });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<TResponse<TError>>;
    const response = axiosError.response?.data;
    const errorMessage = response?.message ?? "no error message";
    console.log(`Error while ${method} ${url}.`, errorMessage);

    throw error;
  }
};

// Wrapper API
const Api = {
  get: <T>(url: string, config?: AxiosRequestConfig, baseURL?: string) =>
    request<T>("get", url, undefined, config, baseURL),
  post: <T = TDefaultData>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
    baseURL?: string
  ) => request<T>("post", url, data, config, baseURL),
  patch: <T = TDefaultData>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
    baseURL?: string
  ) => request<T>("patch", url, data, config, baseURL),
  del: <T = TDefaultData>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
    baseURL?: string
  ) => request<T>("delete", url, data, config, baseURL),
  abortAll,
};

export { Api, DEFAULT_BASE_URL };
