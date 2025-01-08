import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken") || "";

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchUserProfile: builder.query({
      query: () => ({
        url: "user",
        method: "GET",
      }),
    }),
    
    updateUserProfile: builder.mutation({
      query: (userData) => ({
        url: "user",
        method: "PUT",
        body: userData, // Send the user data to be updated
      }),
    }),
  }),
});

export const { useFetchUserProfileQuery, useUpdateUserProfileMutation } = userApi;
