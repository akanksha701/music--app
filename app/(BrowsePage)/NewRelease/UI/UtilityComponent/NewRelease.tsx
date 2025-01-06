'use client';
import { IMusicProps, TAGS } from '@/app/(BrowsePage)/Browse/types/types';
import Box from '@/app/(BrowsePage)/Browse/UI/UtilityComponent/Card';
import { handleLikeToggle } from '@/hooks/useLike';
import { RootState } from '@/Redux/store';
import { useGetAllMusicsQuery, useToggleLikeMutation } from '@/services/like';
import { useSearchParams } from 'next/navigation';
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const NewRelease = () => {
  const searchParams = useSearchParams();
  const language = searchParams.get('language');
  const queryParams = new URLSearchParams();
  const [toggleLike] = useToggleLikeMutation();
  const dispatch = useDispatch();
  const currentTrack = useSelector<RootState, IMusicProps | null>( (state) => state.musicPlayerSlice.currentTrack);

  if (language) queryParams.append('language', language);
  const { data: newReleases } = useGetAllMusicsQuery({
    queryParams: queryParams.toString(),
  });


  const memorizedNewRelease = useMemo(
    () => (
      <>
        <div className="mt-3">
          <Box
            title={`New ${language || '' + 'Songs'}`}
            data={newReleases?.data?.data}
            className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            name={TAGS.MUSIC}
            showLikeIcon={true}
            message={'musics not found'}
            handleLikeToggle={(itemId) =>handleLikeToggle(itemId, TAGS.MUSIC, toggleLike,currentTrack as IMusicProps,dispatch)}
          />
        </div>
      </>
    ),
    [newReleases]
  );
  return <> {memorizedNewRelease}</>;
};

export default NewRelease;
