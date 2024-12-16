"use client";
import Image from "next/image";
import { useMusic } from "@/hooks/useMusic";
import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
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
import { useGetTopHitsMusicsQuery } from "@/services/like";

const MusicCard =  () => {
  const {
    currentTrack,
    isPlaying,
    volume,
    currentTime,
    setVolume,
    togglePlayPause,
  } = useMusic();

  const { data: topHits } = useGetTopHitsMusicsQuery(undefined, {
    skip: false,
  });

  const waveformRef = useRef<HTMLDivElement | null>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const [seekPercentage, setSeekPercentage] = useState(0);

  useEffect(() => {
    if (!topHits || !topHits.data.length || !currentTrack) return;

    const wavesurfer = WaveSurfer.create({
      container: waveformRef.current!,
      waveColor: "#1DB954",
      progressColor: "#1DB954",
      cursorColor: "#FFFFFF",
      barWidth: 3,
      height: 3,
    });

    wavesurferRef.current = wavesurfer;

    wavesurfer.load(currentTrack.audioUrl);

    wavesurfer.on("ready", () => {
      const trackDuration = wavesurfer.getDuration();
      console.log("Track loaded with duration:", trackDuration);
    });

    wavesurfer.on("audioprocess", () => {
      setSeekPercentage(
        (wavesurfer.getCurrentTime() / wavesurfer.getDuration()) * 100
      );
    });

    wavesurfer.on("finish", () => {
      togglePlayPause();
    });

    return () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
      }
    };
  }, [currentTrack, topHits]);

  useEffect(() => {
    if (wavesurferRef.current) {
      if (isPlaying) {
        wavesurferRef.current.play();
      } else {
        wavesurferRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handlePlayPause = () => {
    togglePlayPause();
  };

  const handleTimeSeek = (e: React.MouseEvent) => {
    const bar = e.currentTarget;
    const rect = bar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    if (wavesurferRef.current) {
      wavesurferRef.current.seekTo(percent);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volume = parseFloat(e.target.value);
    setVolume(volume);
    if (wavesurferRef.current) {
      wavesurferRef.current.setVolume(volume);
    }
  };

  const handleMuteToggle = () => {
    if (wavesurferRef.current) {
      if (wavesurferRef.current.getVolume() > 0) {
        wavesurferRef.current.setVolume(0);
        setVolume(0);
      } else {
        wavesurferRef.current.setVolume(0.5); // Default volume level
        setVolume(0.5);
      }
    }
  };

  if (!topHits || !topHits?.data) {
    return null;
  }

  return (
    <div className="mx-4 sm:mx-10 my-10">
      <MusicList tracks={topHits.data} />

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
            onClick={handlePlayPause}
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
          onClick={handlePlayPause}
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
          {currentTime} / {currentTrack?.duration || 0}
        </span>
      </div>
    </div>
  );
};

export default MusicCard;
