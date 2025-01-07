import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentList,
  setCurrentTrack,
  setIsPlaying,
} from "@/Redux/features/musicPlayer/musicPlayerSlice";
import WaveSurfer from "wavesurfer.js";
import MusicList from "./MusicList";
import { RootState } from "@/Redux/store";
import { useMusic } from "@/hooks/useMusic";
import { handleLikeToggle } from "@/hooks/useLike";
import {
  useGetAllMusicsQuery,
  useGetTopHitsMusicsQuery,
  useToggleLikeMutation,
} from "@/services/like";
import { IMusicProps, TAGS } from "@/app/(BrowsePage)/Browse/types/types";
import { useSearchParams } from "next/navigation";
import { useFetchAudioPeaksQuery } from "@/services/audio";

const MusicListContainer = () => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const queryType = searchParams.get("type");
  const { data: allSongsData, isLoading } =
    queryType === TAGS.MUSIC
      ? useGetTopHitsMusicsQuery(undefined)
      : queryType === TAGS.NEW_RELEASE
      ? useGetAllMusicsQuery({})
      : { data: null, isLoading: false };

  const currentTrack = useSelector<RootState, IMusicProps | null>(
    (state) => state.musicPlayerSlice.currentTrack
  );
  const seekPercentage = useSelector<RootState, number>(
    (state) => state.musicPlayerSlice.seekPercentage
  );
  const allSongs = useSelector<RootState, IMusicProps[] | null>(
    (state) => state.musicPlayerSlice.currentList
  );
  const isPlaying = useSelector<RootState, boolean>(
    (state) => state.musicPlayerSlice.isPlaying
  );
  const { currentTime, setCurrentTime } = useMusic();
  const wavesurferRefs = useRef<Map<string, any>>(new Map());
  const [waveSurferInstances, setWaveSurferInstances] = useState<any>([]);
  const [toggleLike] = useToggleLikeMutation();
  const wavesurferRef = useSelector<RootState, WaveSurfer | null>(
    (state) => state.musicPlayerSlice.wavesurferRef
  );
  const { data: audioPeaksData, error } = currentTrack
    ? useFetchAudioPeaksQuery(currentTrack.audioUrl as string)
    : { data: null, error: null };
  useEffect(() => {
    if (allSongsData && allSongsData.data) {
      const songs =
        queryType === TAGS.MUSIC
          ? allSongsData?.data
          : queryType === TAGS.NEW_RELEASE
          ? allSongsData?.data?.data
          : [];

      if (songs?.length > 0) {
        dispatch(setCurrentList(songs));
      }
    }
  }, [allSongsData]);
  const currentTrackRef = useRef(currentTrack);

  useEffect(() => {
    currentTrackRef.current = currentTrack;
  }, [currentTrack]);

  const createWaveSurfers = (songs: IMusicProps[]) => {
    if (songs && songs.length > 0) {
      const instances = songs.map((song) => {
        const waveformContainerId = `waveform_${song?._id}`;
        const waveformContainer = document.getElementById(waveformContainerId);

        if (!waveformContainer) return null;

        if (!wavesurferRefs.current.has(song?._id as string)) {
          const wavesurfer = WaveSurfer.create({
            container: `#${waveformContainerId}`,
            height: 33,
            barRadius: 200,
            waveColor: "#abb6c1",
            progressColor: "#5a17dd",
            cursorColor: "transparent",
            url: song.audioUrl,
            peaks: song.peaks || [],
          });

          wavesurferRefs.current.set(song?._id as string, wavesurfer);

          const updatedSong = { ...song, duration: wavesurfer.getDuration() };

          wavesurfer.on("interaction", (newTime: number) => {
            dispatch(setCurrentTrack(updatedSong)); // Use the updated song here
            const duration = wavesurfer.getDuration() || 1;
            const seekPercentage = newTime / duration;

            wavesurfer.seekTo(seekPercentage);

            if (wavesurferRef) {
              wavesurferRef.seekTo(seekPercentage);
              wavesurferRef.seekTo(seekPercentage);
            }

            setCurrentTime(newTime);
          });

          return { song: updatedSong, wavesurfer };
        }
        return null; // Return null if instance already exists
      });

      setWaveSurferInstances(instances.filter(Boolean));
    }
  };

  useEffect(() => {
    if (
      !currentTrack ||
      !wavesurferRefs.current.has(currentTrack?._id as string)
    )
      return;
    const wavesurfer = wavesurferRefs.current.get(currentTrack?._id as string);
    const duration = wavesurfer.getDuration() || 1;
    const seekPercentage = currentTime / duration;
    wavesurfer.seekTo(seekPercentage);
    wavesurfer.on("interaction", (newTime: number) => {
      const duration = wavesurfer.getDuration() || 1;
      const seekPercentage = newTime / duration;
      if (wavesurferRef) {
        wavesurferRef.seekTo(seekPercentage);
        wavesurfer.seekTo(seekPercentage);
      }
    });
  }, [currentTime]);

  useEffect(() => {
    if (allSongs && allSongs.length > 0) {
      createWaveSurfers(allSongs);
    }
  }, [allSongs]);

  const handlePlayTrack = useCallback(
    (track: IMusicProps) => {
      const wavesurfer = wavesurferRefs.current.get(
        currentTrack?._id as string
      );
      if (currentTrack?._id === track._id) {
        if (isPlaying) {
          wavesurfer?.current?.pause();
          dispatch(setIsPlaying(false));
        } else {
          wavesurfer?.current?.play();
          dispatch(setIsPlaying(true));
        }
      } else {
        dispatch(setCurrentTrack(track));
        wavesurfer?.current?.play();
        dispatch(setIsPlaying(true));
        setCurrentTime(0);
      }
    },
    [isPlaying, currentTrack?._id]
  );

  const handleLikeClick = async (musicId:string) => {
    if (currentTrack) {
      handleLikeToggle(
        musicId as string,
        TAGS.MUSIC,
        toggleLike,
        currentTrack,
        dispatch
      );
    
    }
  };
  if (isLoading) {
    return <></>;
  } else if (!allSongs) {
    return null;
  }
  return (
    <div>
      <MusicList
        data={allSongs || []}
        handlePlayTrack={handlePlayTrack}
        handleLikeClick={handleLikeClick}
      />
    </div>
  );
};

export default MusicListContainer;
