import { Card, CardBody } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import PlayButton from "@/common/buttons/PlayButton";
import { IMusicPlayCardProps } from "../../types/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FaEllipsisH, FaRegHeart } from "react-icons/fa";

const MusicPlayCard = (props: IMusicPlayCardProps) => {
  const router = useRouter();
  const { data } = props;
  const itemsPerPage = 8;
  const pages = Math.ceil(data.length / itemsPerPage);

  return (
    <div className="p-4 sm:p-6 md:p-10">
      <Carousel>
        <CarouselContent>
          {Array.from({ length: pages }).map((_, pageIndex) => (
            <CarouselItem key={pageIndex}>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                {data
                  .slice(
                    pageIndex * itemsPerPage,
                    (pageIndex + 1) * itemsPerPage
                  )
                  .map((item, index) => (
                    <Card
                    key={index}
                    className="bg-white text-black rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105 group"
                    style={{ width: "220px", height: "320px" }}
                  >
                    <CardBody className="flex flex-col items-center p-4 w-full h-full">
                      {/* Image Section */}
                      <div className="relative w-full h-2/3">
                        <Image
                          alt={item.name}
                          src={item.imageUrl}
                          fill
                          className="rounded-lg border-2 border-purple-500 shadow-md object-cover"
                        />
                      </div>
        
                      {/* Text and Icons Section */}
                      <div className="mt-4 w-full flex justify-between items-center">
                        {/* Heart button */}
                        <FaRegHeart className="text-red-500 cursor-pointer opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300" />
        
                        {/* Song Name */}
                        <span className="flex-1 text-center font-semibold text-xl">
                          {item.name}
                        </span>
        
                        {/* Ellipsis button */}
                        <FaEllipsisH className="cursor-pointer opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300" />
                      </div>
                    </CardBody>
                  </Card>
                  ))}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default MusicPlayCard;
