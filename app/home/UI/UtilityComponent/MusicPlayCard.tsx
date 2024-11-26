import { Card, CardBody } from '@nextui-org/react';
import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';
import PlayButton from '@/common/buttons/PlayButton';
import { MusicPlayCardProps } from '../../types/types';

const MusicPlayCard = (props: MusicPlayCardProps) => {
  const router = useRouter();
  const { data } = props;
  return (
    <>
      {data.length > 0 &&
        data.map((item, index: number) => (
          <Card
            shadow='sm'
            key={index}
            isPressable
            className='bg-transparent '
            onClick={() => {
              router.push('/music');
            }}
          >
            <CardBody className='overflow-visible p-0'>
              <Image
                alt={item.name || ''}
                className='w-full object-cover h-[190px] hover:scale-125 transition-all duration-500 cursor-pointer'
                src={item?.coverUrl || ''}
                width={400}
                height={400}
              />
              <div className='absolute bottom-0 ml-8 mb-4'>
                <PlayButton />
                <div className='flex flex-col ml-4'>
                  <p className='relative align-end text-white text-lg font-bold '>
                    {item.name || ''}
                  </p>
                  <p className='relative align-end text-white  font-bold opacity-50'>
                    {item.artist || ''}
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
    </>
  );
};

export default MusicPlayCard;
