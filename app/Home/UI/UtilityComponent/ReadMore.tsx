'use client';
import Button from '@/common/buttons/Button';
import { redirect } from 'next/navigation';
import React from 'react';

const ReadMore = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="w-30 p-2">
        <Button name="Read More" onClick={() => redirect('/FAQ')} />
      </div>
    </div>
  );
};

export default ReadMore;
