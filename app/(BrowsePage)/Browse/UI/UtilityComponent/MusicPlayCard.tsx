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

const MusicPlayCard = (props: IMusicPlayCardProps) => {
  const router = useRouter();
  const { data } = props;
  const itemsPerPage=8
  const pages = Math.ceil(data.length / itemsPerPage);

  return (
    <div className="p-10">
      <Carousel>
        <CarouselContent>
          {Array.from({ length: pages }).map((_, pageIndex) => (
            <CarouselItem key={pageIndex}>
              <div className="grid grid-cols-4 gap-6">
                {data
                  .slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage)
                  .map((item, index) => (
                    <Card
                      key={index}
                      shadow="sm"
                      isPressable
                      className="bg-transparent"
                      onClick={() => {
                        router.push("/music");
                      }}
                    >
                      <CardBody className="overflow-visible p-0 relative">
                        <Image
                          alt={item.name || ""}
                          className="w-full object-cover h-[190px] hover:scale-125 transition-all duration-500 cursor-pointer"
                          src={item?.coverUrl || ""}
                          width={400}
                          height={400}
                        />
                        <div className="absolute bottom-0 ml-8 mb-4">
                          <PlayButton />
                          <div className="flex flex-col ml-4">
                            <p className="relative align-end text-white text-lg font-bold">
                              {item.name || ""}
                            </p>
                            <p className="relative align-end text-white font-bold opacity-50">
                              {item.artist || ""}
                            </p>
                          </div>
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
