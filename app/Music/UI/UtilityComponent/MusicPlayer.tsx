import React from "react";
import Image from "next/image";
import PlayerButtons from "./PlayerButtons";
import PlayerLabel from "./PlayerLabel";
import WaveComp from "./WaveComp";

const MusicPlayer = ({
  currentTrack,
  isPlaying,
  currentTime,
  togglePlayPause,
  handleTimeSeek,
  ref,
  seekPercentage
}: any) => {
 
  return (
    <div className="w-full bg-black p-4 flex items-center space-x-4">
      <div className="flex-shrink-0">
        <Image
          src={currentTrack?.imageUrl || "/default-image.jpg"}
          alt="Track Image"
          width={80}
          height={80}
          className="rounded-md p-2"
        />
      </div>
      <div className="flex-shrink-0 mr-3">
        <PlayerLabel
          title={currentTrack?.name || "Unknown Track"}
          artists={currentTrack?.artists || ""}
        />
      </div>
      <div className="flex items-center mx-3">
        <PlayerButtons isPlaying={isPlaying} handleClick={togglePlayPause} />
      </div>
      <div className="flex items-center mx-3">
        <p className="text-small text-slate-600 bg-slate-300 rounded-md p-1">
          {currentTime || 0}
        </p>
      </div>
      <WaveComp seekPercentage ={seekPercentage}ref={ref}handleClick={handleTimeSeek} />
    </div>
  );
};

export default MusicPlayer;
