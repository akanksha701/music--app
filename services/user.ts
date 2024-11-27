// services/user.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserResponse } from './types';



export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:3000/',
  }),
  endpoints: (builder) => ({
    fetchUserProfile: builder.query<UserResponse, void>({ // void means no argument needed
      query: () => 'api/user',
    }),
  }),
});

// Export the generated hooks
export const { useLazyFetchUserProfileQuery } = userApi;
