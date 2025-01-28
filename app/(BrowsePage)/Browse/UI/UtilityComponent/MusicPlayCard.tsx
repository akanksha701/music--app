'use client';
import React from 'react';
import { IMusicPlayCardProps, IMusicProps, IRatingType } from '../../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { redirect } from 'next/navigation';
import MemoizedMusicCard from './MemoizedMusicCard';
import { RootState } from 'Redux/store';
import { useMusic } from 'hooks/useMusic';
import { setCurrentList, setCurrentTrack, setCurrentSongIndex } from '@/Redux/features/musicPlayer/musicPlayerSlice';
import { generateUrl } from '@/utils/helpers';
import NoDataFound from '@/common/NoDataFound/NoDataFound';
import { ratingAction } from '@/app/actions/rating';
import { IUserDetails } from '@/app/(ProfilePage)/MyProfile/types/types';

const MusicPlayCard = (props: IMusicPlayCardProps) => {
  const { data, name, message, handleLikeToggle } = props;
  const dispatch = useDispatch();
  const { setCurrentTime } = useMusic();
  const currentTrack = useSelector<RootState, IMusicProps | null>((state) => state.musicPlayerSlice.currentTrack);
  const user = useSelector<RootState, IUserDetails | null>((state) => state.session.loggedInUser);

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

  const handleRating = async (musicId: string, rating: number) => {
    const response = await ratingAction(user?._id?.toString() as string, musicId.toString() as string, rating, name as IRatingType);
    return response;
  };
  return (
    <>
      {
        data &&
          data.length > 0 ?
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {
              data.map((item, index) => (
                <div key={index}>
                  <MemoizedMusicCard
                    key={index}
                    index={index}
                    item={item || {}}
                    handleMusicClick={handleMusicClick}
                    handleLikeToggle={handleLikeToggle}
                    handleRating={handleRating}
                    NAME={name}
                  />
                </div>
              ))}
          </div>
          :
          <NoDataFound name={message?.toString() || ''} />
      }
    </>
  );
};

export default MusicPlayCard;

