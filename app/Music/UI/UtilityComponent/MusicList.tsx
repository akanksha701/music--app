import React from "react";
import Image from "next/image";
import { IMusicProps } from "@/app/(BrowsePage)/Browse/types/types";
import { IMusicListProps } from "../../types/types";
import PlayerButtons from "./PlayerButtons";
import PlayerLabel from "./PlayerLabel";
import { IoAddSharp, IoVolumeMediumSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { GoDownload } from "react-icons/go";
import { FiShoppingCart } from "react-icons/fi";
import VolumeIcon from "./VolumeIcon";
import { formatTime } from "@/hooks/useWaveSurfer";
import WaveComp from "./WaveComp";

const MusicList = ({ data, title }: IMusicListProps) => {
  const renderedTracks =
    data && data.length > 0 ? (
      data.map((track: IMusicProps,index:number) => (
        <div key={index} className="w-full bg-black p-2 flex flex-row items-center justify-between gap-4  left-0">
          <div className="w-10 h-10 mb-2 sm:mb-0 overflow-hidden">
            <Image
              src={track?.imageUrl || "/default-image.jpg"}
              alt="Track Image"
              width={80}
              height={80}
              className="rounded-md w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-row items-center flex-1 space-x-4">
            <div className="text-left ">
              <PlayerLabel
                title={track?.name || "Unknown Track"}
                artists={track?.artists || ""}
              />
            </div>

            <PlayerButtons
              isPlaying={false}
              selectedMusicIndex={1}
              handlePlayPause={() => {}}
              data={data}
            />

            <p className="text-small text-slate-600 bg-slate-300 rounded-md p-1">
              {formatTime(0) || "0:00"}
            </p>

            <WaveComp
              seekPercentage={1}
              ref={null}
              handleClick={()=>{}}
            />

            <p className="text-small text-slate-600 bg-slate-300 rounded-md p-1">
              {formatTime(0) || "0:00"}
            </p>

            <div className="flex flex-row items-center mt-2">
              <VolumeIcon isMuted={false} handleClick={()=> {}} />
              <div className="flex flex-row mx-20  ">
                <FaHeart
                  // onClick={handleLikeClick}
                  size={15}
                  color={track.liked ? "red" : "white"}
                  className="cursor-pointer"
                />

                <IoAddSharp
                  size={24}
                  color="white"
                  className="cursor-pointer mx-2"
                />
                <button className="bg-yellow-500 rounded-full p-1 mx-2">
                  <GoDownload size={20} color="black" />
                </button>
                <FiShoppingCart
                  size={15}
                  color="white"
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
        // <div
        //   key={track._id}
        //   className="w-full bg-black p-2 flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 gap-4 left-0"
        // >
        //   <div className="w-10 h-10 mb-2 sm:mb-0 overflow-hidden">
        //     <Image
        //       src={track?.imageUrl || "/default-image.jpg"}
        //       alt="Track Image"
        //       width={80}
        //       height={80}
        //       className="rounded-md w-full h-full object-cover"
        //     />
        //   </div>
        //   <div className="flex flex-col sm:flex-row items-center flex-1 space-y-2 sm:space-y-0 sm:space-x-4">
        //     <div className="text-center sm:text-left flex-1">
        //       <PlayerLabel
        //         title={track?.name || "Unknown Track"}
        //         artists={track?.artists || ""}
        //       />
        //     </div>
        //     <div className="flex items-center justify-center space-x-4 mt-2 mx-4">
        //       <IoVolumeMediumSharp size={15} color="white" />

        //       <FaHeart
        //         // onClick={handleLikeClick}
        //         size={15}
        //         color={track.liked ? "red" : "white"}
        //         className="cursor-pointer"
        //       />

        //       <IoAddSharp size={15} color="white" className="cursor-pointer" />

        //       <button className="bg-yellow-500 rounded-full p-1">
        //         <GoDownload size={15} color="black" />
        //       </button>

        //       <FiShoppingCart
        //         size={15}
        //         color="white"
        //         className="cursor-pointer"
        //       />
        //     </div>
        //   </div>
        // </div>
      ))
    ) : (
      <p className="text-gray-400">No other data available</p>
    );

  return (
    <div>
      <h3 className="text-purple-400 text-xl font-semibold">{title}</h3>
      {renderedTracks}
    </div>
  );
};

export default MusicList;
