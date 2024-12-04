import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const playlistApi = createApi({
  reducerPath: "playlistApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  endpoints: (builder) => ({
    getPlayLists: builder.query({
      query: () => "api/playlists",
    }),
  }),
});

export const { useGetPlayListsQuery } = playlistApi;
