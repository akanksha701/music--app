"use client";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import WaveSurfer from "wavesurfer.js";
import {
  setCurrentTrack,
  setCurrentSongIndex,
  setIsMuted,
  setIsPlaying,
  setSeekPercentage,
  togglePlay,
  setWavesurferRef,
  clearWavesurferRef,
} from "@/Redux/features/musicPlayer/musicPlayerSlice";
import { handleLikeToggle } from "@/hooks/useLike";
import { useToggleLikeMutation } from "@/services/like";
import MusicPlayer from "./MusicPlayer";
import { formatTime, useMusic } from "@/hooks/useMusic";
import { IMusicProps, TAGS } from "@/app/(BrowsePage)/Browse/types/types";
import { useFetchAudioPeaksQuery } from "@/services/audio";

const MusicPlayerContainer = () => {
  let newIndex: number;
  const dispatch = useDispatch();
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
  const wavesurferRef = useSelector<RootState, any>(
    (state) => state.musicPlayerSlice.wavesurferRef
  );
  const selectedMusicIndex = useSelector<RootState, number | null>(
    (state) => state.musicPlayerSlice.selectedMusicIndex
  );
  const [toggleLike] = useToggleLikeMutation();
  const {
    data: audioPeaksData,
    error,
    isLoading,
  } = currentTrack
    ? useFetchAudioPeaksQuery(currentTrack.audioUrl as string)
    : { data: null, error: null, isLoading: false };
  const createWaveSurfer = async () => {
    const waveformElement = document.getElementById("waveform");
    if (waveformElement && currentTrack) {
      console.log("audioPeaksData", audioPeaksData);
      const ws = WaveSurfer.create({
        container: waveformElement,
        width: 600,
        height: 33,
        waveColor: "#abb6c1",
        progressColor: "#5a17dd",
        barRadius: 200,
        cursorColor: "transparent",
        url: currentTrack?.audioUrl,
        peaks: audioPeaksData?.data,
      });

      ws.on("ready", () => {
        dispatch(setIsPlaying(true));
        if (isMuted) ws.setVolume(0);
        ws.setVolume(volume);
        ws.play();
        dispatch(setWavesurferRef(ws));
      });
    }
  };

  const playerProgress = () => {
    if (wavesurferRef) {
      wavesurferRef.on("timeupdate", (time: number) => {
        dispatch(
          setSeekPercentage(
            (wavesurferRef.getCurrentTime() / wavesurferRef.getDuration()) * 100
          )
        );
        setCurrentTime(time);
      });
    }
  };

  useEffect(() => {
    if (currentTrack) {
      // Clear existing wavesurferRef before creating a new one
      if (wavesurferRef) {
        wavesurferRef.destroy();
        dispatch(clearWavesurferRef());
      }

      // Create a new wavesurferRef
      createWaveSurfer();
    }

    return () => {
      // Clean up when component unmounts or currentTrack changes
      if (wavesurferRef) {
        wavesurferRef.destroy();
        dispatch(clearWavesurferRef());
      }
    };
  }, [currentTrack?._id]); // Only re-run when currentTrack._id changes

  useEffect(() => {
    playerProgress();
  }, [wavesurferRef]);

  useEffect(() => {
    if (isPlaying && wavesurferRef) {
      wavesurferRef.play();
    } else if (!isPlaying && wavesurferRef) {
      wavesurferRef.pause();
    }
  }, [isPlaying]);

  const handlePlayPause = useCallback(() => {
    if (wavesurferRef) {
      if (isPlaying) {
        wavesurferRef.pause();
      } else {
        wavesurferRef.play();
      }
      dispatch(togglePlay());
    }
  }, [isPlaying, wavesurferRef]);

  const handleLikeClick = async () => {
    if (currentTrack) {
      await handleLikeToggle(
        currentTrack._id as string,
        TAGS.MUSIC,
        toggleLike,
        currentTrack,
        dispatch
      );

      dispatch(
        setCurrentTrack({
          ...currentTrack,
          liked: !currentTrack.liked,
        })
      );
    }
  };

  const toggleMute = () => {
    dispatch(setIsMuted(!isMuted));
    if (wavesurferRef) {
      wavesurferRef.setVolume(isMuted ? volume : 0);
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
