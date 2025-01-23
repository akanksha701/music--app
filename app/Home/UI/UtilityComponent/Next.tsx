'use client';
import ButtonWithIcon from '@/common/buttons/ButtonWithIcon';
import { useSelectCard } from '@/hooks/useSelectCard';
import { redirect } from 'next/navigation';
import queryString from 'query-string';
import React from 'react';

const Next = ({ appURL }: { appURL: string }) => {
  const { artist, category } = useSelectCard();
  const url = queryString.stringifyUrl(
    {
      url: `${appURL}/Browse`,
      query: {
        artist: artist,
        catgeory: category,
      },
    },
    { skipNull: true }
  );

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="w-30 p-2">
        <ButtonWithIcon
          text='Next'
          className='bg-electric-purple'
          onClick={() => redirect(url)}
        />
      </div>
    </div>
  );
};

export default Next;
