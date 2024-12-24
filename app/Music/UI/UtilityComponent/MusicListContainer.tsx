"use client";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTrack } from "@/Redux/features/musicPlayer/musicPlayerSlice";
import WaveSurfer from "wavesurfer.js";
import MusicList from "./MusicList";
import { RootState } from "@/Redux/store";
import { useMusic } from "@/hooks/useMusic";
import { handleLikeToggle } from "@/hooks/useLike";
import { useToggleLikeMutation } from "@/services/like";
import { IMusicProps, TAGS } from "@/app/(BrowsePage)/Browse/types/types";

const MusicListContainer = () => {
  const dispatch = useDispatch();
  const hasMounted = useRef(false);
  const currentTrack = useSelector<RootState, any | null>(
    (state) => state.musicPlayerSlice.currentTrack
  );
  const allSongs = useSelector<RootState, any[]>(
    (state) => state.musicPlayerSlice.currentList
  );
  const { currentTime, setCurrentTime } = useMusic();
  const wavesurferRefs = useRef<Map<string, any>>(new Map());
  const [waveSurferInstances, setWaveSurferInstances] = useState<any[]>([]);
  const [toggleLike] = useToggleLikeMutation();

  const createWaveSurfers = (songs: any[]) => {
    if (songs && songs.length > 0) {
      const instances = songs.map((song) => {
        const waveformContainerId = `waveform_${song?._id}`;
        const waveformContainer = document.getElementById(waveformContainerId);

        if (!waveformContainer) return null;

        if (!wavesurferRefs.current.has(song._id)) {
          const wavesurfer = WaveSurfer.create({
            container: `#${waveformContainerId}`,
            width: 383,
            height: 33,
            barWidth: 3,
            barGap: 2,
            barRadius: 2,
            waveColor: "#0f172a",
            progressColor: "#9333ea",
            cursorColor: "transparent",
          });

          if (song?.audioUrl) {
            wavesurfer.load(song.audioUrl);
          }

          wavesurferRefs.current.set(song._id, wavesurfer);

          wavesurfer.on("interaction", () => {
            const wavesTime =
              wavesurfer.getCurrentTime() / wavesurfer.getDuration();
            setCurrentTime(wavesurfer.getCurrentTime());
            togglePlayPauseOnWaveSurfer(wavesurfer, song, wavesTime);
          });

          return { song, wavesurfer };
        }
        return null;
      });

      setWaveSurferInstances(instances.filter(Boolean));
    }
  };

  const syncWaveSurferProgress = () => {
    if (!currentTrack || !wavesurferRefs.current.has(currentTrack._id)) return;
    const wavesurfer = wavesurferRefs.current.get(currentTrack._id);
    const duration = wavesurfer.getDuration() || 1;
    const seekPercentage = currentTime / duration;
    wavesurfer.seekTo(seekPercentage);
  };

  const togglePlayPauseOnWaveSurfer = (
    ws: any,
    song: any,
    wavesTime: number
  ) => {
    if (currentTrack?.id !== song?.song_url?.id) {
      dispatch(
        setCurrentTrack({
          ...currentTrack,
          id: song?.song_url?.id,
          isPlaying: true,
          seekTo: wavesTime,
        })
      );
      ws.play();
    } else {
      ws.seekTo(wavesTime);
      ws.play();
      dispatch(
        setCurrentTrack({
          ...currentTrack,
          isPlaying: !currentTrack?.isPlaying,
        })
      );
    }
  };
  const handleLikeClick = async () => {
    if (currentTrack) {
      handleLikeToggle(
        currentTrack._id,
        TAGS.MUSIC,
        toggleLike,
        currentTrack,
        dispatch
      );
    }
  };

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      createWaveSurfers(allSongs);
    }
  }, [allSongs]);

  useEffect(() => {
    if (currentTrack) {
      syncWaveSurferProgress();
    }
  }, [currentTrack, allSongs]);

  const handlePlayTrack = (track: IMusicProps) =>
    dispatch(setCurrentTrack(track));

  if (!allSongs) {
    return null;
  }

  return (
    <div>
      <MusicList
        data={allSongs}
        handlePlayTrack={handlePlayTrack}
        handleLikeClick={handleLikeClick}
      />
    </div>
  );
};

export default MusicListContainer;
