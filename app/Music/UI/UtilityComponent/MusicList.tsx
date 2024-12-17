import React, { useMemo } from "react";
import Image from "next/image";
import { FaHeart, FaPause, FaRegHeart } from "react-icons/fa";
import { IMusicProps } from "@/app/(BrowsePage)/Browse/types/types";
import { IMusicListProps } from "../../types/types";

const MusicList = ({ data, title }: IMusicListProps) => {
  const renderedTracks = useMemo(() => {
    if (!data || data.length === 0) {
      return <p className="text-gray-400">No other data available</p>;
    }
    return data.map((track: IMusicProps) => (
      <div
        key={track._id}
        className="flex items-center cursor-pointer p-2 hover:bg-orange-300 rounded-lg"
      >
        <Image
          src={track.imageUrl}
          alt="Track Image"
          width={60}
          height={60}
          className="rounded-md"
        />
        <div className="flex-1 ml-4">
          <p className="text-black text-sm">{track.name}</p>
          <p className="text-gray-400 text-xs">{track.artists}</p>
        </div>
        <div>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mt-4 mx-2 my-2">
            <button className="p-2 bg-green-500 text-black rounded-full hover:bg-green-600 transition duration-300">
              <FaPause size={20} />
            </button>
            {track.liked ? (
              <FaHeart
                size={20}
                className="text-red-500 transition-colors duration-300"
              />
            ) : (
              <FaRegHeart
                size={20}
                className="text-gray-500 transition-colors duration-300"
              />
            )}
          </div>
        </div>
      </div>
    ));
  }, [data]); 

  return (
    <div className="mt-6 mb-10">
      <h3 className="text-purple-400 text-xl font-semibold">{title}</h3>
      <div className="flex flex-col space-y-4 py-4 max-h-60 overflow-y-auto">
        {renderedTracks}
      </div>
    </div>
  );
};

export default MusicList;
