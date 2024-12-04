import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const artistApi = createApi({
  reducerPath: "artistApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  endpoints: (builder) => ({
    getartists: builder.query({
      query: () => "api/artists",
    }),
  }),
});

export const { useGetartistsQuery } = artistApi;
