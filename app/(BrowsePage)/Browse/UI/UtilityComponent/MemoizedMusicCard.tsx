'use client';
import { Card, CardBody } from '@nextui-org/react';
import Image from 'next/image';
import { FaEllipsisH, FaHeart, FaPlay, FaRegHeart } from 'react-icons/fa';
import { IMemoizedMusicCard } from '../../types/types';
import React, { useState } from 'react';

const MemoizedMusicCard = ({
  index,
  item,
  handleMusicClick,
  handleLikeToggle,
  NAME
}: IMemoizedMusicCard) => {

  const [liked, setLiked] = useState(item?.liked);
  async function handleLikeState() {
    const data = handleLikeToggle && await handleLikeToggle(item._id as string, NAME as string);
    if (data) {
      setLiked(!liked);
    }
  }
  return <Card
    key={index}
    className={`cursor-pointer bg-white text-black rounded-lg shadow-lg 
    transition-transform duration-300 transform hover:scale-105 group mb-3 ml-2 relative`}
    style={{ height: '320px' }}
  >
    <CardBody className='flex flex-col items-center p-4 w-full h-full'>
      <div className='relative w-full h-2/3'>
        <Image
          alt={item.name as string}
          src={item.imageUrl as string}
          fill
          onClick={() => handleMusicClick(index, item)}
          className='rounded-lg border-2  shadow-md object-cover'
        />

        <FaPlay className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
            text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
      </div>

      <div className='mt-4 w-full flex justify-between items-center'>
        <button
          onClick={() => handleLikeToggle && handleLikeState()}
          className='group p-2 rounded-full bg-transparent border-0 outline-none cursor-pointer'
        >
          {liked ? (
            <FaHeart className='text-red-500 transition-colors duration-300' />
          ) : (
            <FaRegHeart className='text-gray-500 transition-colors duration-300' />
          )}
        </button>

        <span className='flex-1 text-center font-semibold text-lg sm:text-xl'>
          {item.name}
        </span>

        <FaEllipsisH className={`cursor-pointer opacity-0 group-hover:opacity-100 
            group-hover:pointer-events-auto transition-opacity duration-300`} />
      </div>
    </CardBody>
  </Card>;
};

export default React.memo(MemoizedMusicCard);