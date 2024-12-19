"use client";
import React from "react";
import MusicList from "./MusicList";
import useFetchMusicData from "@/app/About/UI/UtilityComponent/useFetchMusicList";

const MusicCard = () => {
  const { data, name } = useFetchMusicData();

  return (
      <MusicList data={data} title={name} />
  );
};

export default MusicCard;
