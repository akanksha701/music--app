import { IVolumeProps } from '@/app/Music/types/types';
import React from 'react';
import { IoVolumeHighSharp, IoVolumeMuteSharp } from 'react-icons/io5';
 

const VolumeIcon = (props: IVolumeProps) => {
  const { isMuted, handleClick } = props;
  return (
    <>
      {isMuted ? (
        <IoVolumeMuteSharp size={24} color="white" onClick={handleClick} />
      ) : (
        <IoVolumeHighSharp size={24} color="white" onClick={handleClick} />
      )}
    </>
  );
};

export default VolumeIcon;
