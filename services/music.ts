import { Method } from "@/app/About/types/types";
import { getTopHits } from "@/utils/apiRoutes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const newMusicApi = createApi({
  reducerPath: "newMusicApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.APP_URL }),
  tagTypes: ['Music', 'NewRelease', 'TopHits'], 
  endpoints: (builder) => ({
    getnewMusics: builder.query({
      query: (language) =>
        language ? `api/newRelease?language=${language}}` : "api/newRelease",
      providesTags: ['NewRelease'],
    }),
    getAllMusics: builder.query({
      query: ({ page, recordsPerPage }) =>
        `api/music?page=${page}&recordsPerPage=${recordsPerPage}`,
      // providesTags: ['Music'],
    }),
    getTopHitsMusics: builder.query({
      query: () => `${getTopHits}`,
      providesTags: ['TopHits'],
    }),
    getNewReleaseMusics: builder.query({
      query: () => `api/newReleaseMusics`,
      // providesTags: ['NewRelease'],
    }),
    toggleLike: builder.mutation<void, { id: string; name: string }>({
      query: ({ id, name }) => ({
        url: "api/like",
        method: Method.POST,
        body: { id, name },
      }),
      invalidatesTags: ['TopHits'],
    }),
  }),
});

export const {
  useGetnewMusicsQuery,
  useGetAllMusicsQuery,
  useGetTopHitsMusicsQuery,
  useGetNewReleaseMusicsQuery,
  useToggleLikeMutation,
} = newMusicApi;