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
import { redirect } from "next/navigation";
import queryString from "query-string";

export const MenubarComponent = (props: IMenuProps) => {
  const { data: languageList } = props;
  const { setSelectedLanguage, language, activeButtonIndex } = useNewRelease();

  const handleClick = useCallback(
    (value: string, index: number) => {
      const newUrl = queryString.stringifyUrl(
        {
          url: "http://localhost:3000/NewRelease",
          query: { language: value },
        },
        { skipNull: true }
      );
      setSelectedLanguage(value, index);
      redirect(newUrl);
    },
    [setSelectedLanguage, redirect]
  );

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
    [language]
  );

  return <> {memoizedMenubar} </>;
};

export default MenubarComponent;
