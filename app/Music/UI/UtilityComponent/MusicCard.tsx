"use client";
import React from "react";
import MusicList from "./MusicList";
import useFetchMusicData from "@/app/About/UI/UtilityComponent/useFetchMusicList";

const MusicCard = () => {
  const { data, name } = useFetchMusicData();

  return (
    <div className="mx-4 sm:mx-10 my-10">
      <MusicList data={data} title={name} />
    </div>
  );
};

export default MusicCard;
