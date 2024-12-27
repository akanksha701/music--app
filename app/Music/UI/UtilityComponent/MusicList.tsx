"use client";
import React from "react";
import { IMusicProps } from "@/app/(BrowsePage)/Browse/types/types";
import PlayerLabel from "./PlayerLabel";
import { IoAddSharp } from "react-icons/io5";
import { FaHeart, FaPause, FaPlay, FaRegHeart } from "react-icons/fa";
import { GoDownload } from "react-icons/go";
import { FiShoppingCart } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "next/navigation";
import { RootState } from "@/Redux/store";

const MusicList = ({
  data,
  handleLikeClick,
  handlePlayTrack,
}: {
  data: IMusicProps[];
  handleLikeClick: () => void;
  handlePlayTrack: (track: IMusicProps) => void;
}) => {
  const searchParams = useSearchParams();
  const listName = searchParams.get("type");
  const currentTrackId = useSelector<any, string | null>(
    (state) => state.musicPlayerSlice.currentTrack?._id
  );
  const isPlaying = useSelector<RootState, boolean>(
    (state) => state.musicPlayerSlice.isPlaying
  );
  const renderedTracks =
    data && data.length > 0 ? (
      data.map((track: IMusicProps) => (
        <div key={track._id} className="w-full p-2 flex flex-row items-center">
          <div className="flex flex-row items-center flex-1">
            <button
              className="border border-white rounded-full p-2 mx-2 my-2"
              onClick={() => handlePlayTrack(track)}
            >
              {currentTrackId === track._id && isPlaying ? (
                <FaPause size={12} color="white" />
              ) : (
                <FaPlay size={12} color="gray" />
              )}
            </button>

            <div className="text-left flex-1">
              <PlayerLabel
                title={track?.name || "Unknown Track"}
                artists={track?.artists || ""}
              />
            </div>

            <div
              key={`${track._id}`}
              id={`waveform_${track._id}`} // Use consistent ID format
              className="cursor-pointer  w-full sm:w-32 md:w-1/2 hidden md:block" // Hidden on mobile, block on md and larger
            ></div>

            <p className="text-xs text-slate-600 bg-transparent rounded-md my-2 ml-4 mx-5">
              {track?.duration || "0:00"}
            </p>

            {track?.liked ? (
              <FaHeart
                className="text-red-500 transition-colors duration-300"
                onClick={handleLikeClick}
              />
            ) : (
              <FaRegHeart
                className="text-red-500 transition-colors duration-300"
                onClick={handleLikeClick}
              />
            )}

            <IoAddSharp
              size={16}
              color="white"
              className="cursor-pointer mx-2"
            />
            <button className="bg-vivid-orange rounded-full p-1 mx-2">
              <GoDownload size={20} color="black" />
            </button>
            <FiShoppingCart
              size={16}
              color="white"
              className="cursor-pointer mx-2"
            />
          </div>
        </div>
      ))
    ) : (
      <p className="text-gray-400">No other data available</p>
    );

  return (
    <>
      <div className="bg-black">
        <h3 className="text-white text-2xl font-semibold mx-2 p-5">
          {listName}
        </h3>
        <hr className="w-full p-2 border-gray-600" />
        {renderedTracks}
      </div>
    </>
  );
};

export default MusicList;
