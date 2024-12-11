import { getTopHits } from "@/utils/apiRoutes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const newMusicApi = createApi({
  reducerPath: "newMusicApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.APP_URL }),
  endpoints: (builder) => ({
    getnewMusics: builder.query({
      query: (language) =>
        language ? `api/newRelease?language=${language}}` : "api/newRelease",
    }),
    getAllMusics: builder.query({
      query: ({ page, recordsPerPage }) =>
        `api/music?page=${page}&recordsPerPage=${recordsPerPage}`,
    }),
    getTopHitsMusics: builder.query({
      query: () => `${getTopHits}`,
    }),
  }),
});

export const {
  useGetnewMusicsQuery,
  useGetAllMusicsQuery,
  useGetTopHitsMusicsQuery,
} = newMusicApi;
