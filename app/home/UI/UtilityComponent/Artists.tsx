import React, { useMemo } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { IArtistProps } from "../../types/types";

const Artists = (props: IArtistProps) => {
  const { artistsData } = props;
  const meorizedArtist = useMemo(
    () => (
      <div className="w-full mt-10 flex flex-col items-center justify-center rounded-md">
        <h3 className="text-center text-3xl font-semibold text-slate-900 ">
          Every mood has a sound
        </h3>
        <div className="rounded-md h-[500px] w-full sm:w-[300px] md:w-[350px] lg:w-[1050px] p-10 bg-yellow-500 bg-opacity-25 opacity-100 overflow-y-auto scroll-smooth mt-10 mb-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5 gap-4 items-center justify-center">
          {artistsData.map((mood, index) => (
            <Card
              className=" cursor-pointer outline-dashed outline-offset-5 outline-indigo-600 hover:translate-y-1 rounded-md"
              key={index}
            >
              <CardContent className="relative h-[200px] w-full   rounded-md">
                <Image
                  alt="Mood Image"
                  fill
                  className="object-cover w-full h-full rounded-md "
                  src={mood.imageUrl}
                />
              </CardContent>
              <CardFooter className="flex justify-center rounded-md mt-2 p-2">
                {mood.mood}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    ),
    [artistsData]
  );
  return meorizedArtist;
};

export default Artists;
