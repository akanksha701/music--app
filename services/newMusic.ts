import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const newMusicApi = createApi({
  reducerPath: "newMusicApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.APP_URL }),
  endpoints: (builder) => ({
    getnewMusics: builder.query({
      query: (language) =>
        language ? `api/newRelease?language=${language}}` : "api/newRelease",
    }),
  }),
});

export const { useGetnewMusicsQuery } = newMusicApi;
