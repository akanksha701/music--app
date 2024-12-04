import React, { useMemo } from "react";
import { Card, CardBody } from "@nextui-org/react";
import Image from "next/image"; // Importing the Image component from Next.js
import { IBoxTypes } from "../../types/types";
import { FaRegHeart, FaEllipsisH } from "react-icons/fa";

const Box = (props: IBoxTypes) => {
  const { data, className, title } = props;

  const memoizedCards = useMemo(() => {
    return (
      <div className={className}>
        {data.map((song, index) => (
          <Card
            key={index}
            className="bg-white text-black rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105 group"
          >
            <CardBody className="flex flex-col items-center p-4">
              <Image
                alt={song.name}
                src={song.image}
                width={180}
                height={180}
                className="rounded-lg border-2 border-purple-500 shadow-md object-cover"
              />
              <div className="mt-4 w-full flex justify-between items-center">
                <FaRegHeart className="text-red-500 cursor-pointer opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300" />
                <span className="flex-1 text-center font-semibold text-xl">
                  {song.name}
                </span>
                <FaEllipsisH className="cursor-pointer opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300" />
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    );
  }, [data]);

  return (
    <>
      <h2 className="text-2xl font-semibold mt-7">{title}</h2>
      {memoizedCards}
    </>
  );
};

export default Box;
