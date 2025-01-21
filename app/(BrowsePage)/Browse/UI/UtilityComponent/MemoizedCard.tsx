import { Card, CardBody } from '@nextui-org/react';
import Image from 'next/image';
import { FaEllipsisH, FaHeart, FaRegHeart } from 'react-icons/fa';
import { IMemoizedCard, IMusicProps } from '../../types/types';
import React, { useState } from 'react';

const MemoizedCard = ({
  index,
  item,
  handleMusicClick,
  showLikeIcon,
  handleLikeToggle,
  NAME
}: IMemoizedCard) => {

  const [liked, setLiked] = useState(item?.liked);
  async function handleLikeState() {
    const data = handleLikeToggle && await handleLikeToggle(item._id, NAME as string);
    if (data) {
      setLiked(!liked);
    }
  }

  return <Card
    key={index}
    className={`bg-white text-black rounded-lg 
        shadow-lg transition-transform duration-300 transform hover:scale-105 group`}
    style={{ width: '220px', height: '220px' }}>
    <CardBody className='flex flex-col items-center p-4 w-full h-full'>
      <div className='relative w-full h-2/3'>
        <Image
          alt={item.name || ''}
          src={
            (item?.imageUrl as string) ||
                        '/music/images/Audio Waves.png'
          }
          fill
          onClick={() => handleMusicClick(index, item as IMusicProps)}
          className='rounded-lg border-2 border-purple-500 shadow-md object-cover cursor-pointer'
        />
      </div>
      <div className='mt-4 w-full flex justify-between items-center'>
        {showLikeIcon && (
          <button
            onClick={() => {
              if(handleLikeToggle ){
                handleLikeState();
              }
            }}
            className='p-2 rounded-full bg-transparent border-0 outline-none cursor-pointer'
          >
            {liked ? (
              <FaHeart className='text-red-500 transition-colors duration-300' />
            ) : (
              <FaRegHeart className='text-gray-500 transition-colors duration-300' />
            )}
          </button>
        )}

        <span className='flex-1 text-center font-semibold text-xl truncate px-2'>
          {item.name}
        </span>

        <button className='p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
          <FaEllipsisH className='cursor-pointer' />
        </button>
      </div>
    </CardBody>
  </Card>;
};

export default React.memo(MemoizedCard);