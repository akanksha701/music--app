import React, { useMemo } from 'react';
import { Card, CardBody } from '@nextui-org/react';
import Image from 'next/image'; // Importing the Image component from Next.js
import { BoxTypes } from '../../types/types';

const Box = (props: BoxTypes) => {
  const { data, className } = props;

  // Memoize the rendering of the cards
  const memoizedCards = useMemo(() => {
    return data.map((song, index) => (
      <Card
        key={index}
        className="bg-white text-black rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
      >
        <CardBody className="flex flex-col items-center p-4">
          <Image
            alt={song.name}
            src={song.image}
            width={180}
            height={180}
            className="rounded-lg border-4 border-purple-500 shadow-md object-cover"
          />
          <p className="mt-2 text-center font-semibold text-xl">
            {song.name}
          </p>
        </CardBody>
      </Card>
    ));
  }, [data]); 

  return <div className={className}>{memoizedCards}</div>;
};

export default Box;
