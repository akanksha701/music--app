"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import PlayerButtons from "./PlayerButtons";
import PlayerLabel from "./PlayerLabel";
import WaveComp from "./WaveComp";
import { IMusicProps, TAGS } from "@/app/(BrowsePage)/Browse/types/types";
import {
  setCurrentSongIndex,
  setCurrentTime,
  setCurrentTrack,
  setIsPlaying,
  setSeekPercentage,
  togglePlay,
} from "@/Redux/features/musicPlayer/musicPlayerSlice";
import { useDispatch, useSelector } from "react-redux";
import WaveSurfer from "wavesurfer.js";
import { formatTime } from "@/hooks/useWaveSurfer";
import { FiShoppingCart } from "react-icons/fi";
import { IoAddSharp } from "react-icons/io5";
import { GoDownload } from "react-icons/go";
import { FaHeart } from "react-icons/fa";
import { IoVolumeMediumSharp } from "react-icons/io5";
import { handleLikeToggle } from "@/hooks/useLike";
import { useToggleLikeMutation } from "@/services/like";
import useFetchMusicData from "@/app/About/UI/UtilityComponent/useFetchMusicList";
import { RootState } from "@/Redux/features/musicPlayer/types/types";

const MusicPlayer = () => {
  const dispatch = useDispatch();

  const waveformRef = useRef<HTMLDivElement | null>(null);
  const waveSurferRef = useRef<WaveSurfer | null>(null);

  const [toggleLike] = useToggleLikeMutation();

  const { data, error } = useFetchMusicData();

  const currentTrack = useSelector<RootState, IMusicProps | null>(
    (state) => state.musicPlayerSlice.currentTrack
  );

  const selectedMusicIndex = useSelector<RootState, number | null>(
    (state) => state.musicPlayerSlice.selectedMusicIndex
  );

  const currentTime = useSelector<RootState, number>(
    (state) => state.musicPlayerSlice.currentTime
  );

  const seekPercentage = useSelector<RootState, number>(
    (state) => state.musicPlayerSlice.seekPercentage
  );

  const isPlaying = useSelector<RootState, boolean>(
    (state) => state.musicPlayerSlice.isPlaying
  );

  const setupInitialWaveSurfer = (ws: WaveSurfer) => {
    waveSurferRef.current = ws;
    ws.load(currentTrack?.audioUrl as string);
    ws.on("audioprocess", () => {
      dispatch(setCurrentTime(ws.getCurrentTime()));
      dispatch(
        setSeekPercentage((ws.getCurrentTime() / ws.getDuration()) * 100)
      );
    });
    ws.on("finish", () => dispatch(setIsPlaying(false)));
    ws.on("ready", () => isPlaying && ws.play());
  };

  useEffect(() => {
    if (!currentTrack?.audioUrl || !waveformRef.current) return;

    const ws = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#C0C2C9",
      progressColor: "#b794f4",
      cursorColor: "#FFFFFF",
      barWidth: 3,
      height: 30,
    });

    setupInitialWaveSurfer(ws);

    return () => {
      if (waveSurferRef.current) {
        waveSurferRef.current.destroy();
        waveSurferRef.current = null;
      }
    };
  }, [currentTrack?.audioUrl]); 

  const handlePlayPause = () => {
    if (waveSurferRef.current) {
      const ws = waveSurferRef.current;
      if (isPlaying) {
        ws.pause();
      } else {
        ws.play();
      }
      dispatch(togglePlay());
    }
  };
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const waveform = waveformRef.current;
    if (waveform) {
      const clickX = e.clientX - waveform.getBoundingClientRect().left;
      const newSeekPercentage = (clickX / waveform.offsetWidth) * 100;
      dispatch(setSeekPercentage(newSeekPercentage));
      dispatch(setCurrentTime(newSeekPercentage));
    }
  };

  const handleLikeClick = async () => {
    if (currentTrack) {
      if (waveSurferRef.current) {
        handleLikeToggle(currentTrack?._id as string, TAGS.MUSIC, toggleLike,currentTrack,dispatch)
        dispatch(setCurrentTime(waveSurferRef.current.getCurrentTime()));
       
      }
    }
  };

  if (!currentTrack?._id || selectedMusicIndex === null) {
    return null;
  }
  return (
    <div className="w-full bg-black p-1 flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 gap-4 fixed bottom-0 left-0 z-50">
      <div className="w-20 h-20 mb-2 sm:mb-0 overflow-hidden">
        <Image
          src={currentTrack?.imageUrl || "/default-image.jpg"}
          alt="Track Image"
          width={80}
          height={80}
          className="rounded-md w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col sm:flex-row items-center flex-1 space-y-2 sm:space-y-0 sm:space-x-4">
        <div className="text-center sm:text-left flex-1">
          <PlayerLabel
            title={currentTrack?.name || "Unknown Track"}
            artists={currentTrack?.artists || ""}
          />
        </div>

        <PlayerButtons
          isPlaying={isPlaying}
          selectedMusicIndex={selectedMusicIndex}
          handlePlayPause={handlePlayPause}
          data={data}
        />

        <p className="text-small text-slate-600 bg-slate-300 rounded-md p-1">
          {formatTime(currentTime) || "0:00"}
        </p>
      </div>

      <WaveComp
        seekPercentage={seekPercentage}
        ref={waveformRef}
        handleClick={handleSeek}
      />

      <p className="text-small text-slate-600 bg-slate-300 rounded-md p-1">
        {formatTime(currentTrack?.duration as number) || "0:00"}
      </p>

      <div className="flex items-center justify-center space-x-4 mt-2">
        <IoVolumeMediumSharp size={24} color="white" />

        <FaHeart
          onClick={handleLikeClick}
          size={24}
          color={currentTrack.liked ? "red" : "white"}
          className="cursor-pointer"
        />

        <IoAddSharp size={24} color="white" className="cursor-pointer" />

        <button className="bg-yellow-500 rounded-full p-1">
          <GoDownload size={20} color="black" />
        </button>

        <FiShoppingCart size={24} color="white" className="cursor-pointer" />
      </div>
    </div>
  );
};

export default MusicPlayer;
