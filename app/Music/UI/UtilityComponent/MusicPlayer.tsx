"use client";
import React from "react";
import {
  FaBackward,
  FaForward,
  FaHeart,
  FaPause,
  FaPlay,
  FaRegHeart,
} from "react-icons/fa";
import { IoAddSharp } from "react-icons/io5";
import { GoDownload } from "react-icons/go";
import { FiShoppingCart } from "react-icons/fi";
import VolumeIcon from "./VolumeIcon";
import PlayerLabel from "./PlayerLabel";
import Image from "next/image";
import { IMusicPlayerProps } from "../../types/types";
const MusicPlayer = ({
  currentTrack,
  isMuted,
  handleLikeClick,
  onMuteToggle,
  currentTime,
  isPlaying,
  handlePlayPause,
  onNextSong,
  onPreviousSong,
  handlePlayTrack
}: IMusicPlayerProps) => {
  return (
    <div className="w-full bg-black p-2 flex flex-row items-center justify-between gap-4 fixed bottom-0 left-0 z-50">
      <div className="flex flex-row items-center flex-1 space-x-4">
        <div className="flex-shrink-0">
          <Image
            src={currentTrack?.imageUrl || "/default-image.jpg"}
            alt="Track Image"
            width={80}
            height={80}
            className="rounded-md p-2"
          />
        </div>
        <div className="text-left">
          <PlayerLabel
            title={currentTrack?.name || "Unknown Track"}
            artists={currentTrack?.artists || ""}
          />
        </div>
        <div className="flex items-center mx-3">
          <FaBackward size={20} color="white" onClick={onPreviousSong} />
          <div className="cursor-pointer mx-3">
            {isPlaying ? (
              <FaPause size={20} color="white" onClick={handlePlayPause} />
            ) : (
              <FaPlay size={20} color="white" onClick={handlePlayPause} />
            )}
          </div>
          <FaForward size={20} color="white" onClick={onNextSong} />
        </div>
        <p className="text-small text-slate-600 bg-slate-300 rounded-md p-1">
          {currentTime || "0:00"}
        </p>

        <div
          key={currentTrack?._id}
          id="waveform"
          className="cursor-pointer mx-4 rounded-lg w-1/2 h-50"
        ></div>

        <p className="text-small text-slate-600 bg-slate-300 rounded-md p-1">
          {currentTrack?.duration ? currentTrack.duration : "0:00"}
        </p>

        <div className="flex flex-row items-center mt-2">
          <VolumeIcon isMuted={isMuted} handleClick={onMuteToggle} />
          <div className="flex flex-row mx-20">
            {currentTrack.liked ? (
              <FaHeart
                size={24}
                onClick={handleLikeClick}
                className="text-red-500 cursor-pointer mx-2 transition-colors duration-300"
              />
            ) : (
              <FaRegHeart
                size={24}
                onClick={handleLikeClick}
                className="text-white cursor-pointer mx-2 transition-colors duration-300"
              />
            )}
            <IoAddSharp
              size={24}
              color="white"
              className="cursor-pointer mx-2 text-gray-500"
            />
            <button className="bg-vivid-orange rounded-full p-1 mx-2">
              <GoDownload size={20} color="black" />
            </button>
            <FiShoppingCart
              size={24}
              color="white"
              className="cursor-pointer mx-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
