import React from 'react';
import Skeleton from '@mui/material/Skeleton';

interface SkeletonGridProps {
  count: number;
}
const SkeletonGrid: React.FC<SkeletonGridProps> = ({ count }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6'>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className='p-4'>
          <>
            <Skeleton variant='rectangular' width='100%' height={150} />
            <Skeleton variant='text' className='mt-2' />
            <Skeleton variant='text' />
          </>
        </div>
      ))}
    </div>
  );
};

export default SkeletonGrid;
