import React from "react";
import Image from "next/image";
import { useGetTopHitsMusicsQuery } from "@/services/like";

const MusicList = ({ tracks }: IMusicListProps) => {
 if(!tracks)
 {
    return null
 }
 console.log(tracks,"tracks")
  return (
    <div className="mt-6 mb-10">
      <h3 className="text-purple-400 text-xl font-semibold">Other Tracks</h3>
      <div className="flex flex-col space-y-4 py-4 max-h-60 overflow-y-auto">
        {tracks && tracks.length > 0 ? (
          tracks.map((track: any) => (
            <div
              key={track.id}
              className="flex items-center cursor-pointer p-2 hover:bg-gray-800 rounded-lg"
              // onClick={() => setCurrentTrack(track)} // Set the track on click
            >
              <Image
                src={track.imageUrl}
                alt="Track Image"
                width={60}
                height={60}
                className="rounded-md"
              />
              <div className="ml-4">
                <p className="text-black text-sm">{track.name}</p>
                <p className="text-gray-400 text-xs">{track.artists}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No other tracks available</p>
        )}
      </div>
    </div>
  );
};

export default MusicList;
