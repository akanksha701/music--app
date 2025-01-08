import React, { useMemo, useState } from 'react';
import { Card, CardBody } from '@nextui-org/react';
import Image from 'next/image';
import { IBoxTypes } from '../../types/types';
import { Rating } from '@mui/material';
import Link from 'next/link';

const AlbumGrid = ({ data, className, message }: IBoxTypes) => {
  const memoizedCards = useMemo(() => {
    return (
      <div className={`grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
        {data && data.length > 0 ? (
          data.map((item, index) => (
            <Card
              key={index}
              className="bg-white  border-2 border-solid border-[rgb(201, 201, 201)] shadow-none hover:shadow-[0px_0px_14px_0px_rgba(0,0,0,0.15)] text-black transition-all duration-300 ease-in-out hover:scale-[1.01] group rounded-xl cursor-pointer"
              style={{
                transition: 'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out',
              }}

            > 
              <Link href={`/Album/${item._id}?type=AlbumSongs`}>
                <CardBody className="flex flex-col justify-between w-full h-full p-0 ">

                  {/* Image */}
                  <div className="relative w-full h-60">
                    {item?.imageUrl ? (
                      <Image
                        src={item?.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover rounded-t-md"
                      />
                    ) : (
                      <p className="text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        No image available
                      </p>
                    )}
                  </div>

                  {/* Text Content */}
                  <div className="w-full flex flex-col px-4 py-2 flex-grow">
                    <span className="font-semibold text-xl truncate my-2">{item.name}</span>
                    <span className="text-sm" style={{
                      fontWeight: '400',
                      color: 'rgba(158, 158, 158, 1)'
                    }}>
                      {item.description}
                    </span>
                  </div>

                  {/* Footer section moved to bottom */}
                  <div className="mt-auto w-full">
                    {/* Rating */}
                    <div className="w-full flex justify-start py-2 px-4 pb-4">
                      <Rating
                        value={item.Rating}

                         
                        readOnly
                        sx={{
                          '& .MuiRating-iconFilled': {
                            color: 'rgba(255, 188, 3, 1)', 
                          },
                          '& .MuiRating-iconHover': {
                            color: 'rgba(255, 188, 3, 0.8)',  
                          },
                        }}
                      />
                    </div>

                    {/* Footer */}
                    <div className="w-full flex justify-between items-center px-4 py-2 pb-4">
                      <span className="text-sm text-gray-400 ">
                        {item.musicIds!.length}{' '}
                        {item.musicIds!.length === 1 ? 'song' : 'songs'}
                      </span>
                      <span className="text-sm text-[rgba(18, 18, 18, 1)] font-bold">
                        $  {item.Price}
                      </span>
                    </div>
                  </div>
                </CardBody>
              </Link>

            </Card>
          ))
        ) : (
          <p>{"..."}</p>
        )}
      </div>
    );
  }, [data, className]);

  return <>{memoizedCards}</>;
};

export default AlbumGrid; 