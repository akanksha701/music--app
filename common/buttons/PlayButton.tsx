import React from 'react';
import PlayIcon from '@/public/images/icons8-circled-play-64.png';
import Image from 'next/image';
const PlayButton = () => {
  return (
    <Image src={PlayIcon} alt='play' width={64} height={64}/>
  );
};

export default PlayButton;