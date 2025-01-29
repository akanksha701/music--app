import React from 'react';
import { FaStar } from 'react-icons/fa';

export const AverageStarDisplay = ({avgRating}:{avgRating?:number}) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <FaStar
          key={i}
          size={16}
          className={i < Math.floor(avgRating || 0) ? 'text-yellow-500' : 'text-gray-300'}
        />
      ))}
    </div>
  );
};

export default AverageStarDisplay;