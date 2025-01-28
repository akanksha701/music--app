'use client';
import { Card, CardBody } from '@nextui-org/react';
import Image from 'next/image';
import { FaEllipsisH, FaHeart, FaPlay, FaRegHeart, FaStar } from 'react-icons/fa';
import { IMemoizedMusicCard } from '../../types/types';
import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import { Name } from '@/hooks/useSelectCard';

const MemoizedMusicCard = ({
  index,
  item,
  handleMusicClick,
  handleLikeToggle,
  handleRating,
  NAME
}: IMemoizedMusicCard) => {
  const [state, setState] = useState({
    liked: item?.liked || false,
    rating: item?.ratingByUser || 0,
    hoverRating: item?.ratingByUser || 0,
    isRatingGiven: item?.isRatingGiven
  });

  const handleLikeState = async () => {
    const data = await handleLikeToggle?.(item._id as string, NAME as string);
    if (data) {
      setState((prev) => ({ ...prev, liked: !prev.liked }));
    }
  };

  const handleRatingChange = (star: number) => {
    setState((prev) => ({ ...prev, rating: star }));
    handleRating?.(item._id as string, star,NAME as string);
  };

  const handleHoverRating = (star: number) => setState((prev) => ({ ...prev, hoverRating: star }));

  const resetHoverRating = () => setState((prev) => ({ ...prev, hoverRating: state.rating }));

  return (
    <>
      {item ? <Card
        key={index}
        className={`cursor-pointer bg-white text-black rounded-lg shadow-lg 
      transition-transform duration-300 transform hover:scale-105 group mb-3 ml-2 relative`}
        style={{ height: '320px' }}
      >
        <div className="relative w-full h-2/3">
          <Image
            alt={item.name as string}
            src={item.imageUrl as string}
            fill
            onClick={() => handleMusicClick(index, item)}
            className="rounded-lg border-2 shadow-md object-cover"
          />
          <FaPlay
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
          text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
          />
        </div>

        <CardBody className="flex flex-col items-center w-full h-full">
          <span className="flex-1 text-center font-semibold text-lg sm:text-xl">
            {item.name}
          </span>
          <div className="mt-4 w-full flex items-center justify-between space-x-2">
            {state.liked ? (
              <IconButton color="primary" onClick={handleLikeState}>
                <FaHeart size={18} className="text-red-500 transition-colors duration-300" />
              </IconButton>
            ) : (
              <IconButton color="primary" onClick={handleLikeState}>
                <FaRegHeart size={18} className="text-gray-500 transition-colors duration-300" />
              </IconButton>
            )}
            <div className="flex" aria-disabled={state.isRatingGiven}>
              {[1, 2, 3, 4, 5].map((star, index) => (
                <button
                  disabled={state.isRatingGiven}
                  key={index}
                  onMouseEnter={() => handleHoverRating(star)}
                  onMouseLeave={resetHoverRating}
                  onClick={() =>  handleRatingChange(star)}
                  className="rounded-full focus:outline-none"
                >
                  <FaStar
                    size={18}
                    className={` transition-colors duration-300 ${(state.hoverRating || state.rating) >= star ? 'text-yellow-500' : 'text-gray-300'}`}
                  />
                </button>
              ))}
            </div>

            <button className="p-2 rounded-full bg-transparent border-0 outline-none cursor-pointer">
              <FaEllipsisH className="w-5 h-5 text-gray-500 hover:text-gray-700 transition-colors duration-300" />
            </button>
          </div>
        </CardBody>
      </Card> : <></>}
    </>


  );
};

export default React.memo(MemoizedMusicCard);
