"use client";

import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import WaveSurfer from "wavesurfer.js";
import { formatTime } from "@/hooks/useWaveSurfer";
import MusicPlayer from "./MusicPlayer";
import MusicList from "./MusicList";
import useFetchMusicData from "@/app/About/UI/UtilityComponent/useFetchMusicList";
import {
  setCurrentTime,
  setSeekPercentage,
  setIsPlaying,
} from "@/Redux/features/musicPlayer/musicPlayerSlice";
import Loading from "@/app/loading";

const MusicCard = () => {
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  const { data, name } = useFetchMusicData();
  const currentTrack = useSelector(
    (state: any) => state?.musicPlayerSlice?.currentTrack
  );
  const currentTime = useSelector((state: any) => state?.musicPlayerSlice?.currentTime);
  const seekPercentage = useSelector((state: any) => state?.musicPlayerSlice?.seekPercentage);
  const volume = useSelector((state: any) => state?.musicPlayerSlice?.volume);
  const isPlaying = useSelector((state: any) => state?.musicPlayerSlice?.isPlaying);
  const waveSurferRef = useRef<WaveSurfer | null>(null); // Keep a reference to WaveSurfer instance

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

      waveSurferRef.current = ws; // Store the WaveSurfer instance

      // Load the audio URL into WaveSurfer
      ws.load(currentTrack?.audioUrl);

      // Handle the audio progress
      ws.on("audioprocess", () => {
        dispatch(setCurrentTime(ws.getCurrentTime()));
        dispatch(setSeekPercentage((ws.getCurrentTime() / ws.getDuration()) * 100));
      });

      ws.on("finish", () => {
        dispatch(setIsPlaying(false));
      });

      ws.on("ready", () => {
        if (isPlaying) {
          ws.play(); 
        }
      });

      return () => {
        ws.destroy();
      };
    }
  }, [currentTrack]);

  useEffect(() => {
    const ws = waveSurferRef.current;
    if (ws) {
      if (isPlaying) {
        if (!ws.isPlaying()) {
          ws.play();
        }
      } else {
        if (ws.isPlaying()) {
          ws.pause(); 
        }
      }
    }
  }, [isPlaying]);

  const handleSeek = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const waveform = waveformRef.current;
    if (waveform) {
      const waveformWidth = waveform.offsetWidth;
      const clickX = e.clientX - waveform.getBoundingClientRect().left; 
      const newSeekPercentage = (clickX / waveformWidth) * 100;
      dispatch(setSeekPercentage(newSeekPercentage));
      const duration = currentTrack?.duration || 0;
      const newTime = (newSeekPercentage / 100) * duration;
      dispatch(setCurrentTime(newTime));
    }
  };

  if (!data || !currentTrack) {
    return <Loading />;
  }

  return (
    <div className="mx-4 sm:mx-10 my-10">
      <MusicList data={data || []} title={name || ""} />
      <MusicPlayer
        currentTrack={currentTrack}
        togglePlayPause={() => dispatch(setIsPlaying(!isPlaying))}
        isPlaying={isPlaying}
        handleTimeSeek={handleSeek}
        currentTime={formatTime(currentTime)}
        ref={waveformRef}
        seekPercentage={seekPercentage}
      />
    </div>
  );
};

export default MusicCard;
