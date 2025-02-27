'use client';
import React from 'react';
import { IMusicPlayCardProps, IMusicProps } from '../../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { redirect } from 'next/navigation';
import { RootState } from '@/Redux/store';
import MemoizedMusicCard from './MemoizedMusicCard';
import { generateUrl } from '@/utils/helpers';
import { useMusic } from '@/hooks/useMusic';
import { setCurrentList, setCurrentSongIndex, setCurrentTrack } from '@/Redux/features/musicPlayer/musicPlayerSlice';

const MusicPlayCard = (props: IMusicPlayCardProps) => {
  const { data, name, message, handleLikeToggle } = props;
  const dispatch = useDispatch();
  const { setCurrentTime } = useMusic();
  const currentTrack = useSelector<RootState, IMusicProps | null>(
    (state) => state.musicPlayerSlice.currentTrack
  );

  const handleMusicClick = async (index: number, music: IMusicProps) => {
    dispatch(setCurrentList(data));
    setCurrentTime(0);
    if (!currentTrack || currentTrack._id !== music._id) {
      dispatch(setCurrentTrack(data[index]));
      dispatch(setCurrentSongIndex(index));
    }
    const newUrl = await generateUrl('/Music', { type: name });
    redirect(newUrl);
  };

  return (
    <div className="p-4 sm:p-6 md:p-10">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {data &&
          data.length > 0 &&
          data.map((item, index) => (
            <MemoizedMusicCard
              key={index}
              index={index}
              item={item}
              handleMusicClick={handleMusicClick}
              handleLikeToggle={handleLikeToggle}
              NAME={name}
            />
          ))}
        <> {data.length === 0 && <p>{message}</p>}</>
      </div>
    </div>
  );
};

export default MusicPlayCard;
