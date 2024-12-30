"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentList,
  setCurrentTrack,
  setIsPlaying,
  setSeekPercentage,
  togglePlay,
} from "@/Redux/features/musicPlayer/musicPlayerSlice";
import WaveSurfer from "wavesurfer.js";
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
import Loading from "@/app/loading";
import MusicList from "./MusicList";
import { useGetAlbumByIdAndTypeQuery } from "@/services/album";
import PlayerLabel from "./PlayerLabel";

const MusicListContainer = (props: any) => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const queryType = searchParams.get("type");
 

  const { data: allSongsData, isLoading } =
    props?.AlbumId && queryType === TAGS.ALBUM_SONGS
      ? useGetAlbumByIdAndTypeQuery({ id: props?.AlbumId, type: "AlbumSongs" })
      : queryType === TAGS.MUSIC
        ? useGetTopHitsMusicsQuery(undefined)
        : queryType === TAGS.NEW_RELEASE
          ? useGetAllMusicsQuery({})
          : { data: null, isLoading: false };

  // const { data: topHits } = useGetTopHitsMusicsQuery(undefined);

  console.log("allSongsData : ", allSongsData)
  const currentTrack = useSelector<RootState, IMusicProps | null>(
    (state) => state.musicPlayerSlice.currentTrack
  );
  const seekPercentage = useSelector<RootState, number>(
    (state) => state.musicPlayerSlice.seekPercentage
  );
  const allSongs = useSelector<RootState, IMusicProps[]>(
    (state) => state.musicPlayerSlice.currentList
  );
  const isPlaying = useSelector<RootState, boolean>(
    (state) => state.musicPlayerSlice.isPlaying
  );
  const { currentTime, setCurrentTime } = useMusic();
  const wavesurferRefs = useRef<Map<string, any>>(new Map());
  const [waveSurferInstances, setWaveSurferInstances] = useState<any[]>([]);
  const [toggleLike] = useToggleLikeMutation();

  const createWaveSurfers = (songs: IMusicProps[]) => {
    if (songs && songs.length > 0) {
      const instances = songs.map((song) => {
        const waveformContainerId = `waveform_${song?._id}`;
        const waveformContainer = document.getElementById(waveformContainerId);

        if (!waveformContainer) return null;

        if (!wavesurferRefs.current.has(song?._id as string)) {
          const wavesurfer = WaveSurfer.create({
            container: `#${waveformContainerId}`,
            width: 383,
            height: 33,
            barWidth: 3,
            barGap: 2,
            barRadius: 2,
            waveColor: "gray",
            progressColor: "#9333ea",
            cursorColor: "transparent",
          });

          if (song?.audioUrl) {
            wavesurfer.load(song.audioUrl);
          }

          wavesurferRefs.current.set(song?._id as string, wavesurfer);

          return { song, wavesurfer };
        }
        return null;
      });

      setWaveSurferInstances(instances.filter(Boolean));
    }
  };

  useEffect(() => {
    waveSurferInstances.forEach(({ song, wavesurfer }) => {
      wavesurfer.on("interaction", (time: number) => {
        const wavesTime = wavesurfer.getCurrentTime();
        if (currentTrack?._id != song?._id) {
          dispatch(
            setCurrentTrack({
              ...currentTrack,
              name: song?.name,
              artists: song?.artists,
              audioUrl: song?.audioUrl,
              currency: song?.audioUrl,
              description: song?.audioUrl,
              email: song?.email,
              imageUrl: song?.imageUrl,
              price: song?.price,
              liked: song?.liked,
              duration: song?.duration,
              _id: song?._id,
            })
          );
          const currentWavesurfer = wavesurferRefs.current.get(song._id);
          currentWavesurfer.seekTo(wavesTime);
          dispatch(setIsPlaying(true));
        } else {
          const currentWavesurfer = wavesurferRefs.current.get(
            currentTrack?._id as string
          );
          setCurrentTime(time);
          dispatch(setIsPlaying(true));
          const duration = currentWavesurfer.getDuration() || 1;
          const seekPercentage = time / duration;
          dispatch(setSeekPercentage(seekPercentage * 100));
        }
      });
    });
  }, [currentTrack]);

  const syncWaveSurferProgress = () => {
    if (
      !currentTrack ||
      !wavesurferRefs.current.has(currentTrack?._id as string)
    )
      return;
    const wavesurfer = wavesurferRefs.current.get(currentTrack?._id as string);
    const duration = wavesurfer.getDuration().toFixed(2) || 1;
    const seekPercentage = currentTime / duration;
    wavesurfer.seekTo(seekPercentage);
  };

  const handleLikeClick = async () => {
    if (currentTrack) {
      handleLikeToggle(
        currentTrack?._id as string,
        TAGS.MUSIC,
        toggleLike,
        currentTrack,
        dispatch
      );
    }
  };

  useEffect(() => {
    if (allSongsData && allSongsData.data) {
      console.log("allSongsData?.data : "  , allSongsData?.data  , typeof allSongsData?.data)
      const songs =
        props?.AlbumId && queryType === TAGS.ALBUM_SONGS
          ? allSongsData?.data
          : queryType === TAGS.MUSIC
            ? allSongsData?.data
            : queryType === TAGS.NEW_RELEASE
              ? allSongsData?.data?.data
              : [];
      if (songs?.length > 0) {
        dispatch(setCurrentList(songs));
      }
    }
  }, [allSongsData]);

  useEffect(() => {
    if (allSongs && allSongs.length > 0) {
      createWaveSurfers(allSongs);
    }
  }, [allSongs]);

  useEffect(() => {
    if (currentTrack) {
      syncWaveSurferProgress();
    }
  }, [currentTrack]);

  const handlePlayTrack = useCallback(
    (track: IMusicProps) => {
      dispatch(setCurrentTrack(track));
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
        if (isPlaying) {
          wavesurfer?.current?.pause();
          dispatch(setIsPlaying(false));
        } else {
          wavesurfer?.current?.play();
          dispatch(setIsPlaying(true));
        }
      }
    },
    [isPlaying]
  );

  if (isLoading) {
    return <Loading />
  }
  else if (!allSongs) {
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
