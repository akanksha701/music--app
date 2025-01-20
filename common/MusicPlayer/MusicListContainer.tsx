import React, { useEffect, useRef, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCurrentList,
  setCurrentTrack,
  setIsPlaying,
} from '@/Redux/features/musicPlayer/musicPlayerSlice';
import WaveSurfer from 'wavesurfer.js'; 
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
import { useGetMusicsByGenreQuery } from '@/services/music';
import { useGetAlbumByIdAndTypeQuery } from '@/services/album';
import MusicList from '@/app/Music/UI/UtilityComponent/MusicList';
import { WritableDraft } from 'immer';
import Loading from '@/app/AddAlbum/loading';

const MusicListContainer = (props: {
  AlbumId?: string;
  GenreId?: string;
  PlaylistId?: string;
}) => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const queryType = searchParams.get('type');
  const [allSongsData, setAllSongsData] = useState<IMusicProps[] | null>(null);


  const { data: genreData, isLoading: isLoadingGenre } = useGetMusicsByGenreQuery(
    { id: props?.GenreId, type: 'genre' },
    { skip: !(props?.GenreId && queryType === 'GenreSongs') }
  );

  const { data: albumData, isLoading: isLoadingAlbum } = useGetAlbumByIdAndTypeQuery(
    { id: props?.AlbumId, type: 'AlbumSongs' },
    { skip: !(props?.AlbumId && queryType === TAGS.ALBUM_SONGS) }
  );

  const { data: topHitsData, isLoading: isLoadingTopHits } = useGetTopHitsMusicsQuery(
    undefined,
    { skip: queryType !== TAGS.MUSIC }
  );

  const { data: newReleaseData, isLoading: isLoadingNewRelease } = useGetAllMusicsQuery(
    {},
    { skip: queryType !== TAGS.NEW_RELEASE }
  );

  useEffect(() => {
    if (queryType === 'GenreSongs' && genreData) {
      setAllSongsData(genreData.data);
    } else if (queryType === TAGS.ALBUM_SONGS && albumData) {
      setAllSongsData(albumData.data);
    } else if (queryType === TAGS.MUSIC && topHitsData) {
      setAllSongsData(topHitsData.data);
    } else if (queryType === TAGS.NEW_RELEASE && newReleaseData) {
      setAllSongsData(newReleaseData.data?.data);
    } else {
      setAllSongsData(null);
    }
  }, [genreData, albumData, topHitsData, newReleaseData, queryType]);
  // const { data: allSongsData, isLoading } =
  //   props?.GenreId && queryType === 'GenreSongs'
  //     ? useGetMusicsByGenreQuery({ id: props?.GenreId, type: 'genre' })
  //     : props?.AlbumId && queryType === TAGS.ALBUM_SONGS
  //       ? useGetAlbumByIdAndTypeQuery({ id: props?.AlbumId, type: 'AlbumSongs' })
  //       : queryType === TAGS.MUSIC
  //         ? useGetTopHitsMusicsQuery(undefined)
  //         : queryType === TAGS.NEW_RELEASE
  //           ? useGetAllMusicsQuery({})
  //           : { data: null, isLoading: false };

  const currentTrack = useSelector<RootState, IMusicProps | null>(
    (state) => state.musicPlayerSlice.currentTrack
  );
  
  const allSongs = useSelector<RootState, IMusicProps[]>(
    (state) => state.musicPlayerSlice.currentList as IMusicProps[]
  );
  const isPlaying = useSelector<RootState, boolean>(
    (state) => state.musicPlayerSlice.isPlaying
  );
  const { currentTime, setCurrentTime } = useMusic();
  const wavesurferRefs = useRef<Map<string, WritableDraft<WaveSurfer>>>(new Map());
  const [toggleLike] = useToggleLikeMutation();
  const wavesurferRef = useSelector<RootState, WritableDraft<WaveSurfer>|null >(
    (state) => state.musicPlayerSlice.wavesurferRef
  );

  useEffect(() => {
    if (allSongsData && allSongsData.length > 0) {
      dispatch(setCurrentList(allSongsData));
    }
  }, [allSongsData, dispatch]);
  // useEffect(() => {
  //   if (allSongsData && allSongsData.data) {
  //     const songs =
  //       props?.GenreId && queryType === 'GenreSongs'
  //         ? allSongsData?.data
  //         : props?.AlbumId && queryType === TAGS.ALBUM_SONGS
  //           ? allSongsData?.data
  //           : queryType === TAGS.MUSIC
  //             ? allSongsData?.data
  //             : queryType === TAGS.NEW_RELEASE
  //               ? allSongsData?.data?.data
  //               : [];

  //     if (songs?.length > 0) {
  //       dispatch(setCurrentList(songs));
  //     }
  //   }
  // }, [allSongsData]);
  const currentTrackRef = useRef(currentTrack);

  useEffect(() => {
    currentTrackRef.current = currentTrack;
  }, [currentTrack]);



  useEffect(() => {
    if (
      !currentTrack ||
      !wavesurferRefs.current.has(currentTrack?._id as string)
    )
      return;
    const wavesurfer = wavesurferRefs.current.get(currentTrack?._id as string);
    const duration = wavesurfer?.getDuration() || 1;
    const seekPercentage = currentTime / duration;
    wavesurfer?.seekTo(seekPercentage);
    wavesurfer?.on('interaction', (newTime: number) => {
      const duration = wavesurfer?.getDuration() || 1;
      const seekPercentage = newTime / duration;
      if (wavesurferRef) {
        wavesurferRef.seekTo(seekPercentage);
        wavesurfer?.seekTo(seekPercentage);
      }
    });
  }, [currentTime, currentTrack, wavesurferRef]);

  useEffect(() => {

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
              peaks: song.peaks as Float32Array[],
            });
  
            wavesurferRefs.current.set(song?._id as string, wavesurfer as WritableDraft<WaveSurfer>);
  
            const updatedSong = { ...song, duration: wavesurfer.getDuration().toString() };
  
            wavesurfer.on('interaction', (newTime: number) => {
              dispatch(setCurrentTrack(updatedSong as IMusicProps)); // Use the updated song here
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
    if (allSongs && allSongs.length > 0) {
      createWaveSurfers(allSongs);
    }
    
  }, [allSongs, dispatch, setCurrentTime, wavesurferRef]);

  const handlePlayTrack = useCallback(
    (track: IMusicProps) => {
      const wavesurfer = wavesurferRefs.current.get(
        currentTrack?._id as string
      );
      if (currentTrack?._id === track._id) {
        if (isPlaying) {
          wavesurfer?.pause();
          dispatch(setIsPlaying(false));
        } else {
          wavesurfer?.play();
          dispatch(setIsPlaying(true));
        }
      } else {
        dispatch(setCurrentTrack(track));
        wavesurfer?.play();
        dispatch(setIsPlaying(true));
        setCurrentTime(0);
      }
    },
    [isPlaying, currentTrack?._id , dispatch, setCurrentTime]
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
  if (isLoadingGenre || isLoadingAlbum || isLoadingTopHits || isLoadingNewRelease) {
    return <Loading />;
  }

  if (!allSongsData) {
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
