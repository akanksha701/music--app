import { Card, CardBody } from '@nextui-org/react';
import Image from 'next/image';
import { FaEllipsisH, FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';
import { IMemoizedCard, IMusicProps } from '../../types/types';
import React, { useState } from 'react';
import { IconButton } from '@mui/material';

const MemoizedBoxCard = ({
  index,
  item,
  handleMusicClick,
  showLikeIcon,
  handleLikeToggle,
  NAME,
  handleRating
}: IMemoizedCard) => {
  const [state, setState] = useState({
    liked: item?.liked || false,
    rating: item?.ratingByUser || 0,
    hoverRating: item?.ratingByUser || 0,
    isRatingGiven: item?.isRatingGiven
  });

  async function handleLikeState() {
    const data = handleLikeToggle?.(item._id, NAME as string);
    if (data) {
      setState((prev) => ({ ...prev, liked: !prev.liked }));
    }
  }
  const handleRatingChange = (star: number) => {
    setState((prev) => ({ ...prev, rating: star }));
    handleRating?.(item._id as string, star, NAME as string);
  };

  const handleHoverRating = (star: number) => setState((prev) => ({ ...prev, hoverRating: star }));

  const resetHoverRating = () => setState((prev) => ({ ...prev, hoverRating: state.rating }));


  return <Card
    key={index}
    className={`bg-white text-black rounded-lg 
      shadow-lg transition-transform duration-300 transform hover:scale-105 group`}
    style={{ width: '220px', height: '250px' }}>
    <CardBody className='flex flex-col items-center p-4 w-full h-full'>
      <div className='relative w-full h-2/3'>
        <Image
          alt={item.name || ''}
          src={(item?.imageUrl as string) || '/music/images/Audio Waves.png'}
          fill
          onClick={() => handleMusicClick(index, item as IMusicProps)}
          className='rounded-lg border-2 border-purple-500 shadow-md object-cover cursor-pointer'
        />
      </div>
      <span className=' p-2 text-center font-semibold text-xl truncate'>
        {item.name}
      </span>
      <div className="mt-4 w-full flex items-center justify-between space-x-2">
        {showLikeIcon && (
          // <button
          //   onClick={() => {
          //     if (handleLikeToggle) {
          //       handleLikeState();
          //     }
          //   }}
          //   className='p-2 rounded-full bg-transparent border-0 outline-none cursor-pointer'
          // >
          <>

            {state.liked ? (
              <IconButton
                className='p-2 rounded-full bg-transparent border-0 outline-none cursor-pointer'
                onClick={handleLikeState} color='primary'
                sx={{
                  '.MuiTouchRipple-root': {
                    '& span': {
                      backgroundColor: 'rgb(239 68 68)',
                      borderRadius: '50%',
                    },
                  },
                }}>
                <FaHeart size={18} className='text-red-500 transition-colors duration-300' />
              </IconButton>
            ) : (
              <IconButton
                onClick={handleLikeState}
                className='p-2 rounded-full bg-transparent border-0 outline-none cursor-pointer'
                color='primary'
                sx={{
                  '.MuiTouchRipple-root': {
                    '& span': {
                      backgroundColor: 'rgb(239 68 68)',
                      borderRadius: '50%',
                    },
                  },
                }}>
                <FaRegHeart size={18} className='text-gray-500 transition-colors duration-300' />
              </IconButton>
            )}
          </>
          // </button>
        )}
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star, index) => (
            <button
              disabled={state.isRatingGiven}
              key={index}
              onMouseEnter={() => handleHoverRating(star)}
              onMouseLeave={resetHoverRating}
              onClick={() => {
                handleRatingChange(star);
              }}
              className="rounded-full focus:outline-none"
            >
              <FaStar
                size={18}
                className={`transition-colors duration-300 ${(state.hoverRating || state.rating) >= star ? 'text-yellow-500' : 'text-gray-300'}`}
              />
            </button>
          ))}
        </div>
        <button className='p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
          <FaEllipsisH size={18} className='cursor-pointer' />
        </button>
      </div>
    </CardBody>
  </Card>;


};

export default React.memo(MemoizedBoxCard);