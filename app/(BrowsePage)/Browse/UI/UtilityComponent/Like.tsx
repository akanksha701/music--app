import { IUserDetails } from '@/app/(ProfilePage)/MyProfile/types/types';
import { Modal } from '@/common/modal/Modal';
import { RootState } from '@/Redux/store';
import { IconButton } from '@mui/material';
import React from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import SignIn from '@/app/Signin/page';

interface ILikeProps
{
    handleLikeState:()=>void;
    state:{
        liked?: boolean;
        rating?: number;
        hoverRating?: number;
        isRatingGiven?: boolean;
      };

}
const Like = (props:ILikeProps) => {
  const{ handleLikeState,state}=props;
  const loggedinUser = useSelector<RootState, IUserDetails | null>((state) => state?.session?.loggedInUser);

  return (
    <>
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
    </>
  );
};

export default Like;