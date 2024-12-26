import React from 'react';
import { FaBackward, FaForward, FaPause, FaPlay } from 'react-icons/fa';
import { IPlayerButtonsProps } from '../../types/types';
import { useDispatch } from 'react-redux';
import {
  setCurrentSongIndex,
  setCurrentTrack,
} from '@/Redux/features/musicPlayer/musicPlayerSlice'; // Adjust path as necessary

const PlayerButtons = ({
  isPlaying,
  data,
  selectedMusicIndex,
  handlePlayPause,
}: IPlayerButtonsProps) => {
  const dispatch = useDispatch();

  const handleMusicClick = async (index: number) => {
    if(data)
    {
      const newIndex = index < 0 ? data.length - 1 : index % data.length;
      dispatch(setCurrentTrack(data[newIndex]));
      dispatch(setCurrentSongIndex(newIndex));
    }
   
  };

  if (selectedMusicIndex === null) return null;

  return (
    <>
      <FaBackward
        size={20}
        color="white"
        className="cursor-pointer"
        onClick={() => handleMusicClick(selectedMusicIndex - 1)}
      />

      <div className="cursor-pointer mx-3" onClick={handlePlayPause}>
        {isPlaying ? (
          <FaPause size={20} color="white" />
        ) : (
          <FaPlay size={20} color="white" />
        )}
      </div>

      <FaForward
        size={20}
        color="white"
        className="cursor-pointer"
        onClick={() => handleMusicClick(selectedMusicIndex + 1)}
      />
    </>
  );
};

export default PlayerButtons;
