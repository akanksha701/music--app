import React from 'react';
import { IBoxTypes, IMusicProps } from '../../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/Redux/store';
import { redirect } from 'next/navigation';
import { setCurrentList, setCurrentSongIndex, setCurrentTrack } from '@/Redux/features/musicPlayer/musicPlayerSlice';
import { generateUrl } from '@/utils/helpers';
import MemoizedCard from './MemoizedCard';

const Box = ({
  data,
  className,
  title,
  name: NAME,
  showLikeIcon,
  message,
  handleLikeToggle,
}: IBoxTypes) => {
  const dispatch = useDispatch();
  const currentTrack = useSelector<RootState, IMusicProps | null>(
    (state) => state.musicPlayerSlice.currentTrack
  );

  const GetUrl = (item: IMusicProps) => {
    switch (NAME) {
    case 'Album':
      return `/Album/${item._id}?type=AlbumSongs`;
    case 'Genres':
      return `/Genre/${item._id}?type=GenreSongs`;
    default:
      return '';
    }

  };

  const handleMusicClick = async (index: number, music: IMusicProps) => {
    if (NAME === 'Album' || 'Genres') {
      redirect(GetUrl(music));
    }
    dispatch(setCurrentList(data as IMusicProps[]));
    if (!currentTrack || currentTrack._id !== music._id) {
      dispatch(setCurrentTrack(data?.[index] as IMusicProps));
      dispatch(setCurrentSongIndex(index));
    }
    const newUrl = await generateUrl('/Music', { type: NAME || '' });
    redirect(newUrl);
  };


  return (
    <>
      <h2 className='text-2xl font-semibold mt-7'>{title}</h2>
      <div className={className}>
        {data && data.length > 0 ? (
          data?.map((item, index) => {

            return (<MemoizedCard
              key={index}
              index={index}
              item={item}
              handleMusicClick={handleMusicClick}
              showLikeIcon={showLikeIcon}
              handleLikeToggle={handleLikeToggle}
              NAME={NAME}
            />);
          })
        ) : (
          <p>{message}</p>
        )}
      </div>
    </>
  );
};

export default Box;
