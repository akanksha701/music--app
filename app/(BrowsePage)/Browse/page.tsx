'use server';

import React from "react";
import Browse from "./index";
import { fetchApi } from "@/utils/helpers";
import { Method } from "@/app/About/types/types";
import { getTopAlbums, getTopGenres, getTopHits, music } from "@/utils/apiRoutes";
import { currentUser } from "@clerk/nextjs/server";
import { cookies } from 'next/headers';
async function fetchUserId() { 
  const cookieStore = await cookies();
  const userID = cookieStore.get('user_session');
  return userID;
}

const Page = async () => {
  const getData = async () => {
    try {
      const userId = await fetchUserId();
      if (!userId) throw new Error('User ID is missing');
   
      const [topHits, topAlbums, newReleases, topGenres] = await Promise.all([
        fetchApi(getTopHits+`?id=${userId}`, Method.GET),
        fetchApi(getTopAlbums+`?id=${userId}`, Method.GET),
        fetchApi(music+`?id=${userId}`, Method.GET),
        fetchApi(getTopGenres+`?id=${userId}&limit=8`, Method.GET),
      ]);
  
      return { topHits, topAlbums, newReleases, topGenres };
    } catch (error) {
      console.error("Error fetching data on the server:", error);
      return { topHits: [], topAlbums: [], newReleases: [], topGenres: [] };
    }
  };
  

  const data = await getData();
  console.log("DATA : " , data)

  return (
    <Browse
      initialData={{
        topHits: data.topHits || [],
        topAlbums: data.topAlbums || [],
        newReleases: data.newReleases || [],
        topGenres: data.topGenres || [],
      }}
    />
  );
};

export default Page;
