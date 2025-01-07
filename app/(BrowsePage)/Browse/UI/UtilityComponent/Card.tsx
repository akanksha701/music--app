import React, { useMemo } from "react";
import { Card, CardBody } from "@nextui-org/react";
import Image from "next/image";
import { IBoxTypes, IMusicProps } from "../../types/types";
import { FaRegHeart, FaEllipsisH, FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentList,
  setCurrentSongIndex,
  setCurrentTrack,
} from "@/Redux/features/musicPlayer/musicPlayerSlice";
import { RootState } from "@/Redux/store";
import { generateUrl } from "@/utils/helpers";
import { redirect } from "next/navigation";
import Link from 'next/link';

const Box = ({
  data,
  className,
  title,
  name,
  showLikeIcon,
  message,
  handleLikeToggle,
}: IBoxTypes) => {
  const dispatch = useDispatch();
  const currentTrack = useSelector<RootState, IMusicProps | null>(
    (state) => state.musicPlayerSlice.currentTrack
  );

  const GetUrl = (item : any) => {
    console.log("name : " , name)
    switch (name) {
      case "Album": 
        return `/Album/${item._id}?type=AlbumSongs`;
      case "Genres" : 
        return `/Genre/${item._id}?type=GenreSongs`;
      default:
        return ''
    } 
 
  }

  const handleMusicClick = async (index: number, music: IMusicProps) => {
    if(name === "Album" || "Genres"){
      return 
    }
    dispatch(setCurrentList(data));
    if (!currentTrack || currentTrack._id !== music._id) {
      dispatch(setCurrentTrack(data[index]));
      dispatch(setCurrentSongIndex(index));
    }
    const newUrl = await generateUrl("/Music", { type: name });
    redirect(newUrl);
  };
  const memoizedCards = useMemo(() => {
    return (
      <div className={className}>
        {data && data.length > 0 ? (
          data?.map((item, index) => (
            <Link key={index} href={GetUrl(item)} >
            <Card
              key={index}
              className="bg-white text-black rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105 group"
              style={{ width: '220px', height: '220px'   }}
            >
              <CardBody className="flex flex-col items-center p-4 w-full h-full">
                <div className="relative w-full h-2/3">
                  <Image
                    alt={item.name || ""}
                    src={
                      (item?.imageUrl as string) ||
                      "/music/images/Audio Waves.png"
                    }
                    fill
                    onClick={()=> handleMusicClick(index,item as IMusicProps)}
                    className="rounded-lg border-2 border-purple-500 shadow-md object-cover cursor-pointer"
                  />
                </div>
                <div className="mt-4 w-full flex justify-between items-center">
                  {showLikeIcon && (
                    <button
                      onClick={() =>
                        handleLikeToggle && handleLikeToggle(item._id, name)
                      }
                      className="p-2 rounded-full bg-transparent border-0 outline-none cursor-pointer"
                    >
                      {item.liked ? (
                        <FaHeart className="text-red-500 transition-colors duration-300" />
                      ) : (
                        <FaRegHeart className="text-gray-500 transition-colors duration-300" />
                      )}
                    </button>
                  )}

                  <span className="flex-1 text-center font-semibold text-xl truncate px-2">
                    {item.name}
                  </span>

                  <button className="p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <FaEllipsisH className="cursor-pointer" />
                  </button>
                </div>
              </CardBody>
            </Card>
            </Link>
            
          ))
        ) : (
          <p>{message}</p>
        )}
      </div>
    );
  }, [data, className]);

  return (
    <>
      <h2 className="text-2xl font-semibold mt-7">{title}</h2>
      {memoizedCards}
    </>
  );
};

export default Box;
