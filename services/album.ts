import { RootState } from '@/Redux/store';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const albumApi = createApi({
  reducerPath: 'albumApi', 
  baseQuery: fetchBaseQuery({
    baseUrl:  process.env.APP_URL,  
    prepareHeaders: (headers, { getState }) => {
      let accessToken:string|null = (getState() as RootState).session.accessToken;

      if (!accessToken) {
        accessToken = localStorage.getItem('accessToken');
      }

      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }

      return headers;
    },
  }),
  tagTypes: ['Albums'],
  endpoints: (builder) => ({
    getAlbums: builder.query({
      query: ({ page, recordsPerPage }) =>
        `/api/album?page=${page}&recordsPerPage=${recordsPerPage}`,
      providesTags: ['Albums'],
    }),
    getAlbumById: builder.query({
      query: (id) =>
        `/api/album?AlbumId=${id}`,
      providesTags: ['Albums'],
    }),
    getAlbumByIdAndType: builder.query({
      query: ({id, type}) =>
        `/api/album?AlbumId=${id}&type=${type}`,
      providesTags: ['Albums'],
    }),
    getAlbumByArtistId: builder.query({
      query: (id) =>
        `/api/album?ArtistId=${id}`,
      providesTags: ['Albums'],
    }),
    addAlbum: builder.mutation({
      query: (data) => ({
        url: '/api/album',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Albums'],
    }),
    updateAlbum: builder.mutation({
      query: ({ albumId, data }) => ({
        url: `/api/album?id=${albumId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Albums'],

    }),
    deleteAlbum: builder.mutation({
      query: (id) => ({
        url: `/api/album?id=${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Albums'],

    }),
  }),
});

export const { 
  useGetAlbumsQuery, 
  useAddAlbumMutation, 
  useUpdateAlbumMutation, 
  useDeleteAlbumMutation,
  useGetAlbumByIdQuery, 
  useGetAlbumByArtistIdQuery,
  useGetAlbumByIdAndTypeQuery
} = albumApi;
