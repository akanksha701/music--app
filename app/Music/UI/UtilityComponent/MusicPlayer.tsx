"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import PlayerButtons from "./PlayerButtons";
import PlayerLabel from "./PlayerLabel";
import WaveComp from "./WaveComp";
import { IMusicProps } from "@/app/(BrowsePage)/Browse/types/types";
import { generateUrl } from "@/utils/helpers";
import {
  setCurrentTime,
  setCurrentTrack,
  setIsPlaying,
  setSeekPercentage,
} from "@/Redux/features/musicPlayer/musicPlayerSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "@/app/loading";
import WaveSurfer from "wavesurfer.js";
import { formatTime } from "@/hooks/useWaveSurfer";

const MusicPlayer = () => {
  const dispatch = useDispatch();
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const waveSurferRef = useRef<WaveSurfer | null>(null);
  const currentTrack = useSelector(
    (state: any) => state?.musicPlayerSlice?.currentTrack
  );
  const currentTime = useSelector(
    (state: any) => state?.musicPlayerSlice?.currentTime
  );
  const seekPercentage = useSelector(
    (state: any) => state?.musicPlayerSlice?.seekPercentage
  );
  const volume = useSelector((state: any) => state?.musicPlayerSlice?.volume);
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

  if (!currentTrack) {
    return <Loading />;
  }
  return (
    <div className="w-full bg-black p-4 flex items-center space-x-4">
      <div className="flex-shrink-0">
        {/* <Image
          src={currentTrack?.imageUrl }
          alt="Track Image"
          width={80}
          height={80}
          className="rounded-md p-2"
        /> */}
      </div>
      <div className="flex-shrink-0 mr-3">
        <PlayerLabel
          title={currentTrack?.name || "Unknown Track"}
          artists={currentTrack?.artists || ""}
        />
      </div>
      <div className="flex items-center mx-3">
        <PlayerButtons
          isPlaying={isPlaying}
          handleClick={() => dispatch(setIsPlaying(!isPlaying))}
          playNextPrevious={playNextPrevious}
        />
      </div>
      <div className="flex items-center mx-3">
        <p className="text-small text-slate-600 bg-slate-300 rounded-md p-1">
          {formatTime(currentTime) || 0}
        </p>
      </div>
      <WaveComp
        seekPercentage={seekPercentage}
        ref={waveformRef}
        handleClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
          handleSeek(e)
        }
      />
    </div>
  );
};

export default MusicPlayer;
