"use client";
import React from "react";
import { TbHistory } from "react-icons/tb";
import { CgMusicNote } from "react-icons/cg";
import { BiSolidAlbum } from "react-icons/bi";
import { MdPodcasts } from "react-icons/md";
import { PiMicrophoneStageLight } from "react-icons/pi";
import { Button } from "@/components/ui/button";
import { GoPlus } from "react-icons/go";
import { redirect } from "next/navigation";
const Browse = [
  { name: "New Releases", label: "NewRelease" },
  { name: "Top Charts", label: "TopCharts" },
  { name: "Top Playlists", label: "TopPlaylists" },
  { name: "Podcasts", label: "Podcasts" },
  { name: "Top Artists", label: "TopArtists" },
  { name: "Radio", label: "Radio" },
];
const Library = [
  { name: "History", icon: <TbHistory size={25} /> },
  { name: "Liked Songs", icon: <CgMusicNote size={25} /> },
  { name: "Albums", icon: <BiSolidAlbum size={25} /> },
  { name: "Podcasts", icon: <MdPodcasts size={25} /> },
  { name: "Artists", icon: <PiMicrophoneStageLight size={25} /> },
];
const Sidebar = () => {
  return (
    <div className="lg:flex flex-col  p-8 sm:flex flex-col items-center justify-items-center">
      <div className="my-2">
        <p className="text-slate-500">Browse</p>
        {Browse.map((item, index) => (
          <div key={index} className="hover:text-slate-600">
            <p
              onClick={() => redirect(item.label)}
              className="cursor-pointer font-light my-2"
            >
              {item.name}
            </p>
          </div>
        ))}
      </div>
      <div className="my-2">
        <p className="text-slate-500">Library</p>
        {Library.map((item, index) => (
          <div key={index} className="flex items-center my-2">
            {item.icon}
            <span className="ml-2">
              <p className="cursor-pointer font-light">{item.name}</p>
            </span>
          </div>
        ))}
      </div>
      <Button className="border-1  border-purple-400 text-purple-400 rounded-full hover:bg-purple-400 hover:text-white">
        <GoPlus size={50} /> New PlayList
      </Button>
    </div>
  );
};

export default Sidebar;
