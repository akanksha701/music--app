import React from 'react';
import { IBoxTypes, IMusicProps, IRatingType } from '../../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { redirect } from 'next/navigation';
import MemoizedBoxCard from './MemoizedBoxCard';
import {
  setCurrentList,
  setCurrentTrack,
  setCurrentSongIndex,
} from '@/Redux/features/musicPlayer/musicPlayerSlice';
import { generateUrl } from '@/utils/helpers';
import { RootState } from '@/Redux/store';
import NoDataFound from '@/common/NoDataFound/NoDataFound';
import { ratingAction } from '@/app/actions/rating';
import { IUserDetails } from '@/app/(ProfilePage)/MyProfile/types/types';

const Box = ({
  data,
  className,
  title,
  name: NAME,
  showLikeIcon,
  message,
  handleLikeToggle,
}: IBoxTypes) => {
  const dispatch = useDispatch();
  const currentTrack = useSelector<RootState, IMusicProps | null>(
    (state) => state.musicPlayerSlice.currentTrack
  );
  const user = useSelector<RootState, IUserDetails | null>((state) => state.session.loggedInUser);


  const GetUrl = (item: IMusicProps) => {
    switch (NAME) {
    case 'Album':
      return `/Album/${item._id}?type=AlbumSongs`;
    case 'Genres':
      return `/Genre/${item._id}?type=GenreSongs`;
    default:
      return '';
    }
  };

  const handleMusicClick = async (index: number, music: IMusicProps) => {
    if (NAME === 'Album' || 'Genres') {
      redirect(GetUrl(music));
    }
    dispatch(setCurrentList(data as IMusicProps[]));
    if (!currentTrack || currentTrack._id !== music._id) {
      dispatch(setCurrentTrack(data?.[index] as IMusicProps));
      dispatch(setCurrentSongIndex(index));
    }
    const newUrl = await generateUrl('/Music', { type: NAME || '' });
    redirect(newUrl);
  };
  const handleRating = async (musicId: string, rating: number) => {
    await ratingAction(user?._id?.toString() as string, musicId.toString() as string, rating, NAME as IRatingType);
  };
  return (
    <>
      <h2 className="text-2xl font-semibold mt-7">{title}</h2>
      {data && data.length > 0 ? (
        <div className={className}>
          {data.map((item, index) => {
            return (<div key={index}>
              <MemoizedBoxCard
                key={index}
                index={index}
                item={item}
                handleMusicClick={handleMusicClick}
                showLikeIcon={showLikeIcon}
                handleLikeToggle={handleLikeToggle}
                handleRating={handleRating}
                NAME={NAME}

              />
            </div>);
          })}
        </div>

      ) : (
        <NoDataFound name={message?.toString() || ''} />
      )}
    </>
  );
};

export default Box;
