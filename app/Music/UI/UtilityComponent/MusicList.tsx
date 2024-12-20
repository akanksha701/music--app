import React, { useRef } from "react";
import { IMusicProps } from "@/app/(BrowsePage)/Browse/types/types";
import { IMusicListProps } from "../../types/types";
import PlayerLabel from "./PlayerLabel";
import { IoAddSharp } from "react-icons/io5";
import { FaHeart, FaPlay, FaRegHeart } from "react-icons/fa";
import { GoDownload } from "react-icons/go";
import { FiShoppingCart } from "react-icons/fi";
import useWaveSurfer from "@/hooks/customHooks/useWaveSurfer";
import WaveComp from "./WaveComp";

const MusicList = ({ data, title }: IMusicListProps) => {
  const { waveformRef } = useWaveSurfer();
  const renderedTracks =
    data && data.length > 0 ? (
      data.map((track: IMusicProps, index: number) => (
        <div key={index} className="w-full p-2 flex flex-row items-center">
          <div className="flex flex-row items-center flex-1">
            <button className="border border-white rounded-full p-2 mx-2 my-2">
              <FaPlay size={12} color="white" />
            </button>
            <div className="text-left flex-1">
              <PlayerLabel
                title={track?.name || "Unknown Track"}
                artists={track?.artists || ""}
              />
            </div>
            <div
              ref={waveformRef}
              className="cursor-pointer mx-4 rounded-lg w-1/2 h-50"
            ></div>
            <p className="text-xs text-slate-600 bg-transparent rounded-md my-2 ml-4 mx-5">
              {track?.duration || "0:00"}
            </p>

            {track?.liked ? (
              <FaHeart className="text-red-500 transition-colors duration-300" />
            ) : (
              <FaRegHeart className="text-red-500 transition-colors duration-300" />
            )}
            <IoAddSharp
              size={16}
              color="white"
              className="cursor-pointer mx-2"
            />
            <button className="bg-yellow-500 rounded-full p-1 mx-2">
              <GoDownload size={20} color="black" />
            </button>
            <FiShoppingCart
              size={16}
              color="white"
              className="cursor-pointer mx-2"
            />
          </div>
        </div>
      ))
    ) : (
      <p className="text-gray-400">No other data available</p>
    );

  return (
    <>
      <div className=" bg-black ">
        <h3 className="text-white text-2xl font-semibold  mx-2 p-5">{title}</h3>
        <hr className="w-full p-2 border-gray-600" />
        {/* <WaveComp     ref={waveformRef}/> */}
        {renderedTracks}
      </div>
    </>
  );
};

export default MusicList;
