'use client';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleLikeToggle } from '@/hooks/useLike';
import { RootState } from '@/Redux/features/musicPlayer/types/types';
import Skeleton from '@mui/material/Skeleton';
import HeadLine from './UI/UtilityComponent/HeadLine';
import MusicPlayCard from './UI/UtilityComponent/MusicPlayCard';
import Box from './UI/UtilityComponent/Card';
import { IMusicProps, TAGS } from './types/types';
import { useToggleLikeMutation } from '@/services/like';

const SkeletonGrid = ({ count }: { count: number }) => (
  <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6'>
    {Array.from({ length: count }).map((_, index) => (
      <div key={index} className='p-4'>
        <Skeleton variant='rectangular' width='100%' height={150} />
        <Skeleton variant='text' className='mt-2' />
        <Skeleton variant='text' />
      </div>
    ))}
  </div>
); 


const Index = ({ initialData }: { initialData: any}) => {
  const [data,setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const currentTrack = useSelector<RootState, IMusicProps | null>(
    (state) => state.musicPlayerSlice.currentTrack
  );

  const [toggleLike] = useToggleLikeMutation();
   
  useEffect(() => {
    setData(data);
    if (data) setIsLoading(false); 
  }, [data]);

  
 
  return (
    <div className='flex flex-col'>
      {/* Top Hits Section */}
      <HeadLine title='Top Hits' subTitle='2024' />
      <hr className='w-full p-2 border-gray-600' />
      {isLoading || !data.topHits ? (
        <SkeletonGrid count={10} />
      ) : (
        <MusicPlayCard
          data={data?.topHits?.data}
          name={TAGS.MUSIC}
          handleLikeToggle={(itemId) =>
            handleLikeToggle(itemId, TAGS.MUSIC, toggleLike, currentTrack as IMusicProps, dispatch)
          }
        />
      )}

      {/* Popular Albums Section */}
      <div className='mt-8 p-3'>
        <HeadLine title='Popular Albums' subTitle='Discover popular album musics' />
        {isLoading || !data.topAlbums ? (
          <SkeletonGrid count={4} />
        ) : (
          <Box
            data={data.topAlbums.data}
            name={TAGS.ALBUMS}
            handleLikeToggle={(itemId) => handleLikeToggle(itemId, TAGS.ALBUMS, toggleLike)}
            showLikeIcon={true}
            message='albums not found'
            className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'
          />
        )}
      </div>

      {/* New Releases Section */}
      <HeadLine title='New Releases' subTitle='2024' />
      <hr className='w-full p-2 border-gray-600' />
      {isLoading || !data.newReleases ? (
        <SkeletonGrid count={8} />
      ) : (
        <MusicPlayCard
          data={data?.newReleases?.data?.data?.slice(0, 8)}
          name={TAGS.NEW_RELEASE}
          handleLikeToggle={(itemId) =>
            handleLikeToggle(itemId, TAGS.MUSIC, toggleLike, currentTrack as IMusicProps, dispatch)
          }
        />
      )}

      {/* Top Genres Section */}
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
            message='genres not found'
            className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'
          />
        )}
      </div>
    </div>
  );
};

export default Index;
