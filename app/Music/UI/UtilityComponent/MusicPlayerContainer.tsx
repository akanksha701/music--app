"use client";
import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import WaveSurfer from "wavesurfer.js";
import {
  setCurrentSongIndex,
  setCurrentTrack,
  setIsMuted,
  setIsPlaying,
  setSeekPercentage,
  togglePlay,
} from "@/Redux/features/musicPlayer/musicPlayerSlice";
import { handleLikeToggle } from "@/hooks/useLike";
import { useToggleLikeMutation } from "@/services/like";
import MusicPlayer from "./MusicPlayer";
import { formatTime, useMusic } from "@/hooks/useMusic";
import { IMusicProps, TAGS } from "@/app/(BrowsePage)/Browse/types/types";

const MusicPlayerContainer = () => {
  let newIndex: number;
  const dispatch = useDispatch();
  const wavesurferRef = useRef<any>(null);
  const [toggleLike] = useToggleLikeMutation();
  const { setCurrentTime, currentTime } = useMusic();
  const currentTrack = useSelector<RootState, IMusicProps | null>(
    (state) => state.musicPlayerSlice.currentTrack
  );
  const allSongs = useSelector<RootState, IMusicProps[]>(
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
  useEffect(() => {
    if (currentTrack) {
      if (!wavesurferRef.current) {
        const waveformElement = document.getElementById("waveform");
        if (waveformElement) {
          wavesurferRef.current = WaveSurfer.create({
            container: waveformElement,
            height: 33,
            waveColor: "#0f172a",
            progressColor: "#9333ea",
            barWidth: 3,
            barGap: 2,
            barRadius: 2,
            cursorColor: "transparent",
          });

          const url = currentTrack?.audioUrl || "";
          wavesurferRef.current.load(url);

          wavesurferRef.current.on("ready", () => {
            console.log("WaveSurfer is ready");
            if (isMuted) wavesurferRef.current.setVolume(0);
            wavesurferRef.current.setVolume(volume);
            wavesurferRef.current.play();
          });
        }
      }
    }

    return () => {
      if (
        wavesurferRef.current &&
        typeof wavesurferRef.current.destroy === "function"
      ) {
        wavesurferRef.current.destroy();
        wavesurferRef.current = null;
      }
    };
  }, [currentTrack?._id]);

  useEffect(() => {
    wavesurferRef?.current?.on("timeupdate", (time: number) => {
        dispatch(
          setSeekPercentage(
            (wavesurferRef?.current?.getCurrentTime() /
              wavesurferRef?.current?.getDuration()) *
              100
          )
        );
        dispatch(
          setCurrentTrack({
            ...currentTrack,
          })
        );
        setCurrentTime(time);
    });
  }, [isPlaying,currentTime,currentTrack?._id]);

  const handlePlayPause = useCallback(() => {
    if (wavesurferRef.current) {
      if (isPlaying) {
        wavesurferRef.current.pause();
      } else {
        wavesurferRef.current.play();
      }
      dispatch(togglePlay());
    }
  }, [isPlaying]);

  const handleLikeClick = async () => {
    if (currentTrack) {
      await handleLikeToggle(
        currentTrack._id as string,
        TAGS.MUSIC,
        toggleLike,
        currentTrack,
        dispatch
      );

      const updatedSongIndex = allSongs.findIndex(
        (song) => song._id === currentTrack._id
      );
      if (updatedSongIndex !== -1) {
        const updatedSong = {
          ...allSongs[updatedSongIndex],
          liked: !allSongs[updatedSongIndex].liked,
        };
        dispatch(setCurrentTrack(updatedSong));
      }
    }
  };

  const toggleMute = () => {
    dispatch(setIsMuted(!isMuted));
    if (wavesurferRef.current) {
      wavesurferRef.current.setVolume(isMuted ? volume : 0);
    }
  };

  const playSong = (direction: "next" | "prev") => {
    if (!currentTrack) return;
    const currentIndex = allSongs.findIndex(
      (song) => song._id === currentTrack._id
    );
    if (direction === "next") {
      newIndex = (currentIndex + 1) % allSongs.length;
    } else if (direction === "prev") {
      newIndex = (currentIndex - 1 + allSongs.length) % allSongs.length;
    }
    const newTrack = allSongs[newIndex];
    dispatch(setCurrentTrack(newTrack));
    dispatch(setCurrentSongIndex(newIndex));
  };

  const handlePlayTrack = (track: IMusicProps) =>
    dispatch(setCurrentTrack(track));

  if (!currentTrack?._id || selectedMusicIndex === null) {
    return null;
  }
  return (
    <MusicPlayer
      allSongs={allSongs}
      currentTrack={currentTrack}
      currentTime={formatTime(currentTime)}
      isPlaying={isPlaying}
      isMuted={isMuted}
      volume={volume}
      seekPercentage={seekPercentage}
      onMuteToggle={toggleMute}
      handlePlayPause={handlePlayPause}
      handleLikeClick={handleLikeClick}
      handlePlayTrack={handlePlayTrack}
      onNextSong={() => playSong("next")}
      onPreviousSong={() => playSong("prev")}
    />
  );
};

export default MusicPlayerContainer;
