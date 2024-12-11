import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const albumApi = createApi({
  reducerPath: "albumApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.APP_URL }),
  endpoints: (builder) => ({
    getAlbums: builder.query({
      query: ({ page, recordsPerPage }) =>
        `api/album?page=${page}&recordsPerPage=${recordsPerPage}`,
    }),
    getTopAlbums: builder.query({
      query: () => "api/topalbums",
    }),
  }),
});

export const { useGetAlbumsQuery, useGetTopAlbumsQuery } = albumApi;
