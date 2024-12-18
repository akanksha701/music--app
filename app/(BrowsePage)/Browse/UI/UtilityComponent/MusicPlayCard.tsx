"use client";
import Image from "next/image";
import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import { IMusicPlayCardProps, IMusicProps } from "../../types/types";
import { FaEllipsisH, FaHeart, FaRegHeart } from "react-icons/fa";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useDispatch } from "react-redux";
import { setCurrentSongIndex, setCurrentTrack } from "@/Redux/features/musicPlayer/musicPlayerSlice"; // Adjust the path as necessary
import { redirect } from "next/navigation";
import { generateUrl } from "@/utils/helpers";

const MusicPlayCard = (props: IMusicPlayCardProps) => {
  const { data, name, handleLikeToggle } = props;
  
  const dispatch = useDispatch();
  
  const itemsPerPage = 10;
  const pages = Math.ceil(data?.length / itemsPerPage);

  const handleMusicClick = async (index: number, music: IMusicProps) => {
    dispatch(setCurrentTrack(data[index])); 
    dispatch(setCurrentSongIndex(index));
    const newUrl = await generateUrl('/Music', { type: name });
    redirect(newUrl)
};

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
                      className="cursor-pointer bg-white text-black rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105 group mb-3 ml-2"
                      style={{ height: "320px" }}
                    >
                      <CardBody className="flex flex-col items-center p-4 w-full h-full">
                        <div className="relative w-full h-2/3">
                          <Image
                            alt={item.name as string}
                            src={item.imageUrl as string}
                            fill
                            onClick={() => handleMusicClick(index,item)} // Use the handleMusicClick function
                            className="rounded-lg border-2 border-purple-500 shadow-md object-cover"
                          />
                        </div>

                        <div className="mt-4 w-full flex justify-between items-center">
                          <button
                            onClick={() => handleLikeToggle(item._id as string, name)}
                            className="group p-2 rounded-full bg-transparent border-0 outline-none cursor-pointer"
                          >
                            {item.liked ? (
                              <FaHeart className="text-red-500 transition-colors duration-300" />
                            ) : (
                              <FaRegHeart className="text-gray-500 transition-colors duration-300" />
                            )}
                          </button>

                          <span className="flex-1 text-center font-semibold text-lg sm:text-xl">
                            {item.name}
                          </span>

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
