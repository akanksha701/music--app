import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const audioApi = createApi({
  reducerPath: 'audioApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.APP_URL }), // Set the base URL for your API
  endpoints: (builder) => ({
    fetchAudioPeaks: builder.query<any, string>({
      query: (audioUrl) => `api/wavesurfer?url=${(audioUrl)}`,
    }),
  }),
});

export const { useFetchAudioPeaksQuery } = audioApi;

