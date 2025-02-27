import React, { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCurrentList,
  setCurrentTrack,
  setIsPlaying,
} from '@/Redux/features/musicPlayer/musicPlayerSlice';
import WaveSurfer from 'wavesurfer.js';
import MusicList from './MusicList';
import { RootState } from '@/Redux/store';
import { useMusic } from '@/hooks/useMusic';
import { handleLikeToggle } from '@/hooks/useLike';
import {
  useGetAllMusicsQuery,
  useGetTopHitsMusicsQuery,
  useToggleLikeMutation,
} from '@/services/like';
import { IMusicProps, TAGS } from '@/app/(BrowsePage)/Browse/types/types';
import { useSearchParams } from 'next/navigation';
import { WritableDraft } from 'immer';

const MusicListContainer = () => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const queryType = searchParams.get('type');
  const topHitsMusicsQuery = useGetTopHitsMusicsQuery(undefined);
  const allMusicsQuery = useGetAllMusicsQuery({});

  let allSongsData = null;
  if (queryType === TAGS.MUSIC) {
    allSongsData = topHitsMusicsQuery.data;
  } else if (queryType === TAGS.NEW_RELEASE) {
    allSongsData = allMusicsQuery.data;
  }


  // const { data: allSongsData, isLoading } =
  //   queryType === TAGS.MUSIC
  //     ? useGetTopHitsMusicsQuery(undefined)
  //     : queryType === TAGS.NEW_RELEASE
  //       ? useGetAllMusicsQuery({})
  //       : { data: null, isLoading: false };

  const currentTrack = useSelector<RootState, IMusicProps | null>(
    (state) => state.musicPlayerSlice.currentTrack
  );
  
  const allSongs = useSelector<RootState, IMusicProps[] | null>(
    (state) => state.musicPlayerSlice.currentList
  );
  const isPlaying = useSelector<RootState, boolean>(
    (state) => state.musicPlayerSlice.isPlaying
  );
  const { currentTime, setCurrentTime } = useMusic();
  const wavesurferRefs = useRef(new Map());
  const [toggleLike] = useToggleLikeMutation();
  const wavesurferRef = useSelector<RootState, WritableDraft<WaveSurfer> | null>((state) => state.musicPlayerSlice.wavesurferRef);
  useEffect(() => {
    if (allSongsData && allSongsData.data) {
      let songs: IMusicProps[] = [];
      if (queryType === TAGS.MUSIC) {
        songs = allSongsData.data; // Assuming the data is in a direct array form
      } else if (queryType === TAGS.NEW_RELEASE) {
        songs = allSongsData.data?.data || []; // If `data` is wrapped inside another `data` object
      }
      if (songs?.length > 0) {
        dispatch(setCurrentList(songs));
      }
    }
  }, [allSongsData]);
  // useEffect(() => {
  //   if (allSongsData && allSongsData.data) {
  //     const songs =
  //       queryType === TAGS.MUSIC
  //         ? allSongsData?.data
  //         : queryType === TAGS.NEW_RELEASE
  //           ? allSongsData?.data?.data
  //           : [];

  //     if (songs?.length > 0) {
  //       dispatch(setCurrentList(songs));
  //     }
  //   }
  // }, [allSongsData]);
  const currentTrackRef = useRef(currentTrack);

  useEffect(() => {
    currentTrackRef.current = currentTrack;
  }, [currentTrack]);

  const createWaveSurfers = (songs: IMusicProps[]) => {
    if (songs && songs.length > 0) {
      songs.map((song) => {
        const waveformContainerId = `waveform_${song?._id}`;
        const waveformContainer = document.getElementById(waveformContainerId);

        if (!waveformContainer) return null;

        if (!wavesurferRefs.current.has(song?._id as string)) {
          const wavesurfer = WaveSurfer.create({
            container: `#${waveformContainerId}`,
            height: 33,
            barRadius: 200,
            waveColor: '#abb6c1',
            progressColor: '#5a17dd',
            cursorColor: 'transparent',
            url: song.audioUrl,
            peaks: song.peaks as Float32Array[]|| [],
          });

          wavesurferRefs.current.set(song?._id as string, wavesurfer);

          const updatedSong = { ...song, duration: wavesurfer.getDuration() };

          wavesurfer.on('interaction', (newTime: number) => {
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
    wavesurfer.on('interaction', (newTime: number) => {
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

  const handleLikeClick = async (musicId: string) => {
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

  
  if (!allSongs) {
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
