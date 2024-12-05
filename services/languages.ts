import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const languageApi = createApi({
  reducerPath: "languageApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  endpoints: (builder) => ({
    getLanguage: builder.query({
      query: () => "api/language",
    }),
  }),
});

export const { useGetLanguageQuery } = languageApi;
