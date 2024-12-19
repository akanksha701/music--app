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
import { IoVolumeMuteSharp, IoVolumeLowSharp, IoVolumeMediumSharp, IoVolumeHighSharp } from "react-icons/io5"; // Import volume icons
import { handleLikeToggle } from "@/hooks/useLike";
import { useToggleLikeMutation } from "@/services/like";
import useFetchMusicData from "@/app/About/UI/UtilityComponent/useFetchMusicList";
import { RootState } from "@/Redux/features/musicPlayer/types/types";

const MusicPlayer = () => {
  const dispatch = useDispatch();
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const waveSurferRef = useRef<WaveSurfer | null>(null);
  
  const [volume, setVolume] = useState(1); // Volume state (0.0 to 1.0)
  const [isMuted, setIsMuted] = useState(false); // Mute state
  
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
    ws.setVolume(isMuted ? 0 : volume); // Set initial volume based on mute state

    ws.on("audioprocess", () => {
      const current = ws.getCurrentTime();
      const duration = ws.getDuration();

      dispatch(setCurrentTime(current));
      dispatch(setSeekPercentage((current / duration) * 100));
    });

    ws.on("finish", () => {
      dispatch(setIsPlaying(false)); // Stop music on finish
    });

    ws.on("ready", () => {
      if (isPlaying) ws.play(); // Play if it's already set to playing
    });
  };

  // When current track changes, create new waveSurfer instance
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
  }, [currentTrack?._id]);

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
      isPlaying
        ? waveSurferRef?.current?.play()
        : waveSurferRef?.current?.pause();
    }
  };

  const handleLikeClick = async () => {
    if (currentTrack) {
      if (waveSurferRef.current) {
        handleLikeToggle(
          currentTrack?._id as string,
          TAGS.MUSIC,
          toggleLike,
          currentTrack,
          dispatch
        );
        dispatch(setCurrentTime(waveSurferRef.current.getCurrentTime()));
      }
    }
  };

   

   const toggleMute = () => {
     setIsMuted((prevMute) => !prevMute);
     if (waveSurferRef.current) {
       waveSurferRef.current.setVolume(isMuted ? volume : 0); // Set volume to current level or mute
     }
   };

   const renderVolumeIcon = () => {
     if (isMuted || volume === 0) return <IoVolumeMuteSharp size={24} color="white" onClick={toggleMute} />;
     if (volume < 0.5) return <IoVolumeLowSharp size={24} color="white" onClick={toggleMute} />;
     if (volume < 1) return <IoVolumeMediumSharp size={24} color="white" onClick={toggleMute} />;
     return <IoVolumeHighSharp size={24} color="white" onClick={toggleMute} />;
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
           {formatTime(currentTime) || "0:00"}
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
           {/* Render Volume Icon */}
           {renderVolumeIcon()}
           
           <div className="flex flex-row mx-20  ">
             <FaHeart
               onClick={handleLikeClick}
               size={24}
               color={currentTrack.liked ? "red" : "white"}
               className="cursor-pointer mx-2"
             />
             <IoAddSharp size={24} color="white" className="cursor-pointer mx-2" />
             <button className="bg-yellow-500 rounded-full p-1 mx-2">
               <GoDownload size={20} color="black" />
             </button>
             <FiShoppingCart size={24} color="white" className="cursor-pointer mx-2" />
           </div>
         </div>
       </div>
     </div>
   );
};

export default MusicPlayer;
