import React from 'react';
import Image from 'next/image'; 
import { ICreatorsAndArtists } from '../../types/types';
 

const CreatorsAndArtists = (props: ICreatorsAndArtists) => {
  const { creatorsAndArtists,title } = props;

  return (
    <div className="flex flex-col rounded-lg mt-10 px-4 md:px-10">
      <h3 className="text-center text-3xl font-semibold text-slate-900 mb-8 sm:text-4xl md:text-5xl 
      lg:text-3xl text-transparent bg-gradient-to-r from-purple-600 via-indigo-500 to-pink-500 bg-clip-text">
        {title}
      </h3>

      {creatorsAndArtists.map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center mt-10"
        >
          <div
            className={`flex flex-row items-center justify-between w-full max-w-4xl mx-auto mt-10 ${
              index % 2 !== 0 ? 'flex-row-reverse' : ''
            }`}
          >
            <div className="mx-10 w-1/2 relative h-64 sm:h-80">
              <Image
                src={item.imageUrl}
                alt={item.title}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>

            <div className="mx-10 w-1/2">
              <p className="text-2xl font-semibold">{item.title}</p>
              <p className="mt-4 text-lg text-gray-600">{item.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CreatorsAndArtists;
