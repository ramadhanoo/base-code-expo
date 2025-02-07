import axios, { AxiosError, AxiosRequestConfig } from "axios";
// import AppToast from '../constants/AppToast';
// import {getStore, getUserToken, logout} from '../redux';
import { TDefaultData, TError, TResponse } from "./types";
import { BASE_URL } from "../constants/configs";
import { getStore, getUserToken } from "../redux/store";

export const Endpoint = {
  login: "/auth/login",
};

let abortController = new AbortController();

const abortAll = () => {
  abortController.abort();
  abortController = new AbortController();
};

export const http = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

http.interceptors.request.use(async (config) => {
  const userToken = getUserToken();
  const token = userToken?.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log(`[api path]:`, config.url);
  console.log(`[api headers]:`, config.headers);

  return config;
});

// intercept 401 responses and log out the user
http.interceptors.response.use(
  (response) => {
    console.log(
      `[api response status -- ${response.config.url}]: ${response.status}`
    );
    console.log(
      `[api response data -- ${response.config.url}]:`,
      JSON.stringify(response.data)
    );

    return response;
  },
  (error) => {
    console.log("ini error", error.response.config.url);
    if (
      error.response?.status === 401 &&
      !error.response.config.url.include("/auth")
    ) {
      // getStore().dispatch(logout());
      //   AppToast.showInfo({
      //     title: 'Session expired. Please login again.',
      //   });
    }

    return Promise.reject(error);
  }
);

const get = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<TResponse<T>> => {
  try {
    const response = await http.get<TResponse<T>>(url, {
      ...config,
      signal: abortController.signal,
    });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    // const response = axiosError.response?.data;
    // const errorMessage =
    //   response?.error ?? response?.data?.message ?? 'no error message';

    console.log(`Error while getting ${url}.`, axiosError);

    throw error;
  }
};

const post = async <T = TDefaultData>(
  url: string,
  data: any,
  config?: AxiosRequestConfig
): Promise<TResponse<T>> => {
  try {
    const response = await http.post<TResponse<T>>(url, data, {
      ...config,
      signal: abortController.signal,
    });

    return response.data;
  } catch (error) {
    const response = (error as AxiosError<TResponse<TError>>).response?.data;
    const errorMessage = response?.message ?? 'no error message';

    throw error;
  }
};

const patch = async <T = TDefaultData>(
  url: string,
  data: any,
  withFormData: boolean = false,
  config?: AxiosRequestConfig
): Promise<TResponse<T>> => {
  try {
    const { patch: defaultPatch, patchForm } = http;

    const response = await (withFormData ? patchForm : defaultPatch)<
      TResponse<T>
    >(url, data, {
      ...config,
      signal: abortController.signal,
    });

    return response.data;
  } catch (error) {
    // const response = (error as AxiosError<TResponse>).response?.data;
    // const errorMessage =
    //   response?.error ?? response?.data?.message ?? 'no error message';

    // console.log(`Error while patching ${url}.`, errorMessage);

    throw error;
  }
};

const del = async <T = TDefaultData>(
  url: string,
  data: any,
  config?: AxiosRequestConfig
): Promise<TResponse<T>> => {
  try {
    const response = await http.delete<TResponse<T>>(url, {
      ...config,
      signal: abortController.signal,
      data,
    });

    return response.data;
  } catch (error) {
    // const response = (error as AxiosError<TResponse>).response?.data;
    // const errorMessage =
    //   response?.error ?? response?.data?.message ?? 'no error message';

    // console.log(`Error while deleting ${url}.`, errorMessage);

    throw error;
  }
};

export const Api = {
  get,
  post,
  patch,
  del,
  abortAll,
};
