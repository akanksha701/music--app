'use server';
import React from 'react';
import Browse from './index';
import { fetchApi } from '@/utils/helpers';
import { Method } from '@/app/About/types/types';
import { getTopAlbums, getTopGenres, getTopHits, music } from '@/utils/apiRoutes';
import { cookies } from 'next/headers';

async function fetchUserId() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get('user_session');
  return userCookie ? userCookie.value : null; // Return the value if it exists, otherwise null
}

async function getData(userId: string | null) {
  console.log('Fetching data for userId:', userId);
  try {
    const [topHits, topAlbums, newReleases, topGenres] = await Promise.all([
      fetchApi(getTopHits, Method.GET),
      fetchApi(getTopAlbums, Method.GET),
      fetchApi(music, Method.GET),
      fetchApi(getTopGenres + '?limit=8', Method.GET),
    ]);

    return { topHits, topAlbums, newReleases, topGenres };
  } catch (error) {
    return { topHits: [], topAlbums: [], newReleases: [], topGenres: [] };
  }
}

const Page = async () => {
  const userId = await fetchUserId(); 
  const data = await getData(userId);
  console.log('data', data)
  return (
    <Browse
      initialData={{
        topHits: data?.topHits || [],
        topAlbums: data?.topAlbums || [],
        newReleases: data?.newReleases || [],
        topGenres: data?.topGenres || [],
      }}
    />
  );
};

export default Page;
