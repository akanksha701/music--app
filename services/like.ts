import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MediaType, TAGS } from "@/app/(BrowsePage)/Browse/types/types";
import { Method } from "@/app/About/types/types";
import { getTopHits } from "@/utils/apiRoutes";

export const likeApi = createApi({
  reducerPath: "likeApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.APP_URL }),
  tagTypes: Object.values(TAGS),
  endpoints: (builder) => ({
    toggleLike: builder.mutation<void, { id: string; name: string }>({
      query: ({ id, name }) => ({
        url: "api/like",
        method: Method.POST,
        body: { id, name },
      }),
      invalidatesTags: (result, error, { name }) => {
        switch (name) {
          case MediaType.MUSIC:
            return [TAGS.MUSIC, TAGS.TOP_HITS, TAGS.NEW_RELEASE];
          case MediaType.ALBUM:
            return [TAGS.ALBUMS, TAGS.TOP_ALBUMS];
          case MediaType.GENRE:
            return [TAGS.GENRE];
          default:
            return [];
        }
      },
    }),
    getTopHitsMusics: builder.query<any, void>({
      query: () => getTopHits,
      providesTags: [TAGS.TOP_HITS],
    }),
    getTopAlbums: builder.query({
      query: () => "api/topalbums",
      providesTags: [TAGS.TOP_ALBUMS],
    }),
    getAllMusics: builder.query({
      query: ({ page, recordsPerPage }) =>
        `api/music?page=${page}&recordsPerPage=${recordsPerPage}`,
      providesTags: [TAGS.NEW_RELEASE],
    }),
    getTopGenre: builder.query({
      query: () => "api/topgenres",
      providesTags: [TAGS.GENRE],

    }),
  }),
});

export const {
  useToggleLikeMutation,
  useGetTopHitsMusicsQuery,
  useGetTopAlbumsQuery,
  useGetAllMusicsQuery,
  useGetTopGenreQuery
} = likeApi;
