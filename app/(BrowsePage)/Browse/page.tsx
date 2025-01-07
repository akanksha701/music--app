"use server";

import React from "react";
import Browse from "./index";
import { fetchApi } from "@/utils/helpers";
import { Method } from "@/app/About/types/types";
import { getTopAlbums, getTopGenres, getTopHits, music } from "@/utils/apiRoutes";
import { currentUser } from "@clerk/nextjs/server";

async function fetchUserId() {
  console.log("Calling Clerk from server...");
  const user = await currentUser();
  if (!user) {
    console.error("No user found");
    return null;
  }
  console.log("User fetched from Clerk:", user);
  return user.id;
}

const Page = async () => {
  const getData = async () => {
    try {
      const userId = await fetchUserId();
      if (!userId) throw new Error("User ID is missing");
   
      const [topHits, topAlbums, newReleases, topGenres] = await Promise.all([
        fetchApi(getTopHits+`?id=${userId}`, Method.GET),
        fetchApi(getTopAlbums+`?id=${userId}`, Method.GET),
        fetchApi(music+`?id=${userId}`, Method.GET),
        fetchApi(getTopGenres+`?id=${userId}&limit=8`, Method.GET),
      ]);
  
      return { topHits, topAlbums, newReleases, topGenres };
    } catch (error) {
      console.error("Error fetching data on the server:", error);
      return { topHits: null, topAlbums: null, newReleases: null, topGenres: null };
    }
  };
  

  const data = await getData();

  return (
    <Browse
      initialData={{
        topHits: data.topHits,
        topAlbums: data.topAlbums,
        newReleases: data.newReleases,
        topGenres: data.topGenres,
      }}
    />
  );
};

export default Page;
