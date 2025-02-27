'use client';
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import { Name, useSelectCard } from '@/hooks/useSelectCard';

interface ICategoryProps
{
  title:string
  genreList:Array<{
    id:string,
    name:string,
    imageUrl:string
  }>
}

const CategoryCard = (props: ICategoryProps) => {
  const { genreList, title } = props;
  const { selectedIndexCategory, setSelectedIndex } = useSelectCard();
  
  return <>
    <div className="mt-10 w-full flex flex-col items-center justify-center rounded-md">
      <h3 className="text-center text-3xl font-semibold text-slate-900 ">
        {title}
      </h3>
      <div className="rounded-md h-[500px] w-full sm:w-[300px] md:w-[450px] lg:w-[1250px] 
         p-10 bg-indigo-600 bg-opacity-25 opacity-100 overflow-y-auto scroll-smooth mt-10  
         grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 items-center justify-center">
        {genreList.map((mood, index) => {
          const bgColor =
              selectedIndexCategory === index
                ? 'bg-purple-600 text-white'
                : 'bg-white';
          return (
            <Card
              key={index}
              onClick={() =>
                setSelectedIndex(index, Name.Category, mood?.name)
              }
              className={`cursor-pointer outline-dashed outline-offset-5 outline-yellow-500 
                  hover:translate-y-1 rounded-md ${bgColor}`}
            >
              <CardContent className="relative h-[200px] w-full rounded-md">
                <Image
                  alt="Mood Image"
                  fill
                  className="object-cover w-full h-full rounded-md"
                  src={mood.imageUrl}
                />
              </CardContent>
              <CardFooter className="flex justify-center rounded-md mt-2 p-2">
                {mood.name}
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  </>;
};

export default CategoryCard;
