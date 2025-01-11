import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const languageApi = createApi({
  reducerPath: 'languageApi',
  tagTypes: ['Languages'],
  baseQuery: fetchBaseQuery({ baseUrl: process.env.APP_URL }),
  endpoints: (builder) => ({
    getLanguage: builder.query({
      query: ({ page, recordsPerPage }) =>
        `api/language?page=${page}&recordsPerPage=${recordsPerPage}`,
      providesTags: ['Languages'],
    }),
    getAllLanguage: builder.query({
      query: () => 'api/all/languages',
      providesTags: ['Languages'],
    }),
    addLanguage: builder.mutation({
      query: (data) => ({
        url: 'api/language',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Languages'],   
   
    }),
    updateLanguage: builder.mutation({
      query: ({ id, data }) => ({
        url: `api/language?id=${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Languages'],   

    }),
    deleteLanguage: builder.mutation({
      query: ({ id }) => ({
        url: `api/language?id=${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Languages'],   
    }),
  }),
});

export const { useGetLanguageQuery  , useGetAllLanguageQuery ,     
  useUpdateLanguageMutation ,useAddLanguageMutation, useDeleteLanguageMutation  } = languageApi;
