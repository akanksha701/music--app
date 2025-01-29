import { Card, CardBody } from '@nextui-org/react';
import Image from 'next/image';
import { FaHeart, FaPlay, FaRegHeart, FaStar } from 'react-icons/fa';
import { IMemoizedCard, IMusicProps } from '../../types/types';
import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '@/Redux/store';
import { IUserDetails } from '@/app/(ProfilePage)/MyProfile/types/types';
import Modal from '@/common/modal/Modal';
import SignIn from '@/app/Signin/page';
import { BsThreeDotsVertical } from 'react-icons/bs';
import AverageStarDisplay from './AverageStarDisplay';
const MemoizedBoxCard = ({
  index,
  item,
  handleMusicClick,
  handleLikeToggle,
  NAME,
  handleRating
}: IMemoizedCard) => {
  const loggedinUser = useSelector<RootState, IUserDetails | null>((state) => state?.session?.loggedInUser);
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
  // const handleRatingChange = (star: number) => {
  //   setState((prev) => ({ ...prev, rating: star }));
  //   handleRating?.(item._id as string, star, NAME as string);
  // };

  // const handleHoverRating = (star: number) => setState((prev) => ({ ...prev, hoverRating: star }));

  // const resetHoverRating = () => setState((prev) => ({ ...prev, hoverRating: state.rating }));


  return <Card
    key={index}
    className='mx-1 cursor-pointer bg-white text-black rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105 group mb-3 ml-2 relative'
  >
    <div className="relative w-full h-auto">
      {
        loggedinUser ? <>
          <IconButton
            color="primary"
            className="absolute top-2 right-2"
            onClick={handleLikeState}
          >
            {state.liked ? (
              <FaHeart size={18} className="text-red-500 transition-colors duration-300" />
            ) : (
              <FaRegHeart size={18} className="text-gray-500 transition-colors duration-300" />
            )}
          </IconButton>
        </> : <>
          <Modal title="Log in with Google" body={<SignIn />}>
            <IconButton
              color="primary"
              className="absolute top-2 right-2"
              onClick={handleLikeState}
            >
              {state.liked ? (
                <FaHeart size={18} className="text-red-500 transition-colors duration-300" />
              ) : (
                <FaRegHeart size={18} className="text-gray-500 transition-colors duration-300" />
              )}
            </IconButton>
          </Modal>

        </>
      }
      <Image
        alt={item.name || ''}
        src={(item?.imageUrl as string) || '/music/images/Audio Waves.png'}
        width={240}
        height={0}
        onClick={() => handleMusicClick(index, item as IMusicProps)}
        className=' object-cover w-full h-48'
      />
      <FaPlay className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
    <CardBody className="flex flex-col items-start w-full h-full pt-4">
      <div className="flex justify-between items-center w-full">
        <span className="text-left font-semibold text-lg sm:text-xl">
          {item.name}
        </span>
        <BsThreeDotsVertical className="text-gray-600 ml-2" />
      </div>
      <div className="flex items-center">
        <AverageStarDisplay avgRating={item.avgRating} />
        <span className="text-gray-500 ml-2 text-sm">
          {item.avgRating ? `${item.avgRating.toFixed(2)} / 5` : 'No ratings yet'}
        </span>
      </div>
    </CardBody>
  </Card>;


};

export default React.memo(MemoizedBoxCard);