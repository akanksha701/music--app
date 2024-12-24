"use client";
import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import WaveSurfer from "wavesurfer.js";
import {
  setCurrentTrack,
  setIsMuted,
  setSeekPercentage,
  togglePlay,
} from "@/Redux/features/musicPlayer/musicPlayerSlice";
import { handleLikeToggle } from "@/hooks/useLike";
import { useToggleLikeMutation } from "@/services/like";
import MusicPlayer from "./MusicPlayer";
import { useMusic } from "@/hooks/useMusic";

const MusicPlayerContainer = () => {
  const dispatch = useDispatch();

  const [toggleLike] = useToggleLikeMutation();
  const { setCurrentTime, currentTime } = useMusic();
  const currentTrack = useSelector<RootState, any | null>(
    (state) => state.musicPlayerSlice.currentTrack
  );
  const allSongs = useSelector<RootState, any[]>(
    (state) => state.musicPlayerSlice.currentList
  );
  const volume = useSelector<RootState, number>(
    (state) => state.musicPlayerSlice.volume
  );
  const isMuted = useSelector<RootState, boolean>(
    (state) => state.musicPlayerSlice.isMuted
  );
  const seekPercentage = useSelector<RootState, number>(
    (state) => state.musicPlayerSlice.seekPercentage
  );
  const isPlaying = useSelector<RootState, boolean>(
    (state) => state.musicPlayerSlice.isPlaying
  );
  const selectedMusicIndex = useSelector<RootState, number | null>(
    (state) => state.musicPlayerSlice.selectedMusicIndex
  );
  
  const wavesurferRef = useRef<any>(null);

  useEffect(() => {
    if (currentTrack) {
      if (!wavesurferRef.current) {
        const waveformElement = document.getElementById("waveform");
        if (waveformElement) {
          wavesurferRef.current = WaveSurfer.create({
            container: waveformElement,
            height: 33,
            waveColor: "#716F6B",
            progressColor: "#F6A400",
            barWidth: 3,
            barGap: 2,
            barRadius: 2,
            cursorColor: "transparent",
          });

          const url = currentTrack?.audioUrl || ""; // Assuming audioUrl is the URL to the track
          wavesurferRef.current.load(url);

          wavesurferRef.current.on("ready", () => {
            console.log("WaveSurfer is ready");
            if (isMuted) wavesurferRef.current.setVolume(0);
            wavesurferRef.current.setVolume(volume);
            wavesurferRef.current.play();
          });

          wavesurferRef.current.on("timeupdate", (time:any) => {
            dispatch(
              setSeekPercentage(
                (wavesurferRef.current.getCurrentTime() /
                  wavesurferRef.current.getDuration()) *
                  100
              )
            );
            dispatch(
              setCurrentTrack({
                ...currentTrack,
                // wavesurfer: wavesurferRef.current,
              })
            );
            setCurrentTime(time);
          });
        }
      }
    }

    return () => {
      if (wavesurferRef.current && typeof wavesurferRef.current.destroy === 'function') {
        wavesurferRef.current.destroy();
        wavesurferRef.current = null; // Clear reference after destruction
      }
    };
    
  }, [currentTrack?._id, isPlaying, isMuted, volume]); // Dependencies

  // Handle Play/Pause state updates outside of render cycle
  const handlePlayPause = useCallback(() => {
    if (wavesurferRef.current) {
      if (isPlaying) {
        wavesurferRef.current.pause();
      } else {
        wavesurferRef.current.play();
      }
      dispatch(togglePlay());
    }
  }, [dispatch, isPlaying]);

  // Handle Like button click
  const handleLikeClick = async () => {
    if (currentTrack) {
      handleLikeToggle(
        currentTrack._id,
        "MUSIC",
        toggleLike,
        currentTrack,
        dispatch
      );
    }
  };

  // Handle mute toggle
  const toggleMute = () => {
    dispatch(setIsMuted(!isMuted));
    if (wavesurferRef.current) {
      wavesurferRef.current.setVolume(isMuted ? volume : 0);
    }
  };

  if (!currentTrack?._id || selectedMusicIndex === null) {
    return null;
  }

  return (
    <MusicPlayer
      allSongs={allSongs}
      currentTrack={currentTrack}
      isPlaying={isPlaying}
      isMuted={isMuted}
      volume={volume}
      seekPercentage={seekPercentage}
      onPlayPause={handlePlayPause}
      onLikeClick={handleLikeClick}
      onMuteToggle={toggleMute}
    />
  );
};

export default MusicPlayerContainer;
