import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const playlistApi = createApi({
  reducerPath: 'playlistApi',
  tagTypes: ['Playlists'],

  baseQuery: fetchBaseQuery({ baseUrl: process.env.APP_URL  }),
  endpoints: (builder) => ({
    getPlayLists: builder.query({
      query: () => 'api/playlists',
      providesTags: ['Playlists'],
    }),
    createPlayList: builder.mutation({
      query: (data) => ({
        url: 'api/playlists',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Playlists'],
    }) 
  }),
});

export const { useGetPlayListsQuery, 
  useCreatePlayListMutation
} = playlistApi;
