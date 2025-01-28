'use client';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleLikeToggle } from '@/hooks/useLike';
import { RootState } from '@/Redux/features/musicPlayer/types/types';
import HeadLine from './UI/UtilityComponent/HeadLine';
import MusicPlayCard from './UI/UtilityComponent/MusicPlayCard';
import Box from './UI/UtilityComponent/Card';
import { IMusicProps, IMusicDataResponse, TAGS } from './types/types';
import { useToggleLikeMutation } from '@/services/like';
import dynamic from 'next/dynamic';
const SkeletonGrid = dynamic(() => import('./UI/UtilityComponent/SkeletonGrid'), { ssr: false });
const Index = ({ initialData }: { initialData: IMusicDataResponse}) => {
  const [data,setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const [toggleLike] = useToggleLikeMutation();
  const currentTrack = useSelector<RootState, IMusicProps | null>((state) => state.musicPlayerSlice.currentTrack);
  useEffect(() => {
    setData(initialData);
    if (initialData) setIsLoading(false);
  }, [initialData]);
  return (
    <div className='flex flex-col'>
      <HeadLine title='Top Hits' subTitle='2024' />
      <hr className='w-full p-2 border-gray-600' />
      {isLoading || !data.topHits.data ? (
        <SkeletonGrid count={10} />
      ) : (
        <MusicPlayCard
          data={data?.topHits?.data}
          name={TAGS.MUSIC}
          message='Musics'
          handleLikeToggle={(itemId) =>
            handleLikeToggle(itemId, TAGS.MUSIC, toggleLike, currentTrack as IMusicProps, dispatch)
          }
        />
      )}
      <div className='mt-8 p-3'>
        <HeadLine title='Popular Albums' subTitle='Discover popular album musics' />
        {isLoading || !data.topAlbums ? (
          <SkeletonGrid count={4} />
        ) : (
          <Box
            data={data?.topAlbums?.data}
            name={TAGS.ALBUMS}
            handleLikeToggle={(itemId) => handleLikeToggle(itemId, TAGS.ALBUMS, toggleLike)}
            showLikeIcon={true}
            message='Albums'
            className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'
          />
        )}
      </div>
      <HeadLine title='New Releases' subTitle='2024' />
      <hr className='w-full p-2 border-gray-600' />
      {isLoading || !data.newReleases ? (
        <SkeletonGrid count={8} />
      ) : (
        <MusicPlayCard
          data={data?.newReleases?.data?.data?.slice(0, 8)}
          name={TAGS.NEW_RELEASE}
          message='New Releases '
          handleLikeToggle={(itemId) =>
            handleLikeToggle(itemId, TAGS.MUSIC, toggleLike, currentTrack as IMusicProps, dispatch)
          }
        />
      )}
      <div className='mt-8 p-3'>
        <HeadLine title='Top Genres & Moods' subTitle='Discover popular genres musics' />
        {isLoading || !data.topGenres ? (
          <SkeletonGrid count={4} />
        ) : (
          <Box
            name={TAGS.GENRE}
            data={data.topGenres.data}
            handleLikeToggle={(itemId) => handleLikeToggle(itemId, TAGS.GENRE, toggleLike)}
            showLikeIcon={true}
            message='Genres'
            className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'
          />
        )}
      </div>
    </div>
  );
};

export default Index;
