import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const albumApi = createApi({
  reducerPath: "albumApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.APP_URL }),
  endpoints: (builder) => ({
    getAlbums: builder.query({
      query: () => "api/album",
    }),
    getTopAlbums: builder.query({
      query: () =>'api/topalbums',
    }),
  }),
  
});

export const { useGetAlbumsQuery,useGetTopAlbumsQuery } = albumApi;
