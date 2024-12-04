import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@nextui-org/react";
const languages = [
  { id: 1, name: "For you" },
  { id: 2, name: "Spanish" },
  { id: 3, name: "Mandarin" },
  { id: 4, name: "Hindi" },
  { id: 5, name: "Arabic" },
  { id: 6, name: "French" },
  { id: 7, name: "German" },
  { id: 8, name: "Portuguese" },
  { id: 9, name: "Russian" },
  { id: 10, name: "Japanese" },
  { id: 11, name: "Korean" },
  { id: 12, name: "Italian" },
  { id: 13, name: "Dutch" },
  { id: 14, name: "Turkish" },
  { id: 15, name: "Vietnamese" },
  { id: 16, name: "Polish" },
  { id: 17, name: "Ukrainian" },
  { id: 18, name: "Romanian" },
  { id: 19, name: "Greek" },
  { id: 20, name: "Czech" },
];

const MenubarComponent = () => {
  return (
    <Carousel className="max-w-full">
      <CarouselContent className="flex gap-2">
        {languages.map((language, index) => (
          <CarouselItem key={index} className="basis-1/3 flex-shrink-0">
            <div className="p-1">
              <Button
                radius="full"
                className="font-light  bg-white hover:bg-slate-300  text-black  "
              >
                {language.name}
              </Button>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default MenubarComponent;
