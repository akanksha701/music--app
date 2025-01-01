import React from 'react';

const PlayerLabel = ({ title, artists, textColor }: any) => {
  return (
    <>
      <p className={`text-${textColor} text-sm`}>
        {title || 'No Track Selected'}
      </p>
      <p className="text-gray-400 text-xs">{artists || 'Unknown Artist'}</p>
    </>
  );
};

export default PlayerLabel;
