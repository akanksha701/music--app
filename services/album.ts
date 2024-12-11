import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const albumApi = createApi({
  reducerPath: "albumApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.APP_URL }),
  endpoints: (builder) => ({
    getArtists: builder.query({
      query: () => "api/album",
    }),
  }),
});

export const { useGetArtistsQuery } = albumApi;
