'use client';
import React from 'react';

const HeadLine = ({ title, subTitle }: { title: string, subTitle: string }) => {
  return (
    <div className='  flex items-center  m-3'>
      <h3 className='text-4xl font-bold mb-2'>{title}</h3>
      <h6 className='text-2xl opacity-50 mx-4'>({subTitle})</h6>
    </div>
  );
};

export default HeadLine;