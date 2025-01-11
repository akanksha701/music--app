import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Method } from '@/app/About/types/types';
import {
  getTopAlbums,
  getTopGenres,
  getTopHits,
  like,
  music,
} from '@/utils/apiRoutes';
import { TAGS } from '@/app/(BrowsePage)/Browse/types/types';
import { RootState } from '@/Redux/store';

export const likeApi = createApi({
  reducerPath: 'likeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.APP_URL,
    prepareHeaders: (headers, { getState }) => {
      let accessToken: string | null = (getState() as RootState).session
        .accessToken;

      if (!accessToken) {
        accessToken = localStorage.getItem('accessToken');
      }

      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }

      return headers;
    },
  }),
  tagTypes: Object.values(TAGS),
  endpoints: (builder) => ({
    toggleLike: builder.mutation<void, { id: string; name: string }>({
      query: ({ id, name }) => ({
        url: like,
        method: Method.POST,
        body: { id, name },
      }),
      invalidatesTags: (result, error, { name }) => {
        switch (name) {
        case TAGS.MUSIC:
          return [TAGS.MUSIC, TAGS.TOP_HITS, TAGS.NEW_RELEASE];
        case TAGS.NEW_RELEASE:
          return [TAGS.MUSIC, TAGS.TOP_HITS, TAGS.NEW_RELEASE];
        case TAGS.ALBUMS:
          return [TAGS.ALBUMS, TAGS.TOP_ALBUMS];
        case TAGS.GENRE:
          return [TAGS.GENRE];
        default:
          return [];
        }
      },
    }),
    getTopHitsMusics: builder.query({
      query: () => getTopHits,
      providesTags: [TAGS.TOP_HITS],
    }),
    getTopAlbums: builder.query({
      query: () => getTopAlbums,
      providesTags: [TAGS.TOP_ALBUMS],
    }),
    getAllMusics: builder.query({
      query: ({ queryParams }) => `${music}?${queryParams}`,
      providesTags: [TAGS.NEW_RELEASE],
    }),
    getTopGenre: builder.query({
      query: () => getTopGenres,
      providesTags: [TAGS.GENRE],
    }),
  }),
});

export const {
  useToggleLikeMutation,
  useGetTopHitsMusicsQuery,
  useGetTopAlbumsQuery,
  useGetAllMusicsQuery,
  useGetTopGenreQuery,
} = likeApi;
