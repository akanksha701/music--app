import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const genreApi  = createApi({
  reducerPath: 'genreApi',
  tagTypes: ['Genres'],
  baseQuery: fetchBaseQuery({ baseUrl: process.env.APP_URL }),
  endpoints: (builder) => ({
    getGenre: builder.query({
      query: ({page,recordsPerPage}) => `api/genre?page=${page}&recordsPerPage=${recordsPerPage}`,
      providesTags: ['Genres'],
    }),
    getAllGenre: builder.query({
      query: () => 'api/all/genres',
      providesTags: ['Genres'],
    }),
    addGenre: builder.mutation({
      query: (data) => ({
        url: 'api/genre',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Genres'],   
    }),
    
    updateGenre: builder.mutation({
      query: ({ id, data }) => ({
        url: `api/genre?id=${id}`,
        method: 'PUT',
        body: data,
      }), 
      invalidatesTags: ['Genres'],   

    }),
    deleteGenre : builder.mutation({
      query: ({ id}) => ({
        url: `api/genre?id=${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Genres'],   

      
    })
  }),
});
 
export const { 
  useGetGenreQuery, useAddGenreMutation, useGetAllGenreQuery , 
  useUpdateGenreMutation , useDeleteGenreMutation } = genreApi;
