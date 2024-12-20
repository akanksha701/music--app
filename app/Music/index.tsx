"use client";
import React from "react";
import useFetchMusicData from "@/app/About/UI/UtilityComponent/useFetchMusicList";
import MusicList from "./UI/UtilityComponent/MusicList";

const Index = () => {
  const { data, name } = useFetchMusicData();

  return <MusicList data={data?.slice(0,3)} title={name} />;
};

export default Index;
