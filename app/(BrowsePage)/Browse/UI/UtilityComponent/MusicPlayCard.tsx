'use client';
import Image from 'next/image';
import React from 'react';
import { Card, CardBody } from '@nextui-org/react';
import { IMusicPlayCardProps, IMusicProps } from '../../types/types';
import { FaEllipsisH, FaHeart, FaRegHeart, FaPlay } from 'react-icons/fa'; // Import play icon
import { useDispatch, useSelector } from 'react-redux';
import {
  setCurrentList,
  setCurrentSongIndex,
  setCurrentTrack,
} from '@/Redux/features/musicPlayer/musicPlayerSlice'; // Adjust the path as necessary
import { redirect } from 'next/navigation';
import { generateUrl } from '@/utils/helpers';
import { RootState } from '@/Redux/store';
import { useMusic } from '@/hooks/useMusic';
import MemoizedMusicCard from './MemoizedMusicCard';

const MusicPlayCard = (props: IMusicPlayCardProps) => {
  const { data, name, handleLikeToggle } = props;
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
      </div>
    </div>
  );
};

export default MusicPlayCard;
