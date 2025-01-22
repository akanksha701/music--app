import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const artistApi = createApi({
  reducerPath: 'artistApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://music-app-red-pi.vercel.app' }),
  endpoints: (builder) => ({
    getArtists: builder.query({
      query: () => 'api/artist',
    }),
  }),
});

export const { useGetArtistsQuery } = artistApi;
