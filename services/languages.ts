import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const languageApi = createApi({
  reducerPath: "languageApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.APP_URL, }),
  endpoints: (builder) => ({
    getLanguage: builder.query({
      query: () => "api/language",
    }),
  }),
});

export const { useGetLanguageQuery } = languageApi;
