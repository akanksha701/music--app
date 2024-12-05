import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const playlistApi = createApi({
  reducerPath: "playlistApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.APP_URL  }),
  endpoints: (builder) => ({
    getPlayLists: builder.query({
      query: () => "api/playlists",
    }),
  }),
});

export const { useGetPlayListsQuery } = playlistApi;
