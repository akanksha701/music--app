"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const CarouselPopularTracks = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  // Array of video elements
  const videos = [
    <video className="w-full" autoPlay loop muted key="video-1">
      <source
        src="https://tecdn.b-cdn.net/img/video/Tropical.mp4"
        type="video/mp4"
      />
    </video>,
    <video className="w-full" autoPlay loop muted key="video-2">
      <source
        src="https://tecdn.b-cdn.net/img/video/forest.mp4"
        type="video/mp4"
      />
    </video>,
    <video className="w-full" autoPlay loop muted key="video-3">
      <source
        src="https://tecdn.b-cdn.net/img/video/Agua-natural.mp4"
        type="video/mp4"
      />
    </video>,
    <video className="w-full" autoPlay loop muted key="video-1">
      <source
        src="https://tecdn.b-cdn.net/img/video/Tropical.mp4"
        type="video/mp4"
      />
      ,
    </video>,
    <video className="w-full" autoPlay loop muted key="video-2">
      <source
        src="https://tecdn.b-cdn.net/img/video/forest.mp4"
        type="video/mp4"
      />
    </video>,
    <video className="w-full" autoPlay loop muted key="video-3">
      <source
        src="https://tecdn.b-cdn.net/img/video/Agua-natural.mp4"
        type="video/mp4"
      />
    </video>,
  ];

  return (
    <Carousel
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {videos.map((video, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
            <div>
              {/* <Card> */}
                {/* <CardContent className="flex aspect-square items-center justify-center p-6"> */}
                  {video}
                {/* </CardContent> */}
              {/* </Card> */}
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
