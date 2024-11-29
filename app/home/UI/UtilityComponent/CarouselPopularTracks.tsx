"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { ICarousalProps } from "../../types/types";

const CarouselPopularTracks = (props: ICarousalProps) => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  const { data } = props;
  return (
    <Carousel
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {data.map((video, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
            <div>
              <video className="w-full" autoPlay loop muted key={index}>
                <source src={video} type="video/mp4" />
              </video>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default CarouselPopularTracks;
