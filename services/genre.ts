import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const genreApi = createApi({
  reducerPath: "genreApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.APP_URL }),
  endpoints: (builder) => ({
    getGenre: builder.query({
      query: ({page,recordsPerPage}) => `api/genre?page=${page}&recordsPerPage=${recordsPerPage}`,
    }),
    getTopGenre: builder.query({
      query: () => "api/topgenres",
    }),
  }),
});

export const { useGetGenreQuery, useGetTopGenreQuery } = genreApi;
