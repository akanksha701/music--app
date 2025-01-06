import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserResponse } from "./types";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.APP_URL,
  }),
  endpoints: (builder) => ({
    fetchUserProfile: builder.query<UserResponse, void>({
      query: () => "/api/user",
    }),
  }),
});

export const { useLazyFetchUserProfileQuery } = userApi;
