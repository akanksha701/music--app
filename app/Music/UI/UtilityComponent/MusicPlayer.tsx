"use client";
import React from "react";
import Image from "next/image";
import PlayerButtons from "./PlayerButtons";
import PlayerLabel from "./PlayerLabel";
import WaveComp from "./WaveComp";
import { IMusicProps, TAGS } from "@/app/(BrowsePage)/Browse/types/types";
import {
  setIsMuted,
  setIsPlaying,
  setSeekPercentage,
  togglePlay,
} from "@/Redux/features/musicPlayer/musicPlayerSlice";
import { useDispatch, useSelector } from "react-redux";
import { FiShoppingCart } from "react-icons/fi";
import { IoAddSharp } from "react-icons/io5";
import { GoDownload } from "react-icons/go";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { handleLikeToggle } from "@/hooks/useLike";
import { useToggleLikeMutation } from "@/services/like";
import useFetchMusicData from "@/app/About/UI/UtilityComponent/useFetchMusicList";
import { RootState } from "@/Redux/features/musicPlayer/types/types";
import { useMusic } from "@/hooks/useMusic";
import VolumeIcon from "./VolumeIcon";
import useWaveSurfer from "@/hooks/customHooks/useWaveSurfer";

const MusicPlayer = () => {
  const dispatch = useDispatch();
  const { currentTime, setCurrentTime } = useMusic();
  const [toggleLike] = useToggleLikeMutation();
  const { data } = useFetchMusicData();

  const volume = useSelector<RootState, number>(
    (state) => state?.musicPlayerSlice?.volume
  );

  const isMuted = useSelector<RootState, boolean>(
    (state) => state?.musicPlayerSlice?.isMuted
  );

  const currentTrack = useSelector<RootState, IMusicProps | null>(
    (state) => state.musicPlayerSlice.currentTrack
  );

  const selectedMusicIndex = useSelector<RootState, number | null>(
    (state) => state.musicPlayerSlice.selectedMusicIndex
  );

  const seekPercentage = useSelector<RootState, number>(
    (state) => state.musicPlayerSlice.seekPercentage
  );

  const isPlaying = useSelector<RootState, boolean>(
    (state) => state.musicPlayerSlice.isPlaying
  );

  // Use the custom hook for WaveSurfer
  const { waveformRef, waveSurfer } = useWaveSurfer(
    currentTrack?.audioUrl || "",
    isPlaying,
    isMuted ? 0 : volume,
    setCurrentTime,
    () => dispatch(setSeekPercentage(0)),
    () => dispatch(setIsPlaying(false)) // Handle finish event
  );

  const handlePlayPause = () => {
    if (waveSurfer.current) {
      if (isPlaying) {
        waveSurfer.current.pause();
      } else {
        waveSurfer.current.play();
      }
      dispatch(togglePlay());
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (waveformRef.current && waveSurfer.current) {
      const clickX =
        e.clientX - waveformRef.current.getBoundingClientRect().left;
      const newSeekPercentage =
        (clickX / waveformRef.current.offsetWidth) * 100;
      dispatch(setSeekPercentage(newSeekPercentage));
      setCurrentTime(newSeekPercentage);

      if (isPlaying) {
        waveSurfer.current.play();
      }
    }
  };

  const handleLikeClick = async () => {
    // Implement like handling logic here
    if (currentTrack) {
      handleLikeToggle(
        currentTrack._id as string,
        TAGS.MUSIC,
        toggleLike,
        currentTrack,
        dispatch
      );
      setCurrentTime(waveSurfer.current?.getCurrentTime());
    }
  };

  const toggleMute = () => {
    dispatch(setIsMuted(!isMuted));
    if (waveSurfer.current) {
      waveSurfer.current.setVolume(isMuted ? volume : 0);
    }
  };
  if (!currentTrack?._id || selectedMusicIndex === null) {
    return null;
  }

  return (
    <div className="w-full bg-black p-2 flex flex-row items-center justify-between gap-4 fixed bottom-0 left-0 z-50">
      <div className="w-10 h-10 mb-2 sm:mb-0 overflow-hidden">
        <Image
          src={currentTrack?.imageUrl || "/default-image.jpg"}
          alt="Track Image"
          width={80}
          height={80}
          className="rounded-md w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-row items-center flex-1 space-x-4">
        <div className="text-left ">
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
          {currentTime  || "0:00"}
        </p>

        <WaveComp
          seekPercentage={seekPercentage}
          ref={waveformRef}
          handleClick={handleSeek}
        />

        <p className="text-small text-slate-600 bg-slate-300 rounded-md p-1">
          {currentTrack?.duration || "0:00"}
        </p>

        <div className="flex flex-row items-center mt-2">
          <VolumeIcon isMuted={isMuted} handleClick={toggleMute} />
          <div className="flex flex-row mx-20 ">
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
              className="cursor-pointer mx-2 text-gray-500 "
            />
            <button className="bg-yellow-500 rounded-full p-1 mx-2">
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
