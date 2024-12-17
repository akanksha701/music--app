import React from "react";
import Image from "next/image";
import { FaBackward, FaForward, FaPause, FaPlay } from "react-icons/fa";

const MusicPlayer = ({
  currentTrack,
  ref,
  isPlaying,
  currentTime,
  togglePlayPause,
  handleTimeSeek,
}: any) => {
  return (
    <>
      <div className="w-full bg-black p-4 flex items-center space-x-4"> {/* Increase space between divs */}
        {/* Track Image */}
        <div className="flex-shrink-0">
          <Image
            src={currentTrack?.imageUrl || "/default-image.jpg"}
            alt="Track Image"
            width={80}
            height={80}
            className="rounded-md p-2"
          />
        </div>

        {/* Track Info */}
        <div className="flex-shrink-0 mr-3"> {/* Adjusted margin */}
          <p className="text-white text-sm">
            {currentTrack?.name || "No Track Selected"}
          </p>
          <p className="text-gray-400 text-xs">
            {currentTrack?.artists || "Unknown Artist"}
          </p>
        </div>

        {/* Play/Pause and Navigation Buttons */}
        <div className="flex items-center mx-3"> {/* Adjusted margin */}
          <FaBackward size={20} color="white" />
          <div className="cursor-pointer mx-3" onClick={togglePlayPause}>
            {isPlaying ? (
              <FaPause size={20} color="white" />
            ) : (
              <FaPlay size={20} color="white" />
            )}
          </div>
          <FaForward size={20} color="white" />
        </div>

        {/* Current Time */}
        <div className="flex items-center mx-3"> {/* Adjusted margin */}
          <p className="text-small text-slate-600 bg-slate-300 rounded-md p-1">
            {currentTime}
          </p>
        </div>

        <div
          ref={ref}
          className="cursor-pointer bg-gray-600 mx-4 rounded-lg w-full h-50"
          onClick={handleTimeSeek}
        ></div>
      </div>
    </>
  );
};

export default MusicPlayer;
