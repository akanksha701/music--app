import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const artistApi = createApi({
  reducerPath: "artistApi",
  baseQuery: fetchBaseQuery({ baseUrl:   process.env.APP_URL}),
  endpoints: (builder) => ({
    getartists: builder.query({
      query: () => "api/artists",
    }),
  }),
});

export const { useGetartistsQuery } = artistApi;
