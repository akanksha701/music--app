import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const musicApi = createApi({
  reducerPath: "musicApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
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
    getMusicsByGenre : builder.query({
      query: ({id , type}) => `api/music/for?type=${type}&id=${id}`,
    })
  }),
});

export const { useGetnewMusicsQuery, useGetMusicsOfArtistsQuery, useGetAllMusicsQuery ,useGetMusicsByUserIdQuery, 
  useGetMusicsByGenreQuery
 } =
  musicApi;
