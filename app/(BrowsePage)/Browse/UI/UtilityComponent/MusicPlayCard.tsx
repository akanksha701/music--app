'use client';
import Image from 'next/image';
import React, { useRef } from 'react';
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
import WaveSurfer from 'wavesurfer.js';
import { RootState } from '@/Redux/store';

const MusicPlayCard = (props: IMusicPlayCardProps) => {
  const { data, name, handleLikeToggle } = props;
  const dispatch = useDispatch();

  const currentTrack = useSelector<RootState, IMusicProps | null>(
    (state) => state.musicPlayerSlice.currentTrack
  );

  const handleMusicClick = async (index: number, music: IMusicProps) => {
    dispatch(setCurrentList(data));
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
        {data.map((item, index) => (
          <Card
            key={index}
            className="cursor-pointer bg-white text-black rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105 group mb-3 ml-2 relative"
            style={{ height: '320px' }}
          >
            <CardBody className="flex flex-col items-center p-4 w-full h-full">
              <div className="relative w-full h-2/3">
                <Image
                  alt={item.name as string}
                  src={item.imageUrl as string}
                  fill
                  onClick={() => handleMusicClick(index, item)}
                  className="rounded-lg border-2  shadow-md object-cover"
                />

                <FaPlay className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="mt-4 w-full flex justify-between items-center">
                <button
                  onClick={() => handleLikeToggle(item._id as string, name)}
                  className="group p-2 rounded-full bg-transparent border-0 outline-none cursor-pointer"
                >
                  {item.liked ? (
                    <FaHeart className="text-red-500 transition-colors duration-300" />
                  ) : (
                    <FaRegHeart className="text-gray-500 transition-colors duration-300" />
                  )}
                </button>

                <span className="flex-1 text-center font-semibold text-lg sm:text-xl">
                  {item.name}
                </span>

                <FaEllipsisH className="cursor-pointer opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300" />
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MusicPlayCard;
