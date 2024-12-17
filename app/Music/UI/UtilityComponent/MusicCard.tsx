"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
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
import WaveSurfer from "wavesurfer.js";
import { formatTime, useWaveSurfer } from "@/hooks/useWaveSurfer";
import { useMusic } from "@/hooks/useMusic";
import useFetchMusicData from "@/app/About/UI/UtilityComponent/useFetchMusicList";
import MusicPlayer from "./MusicPlayer";

const MusicCard = () => {
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const { data, name } = useFetchMusicData();
  const { currentTrack } = useMusic();
  const {
    wavesurfer,
    setWavesurfer,
    currentTime,
    setCurrentTime,
    seekPercentage,
    setSeekPercentage,
    handleVolumeChange,
    volume,
    isPlaying,
    setIsPlaying,
    handleTimeSeek,
    handleMuteToggle,
    togglePlayPause,
  } = useWaveSurfer();

  useEffect(() => {
    if (currentTrack?.audioUrl && waveformRef.current) {
      const ws = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#1DB954",
        progressColor: "#1DB954",
        cursorColor: "#FFFFFF",
        barWidth: 3,
        height: 30,
      });

      ws.load(currentTrack.audioUrl);

      ws.on("audioprocess", () => {
        setCurrentTime(ws.getCurrentTime());
        setSeekPercentage((ws.getCurrentTime() / ws.getDuration()) * 100);
      });

      ws.on("finish", () => {
        setIsPlaying(false);
      });
      ws.on("ready", () => {
        if (!ws.isPlaying()) {
          ws.play();
          setIsPlaying(true);
        }
      });
      setWavesurfer(ws);
      return () => {
        ws?.destroy();
        setWavesurfer(null);
      };
    }
  }, [currentTrack]);

  if (!currentTrack) {
    return null;
  }

  return (
    <div className="mx-4 sm:mx-10 my-10">
      <MusicList data={data} title={name || ""} />
      <MusicPlayer
        currentTrack={currentTrack}
        ref={waveformRef} // Pass the ref for waveform rendering
        togglePlayPause={togglePlayPause}
        isPlaying={isPlaying}
        handleTimeSeek={handleTimeSeek}
        currentTime={formatTime(currentTime)}
      />
    </div>
  );
};

export default MusicCard;
