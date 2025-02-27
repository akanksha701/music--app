import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Button } from '@nextui-org/react';
import { IMenuProps } from '../types/types';
import { useSearchParams } from 'next/navigation';

const MenubarComponent = (props: IMenuProps) => {
  const searchParams = useSearchParams();
  const { data: languageList, handleClick } = props;
  const languageName = searchParams.get('language');
  return(<>
    <Carousel className="max-w-full">
      <CarouselContent className="flex gap-2">
        <CarouselItem className="basis-1/3 flex-shrink-0">
          <div className="p-1">
            <Button
              radius="full"
              className={`${
                !languageName ? 'bg-slate-200' : 'bg-white'
              } font-light text-black`}
              onClick={() => handleClick && handleClick()}
            >
              For you
            </Button>
          </div>
        </CarouselItem>
        {languageList &&
          languageList.length > 0 &&
          languageList.map((item, index) => {
            const isActive = languageName === item.name;
            return (
              <CarouselItem key={index} className="basis-1/3 flex-shrink-0">
                <div className="p-1">
                  <Button
                    radius="full"
                    className={`${
                      isActive ? 'bg-slate-200' : 'bg-white'
                    } font-light text-black`}
                    onClick={() => handleClick && handleClick(item.name, index)}
                  >
                    {item?.name}
                  </Button>
                </div>
              </CarouselItem>
            );
          })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  </>);
};

export default MenubarComponent;
