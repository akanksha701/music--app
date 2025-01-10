'use client';
import Box from '@/app/(BrowsePage)/Browse/UI/UtilityComponent/Card';
import { useGetnewMusicsQuery } from '@/services/music';
import { useSearchParams } from 'next/navigation';
import React from 'react';

const TopPlayList = () => {
  const searchParams = useSearchParams();
  const language = searchParams.get('language');
  const { data: newMusics } = useGetnewMusicsQuery(language);


 
  return <> 
    <div className="mt-3">
      <Box
        title={`New ${language || '' + 'Songs'}`}
        data={newMusics?.data}
        className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      />
    </div>
  </>;
};

export default TopPlayList;
