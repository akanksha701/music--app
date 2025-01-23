'use client';
import ButtonWithIcon from '@/common/buttons/ButtonWithIcon';
import { redirect } from 'next/navigation';
import React from 'react';

const ReadMore = () => {
  
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="w-30 p-2">
        <ButtonWithIcon
          text='Read More'
          className='bg-electric-purple'
          onClick={()=>  redirect('/FAQ')}
        />
      </div>
    </div>
  );
};

export default ReadMore;
