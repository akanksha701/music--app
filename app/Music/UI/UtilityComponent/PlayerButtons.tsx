import React from "react";
import { FaBackward, FaForward, FaPause, FaPlay } from "react-icons/fa";

const PlayerButtons = ({ isPlaying, handleClick }: any) => {
  return (
    <>
      <FaBackward size={20} color="white" />
      <div className="cursor-pointer mx-3" onClick={handleClick}>
        {isPlaying ? (
          <FaPause size={20} color="white" />
        ) : (
          <FaPlay size={20} color="white" />
        )}
      </div>
      <FaForward size={20} color="white" />
    </>
  );
};

export default PlayerButtons;
