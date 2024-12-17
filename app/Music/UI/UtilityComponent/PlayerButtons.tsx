import React from "react";
import { FaBackward, FaForward, FaPause, FaPlay } from "react-icons/fa";
import { IPlayerButtonsProps } from "../../types/types";

const PlayerButtons = ({ isPlaying, handleClick,playNextPrevious }: IPlayerButtonsProps) => {
  return (
    <>
      <FaBackward size={20} color="white"  className='cursor-pointer' onClick={playNextPrevious}/>
      <div className="cursor-pointer mx-3" onClick={handleClick}>
        {isPlaying ? (
          <FaPause size={20} color="white" />
        ) : (
          <FaPlay size={20} color="white" />
        )}
      </div>
      <FaForward size={20} color="white" className='cursor-pointer' onClick={playNextPrevious}/>
    </>
  );
};

export default PlayerButtons;
