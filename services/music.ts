import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const musicApi = createApi({
  reducerPath: "musicApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.APP_URL }),
  endpoints: (builder) => ({
    getnewMusics: builder.query({
      query: (language) =>
        language ? `api/newRelease?language=${language}}` : "api/newRelease",
    }),
    getAllMusics: builder.query({
      query: () => `api/music`,
    }),
    getMusicsOfArtists: builder.query({
      query: (id) => `api/music/artist/${id}`,  
    }),
    getMusicsByUserId: builder.query({
      query: (slug) => `api/music/${slug}`,  
    }),
  }),
});

export const { useGetnewMusicsQuery, useGetMusicsOfArtistsQuery, useGetAllMusicsQuery ,useGetMusicsByUserIdQuery } =
  musicApi;
