import { TAGS } from "@/app/(BrowsePage)/Browse/types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
console.log("process.env.APP_URL : ", process.env.APP_URL)
export const albumApi = createApi({
  reducerPath: "albumApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api" }),

  tagTypes: ["Albums"],
  endpoints: (builder) => ({
    getAlbums: builder.query({
      query: ({ page, recordsPerPage }) =>
        `album?page=${page}&recordsPerPage=${recordsPerPage}`,
      providesTags: ["Albums"],
    }),
    getAlbumById: builder.query({
      query: (id) =>
        `album?AlbumId=${id}`,
      providesTags: ["Albums"],

    }),
    getAlbumByArtistId: builder.query({
      query: (id) =>
        `album?ArtistId=${id}`,
      providesTags: ["Albums"],

    }),
    addAlbum: builder.mutation({
      query: (data) => ({
        url: `album`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Albums"],
    }),
    updateAlbum: builder.mutation({
      query: ({ albumId, data }) => ({
        url: `album?id=${albumId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Albums"],

    }),
    deleteAlbum: builder.mutation({
      query: (id) => ({
        url: `album?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Albums"],

    }),
  }),
});

export const { 
  useGetAlbumsQuery, 
  useAddAlbumMutation, 
  useUpdateAlbumMutation, 
  useDeleteAlbumMutation,
  useGetAlbumByIdQuery, 
  useGetAlbumByArtistIdQuery
} = albumApi;
