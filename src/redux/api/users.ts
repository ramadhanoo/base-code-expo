import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from ".";
import { UsersAPI } from "@/src/constants/ApiUrls";
import { DetailUser } from "../types";

export const usersApi = createApi({
  reducerPath: "api",
  baseQuery: customBaseQuery, // Gunakan custom baseQuery
  endpoints: (builder) => ({
    getUsers: builder.query<DetailUser, void>({
      query: () => ({
        url: UsersAPI.GET_USER,
        method: 'GET'
      }),
    }),
  }),
});


export const { useGetUsersQuery } = usersApi;
