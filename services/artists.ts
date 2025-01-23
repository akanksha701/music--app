import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const artistApi = createApi({
  reducerPath: 'artistApi',
  baseQuery: fetchBaseQuery({ baseUrl:  process.env.APP_URL||'http://localhost:3000' }),
  endpoints: (builder) => ({
    getArtists: builder.query({
      query: () => 'api/artist',
    }),
  }),
});

export const { useGetArtistsQuery } = artistApi;
