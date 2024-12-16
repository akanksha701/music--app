"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaForward,
  FaBackward,
  FaHeart,
} from "react-icons/fa";
import MusicList from "./MusicList";
import useFetchMusicData from "@/app/About/UI/UtilityComponent/useFetchMusicList";
import { formatTime, useWaveSurfer } from "@/hooks/useWaveSurfer";
import { useMusic } from "@/hooks/useMusic";

const MusicCard = () => {
  const {
    isPlaying,
    volume,
    currentTime,
    seekPercentage,
    initWaveSurfer,
    togglePlayPause,
    setVolume,
    seekTo,
  } = useWaveSurfer();
  const { currentTrack, setCurrentTrack } = useMusic();
  const { data, name, error } = useFetchMusicData();
  const waveformRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (currentTrack?.audioUrl && waveformRef.current) {
      initWaveSurfer(waveformRef.current, currentTrack.audioUrl);
    }
  }, [currentTrack, initWaveSurfer]);

  // Handle seeking to a specific time in the audio
  const handleTimeSeek = (e: React.MouseEvent) => {
    const bar = e.currentTarget;
    const rect = bar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    seekTo(percent);
  };

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volume = parseFloat(e.target.value);
    setVolume(volume);
  };

  // Handle mute toggle
  const handleMuteToggle = () => {
    setVolume(volume === 0 ? 0.5 : 0);
  };

  if (!data) {
    return null;
  }

  return (
    <div className="mx-4 sm:mx-10 my-10">
      <MusicList data={data.data} title={name || ""} />

      <div className="w-full bg-black-100 text-white rounded-2xl shadow-lg p-4 space-y-6">
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-shrink-0">
            <Image
              src={currentTrack?.imageUrl || "/default-image.jpg"}
              alt="Track Image"
              width={100}
              height={100}
              className="rounded-md"
            />
          </div>
          <div className="flex-1">
            <p className="text-black text-sm">
              {currentTrack?.name || "No Track Selected"}
            </p>
            <p className="text-gray-400 text-xs">
              {currentTrack?.artists || "Unknown Artist"}
            </p>
          </div>
          <button
            onClick={togglePlayPause}
            className="p-2 bg-green-500 text-black rounded-full hover:bg-green-600 transition duration-300"
          >
            {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
          </button>
        </div>

        <div className="mt-6">
          <div
            ref={waveformRef}
            className="cursor-pointer bg-gray-800 mb-4 rounded-lg"
            style={{ height: "3px" }}
            onClick={handleTimeSeek}
          ></div>
          <div className="relative">
            <div
              className="h-1 bg-gray-600 rounded-lg"
              style={{
                width: `${seekPercentage}%`,
                backgroundColor: "#1DB954",
              }}
            ></div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mt-4">
        <button className="p-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition duration-300">
          <FaBackward size={20} />
        </button>

        <button
          onClick={togglePlayPause}
          className="p-6 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-300"
        >
          {isPlaying ? <FaPause size={28} /> : <FaPlay size={28} />}
        </button>

        <button className="p-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition duration-300">
          <FaForward size={20} />
        </button>

        <button
          className={`p-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition duration-300`}
        >
          <FaHeart size={20} />
        </button>

        <div className="flex items-center space-x-4">
          <button
            onClick={handleMuteToggle}
            className="p-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition duration-300"
          >
            {volume === 0 ? (
              <FaVolumeMute size={20} />
            ) : (
              <FaVolumeUp size={20} />
            )}
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24"
          />
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <span className="text-gray-400 text-lg">
          {formatTime(currentTime)} / {currentTrack?.duration || 0}
        </span>
      </div>
    </div>
  );
};

export default MusicCard;
