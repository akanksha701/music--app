"use client";
import React, { useCallback, useMemo } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@nextui-org/react";
import { IMenuProps } from "../types/types";
import { useNewRelease } from "@/hooks/useNewRelease";

export const MenubarComponent = (props: IMenuProps) => {
  const { data: languageList, handleClick } = props;
  const { language } = useNewRelease();
console.log(language,"----")
  const memoizedMenubar = useMemo(
    () => (
      <>
        <Carousel className="max-w-full">
          <CarouselContent className="flex gap-2">
            {languageList &&
              languageList.length > 0 &&
              languageList.map((item, index) => (
                <CarouselItem key={index} className="basis-1/3 flex-shrink-0">
                  <div className="p-1">
                    <Button
                      radius="full"
                      className={`font-light bg-white hover:bg-purple-400 text-black }`}
                      onClick={() => handleClick(item.name, index)}
                    >
                      {item?.name}
                    </Button>
                  </div>
                </CarouselItem>
              ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </>
    ),
    [handleClick,language]
  );

  return <> {memoizedMenubar} </>;
};

export default MenubarComponent;
