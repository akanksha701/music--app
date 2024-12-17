"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import PlayerButtons from "./PlayerButtons";
import PlayerLabel from "./PlayerLabel";
import WaveComp from "./WaveComp";
import { IMusicProps, TAGS } from "@/app/(BrowsePage)/Browse/types/types";
import { generateUrl } from "@/utils/helpers";
import {
  setCurrentTime,
  setCurrentTrack,
  setIsPlaying,
  setSeekPercentage,
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

const MusicPlayer = () => {
  const dispatch = useDispatch();
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const waveSurferRef = useRef<WaveSurfer | null>(null);
  const [toggleLike] = useToggleLikeMutation();

  const currentTrack = useSelector(
    (state: any) => state?.musicPlayerSlice?.currentTrack
  );
  const currentTime = useSelector(
    (state: any) => state?.musicPlayerSlice?.currentTime
  );
  const seekPercentage = useSelector(
    (state: any) => state?.musicPlayerSlice?.seekPercentage
  );
  const isPlaying = useSelector(
    (state: any) => state?.musicPlayerSlice?.isPlaying
  );

  const playNextPrevious = async (music: IMusicProps) => {
    const url = await generateUrl("/Music", {
      name: music.name,
      id: music._id,
    });
    dispatch(setCurrentTrack(music));
  };

  useEffect(() => {
    if (currentTrack?.audioUrl && waveformRef.current) {
      const ws = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#C0C2C9",
        progressColor: "#b794f4",
        cursorColor: "#FFFFFF",
        barWidth: 3,
        height: 30,
      });

      waveSurferRef.current = ws;
      ws.load(currentTrack?.audioUrl);
      ws.on("audioprocess", () => {
        dispatch(setCurrentTime(ws.getCurrentTime()));
        dispatch(
          setSeekPercentage((ws.getCurrentTime() / ws.getDuration()) * 100)
        );
      });

      ws.on("finish", () => dispatch(setIsPlaying(false)));
      ws.on("ready", () => isPlaying && ws.play());

      return () => ws.destroy();
    }
  }, [currentTrack]);

  useEffect(() => {
    const ws = waveSurferRef.current;
    if (ws) {
      isPlaying ? !ws.isPlaying() && ws.play() : ws.isPlaying() && ws.pause();
    }
  }, [isPlaying]);

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
    await handleLikeToggle(currentTrack._id, TAGS.MUSIC, toggleLike);
    if (waveSurferRef.current) {
      dispatch(setCurrentTime(waveSurferRef.current.getCurrentTime()));
    }
  };
const getSelectedMusicDetails = async()=>
{
  
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
          handleClick={() => dispatch(setIsPlaying(!isPlaying))}
          playNextPrevious={playNextPrevious}
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
        {formatTime(currentTrack?.duration) || "0:00"}
      </p>

      <div className="flex items-center justify-center space-x-4 mt-2">
        <IoVolumeMediumSharp size={24} color="white" />
        
        {/* Updated FaHeart click handler */}
        <FaHeart 
          onClick={handleLikeClick} 
          size={24} 
          color={currentTrack.liked ? 'red' : 'white'} 
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
