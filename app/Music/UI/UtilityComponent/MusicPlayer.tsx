'use client';
import React, { useState } from 'react';
import {
  FaBackward,
  FaForward,
  FaHeart,
  FaPause,
  FaPlay,
  FaRegHeart,
} from 'react-icons/fa';
import { IoAddSharp } from 'react-icons/io5';
import { GoDownload } from 'react-icons/go';
import { FiShoppingCart } from 'react-icons/fi';
import VolumeIcon from './VolumeIcon';
import PlayerLabel from './PlayerLabel';
import Image from 'next/image';
import { IMusicPlayerProps } from '../../types/types';
import ButtonWithIcon from '@/common/buttons/ButtonWithIcon';

const MusicPlayer = ({
  currentTrack,
  isMuted,
  handleLikeClick,
  onMuteToggle,
  currentTime,
  isPlaying,
  handlePlayPause,
  onNextSong,
  onPreviousSong,
  volume,
  setVolume,
}: IMusicPlayerProps) => {
  const [volumeSliderValue, setVolumeSliderValue] = useState(volume);
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setVolumeSliderValue(newVolume);
  };
  return (
    <div className="w-full bg-black p-2 flex flex-row items-center justify-between gap-4 fixed bottom-0 left-0 z-50">
    <div className="mx-8 w-full flex flex-row items-center justify-between">
      <div className="ml-20 flex flex-row items-center">
        <div className="flex-shrink-1">
          <Image
            src={currentTrack?.imageUrl || '/default-image.jpg'}
            alt="Track Image"
            width={50}
            height={50}
            className="rounded-md p-2"
          />
        </div>
        <div className="text-left ml-2">
          <PlayerLabel
            title={currentTrack?.name || 'Unknown Track'}
            artists={currentTrack?.artists || ''}
            textColor="white"
          />
        </div>
      </div>
  
      {/* Centered controls */}
      <div className="flex flex-row items-center justify-center space-x-3 mx-20">
        <FaBackward size={20} color="white" onClick={onPreviousSong} />
        <div className="cursor-pointer">
          {isPlaying ? (
            <FaPause size={20} color="white" onClick={handlePlayPause} />
          ) : (
            <FaPlay size={20} color="white" onClick={handlePlayPause} />
          )}
        </div>
        <FaForward size={20} color="white" onClick={onNextSong} />
        <p className="text-small text-slate-600 bg-slate-300 rounded-md p-1">
          {currentTime || '0:00'}
        </p>
        <div key={currentTrack?._id} id="waveform"></div>
        <p className="text-small text-slate-600 bg-slate-300 rounded-md p-1">
          {currentTrack?.duration || '0:00'}
        </p>
        <VolumeIcon isMuted={isMuted} handleClick={onMuteToggle} />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volumeSliderValue}
          onChange={handleVolumeChange}
          className="w-24 mx-2"
        />
        <span className="text-white">{Math.round(volumeSliderValue * 100)}%</span>
        {currentTrack?.liked ? (
          <FaHeart
            size={24}
            onClick={handleLikeClick}
            className="text-red-500 cursor-pointer mx-2 transition-colors duration-300"
          />
        ) : (
          <FaRegHeart
            size={24}
            onClick={handleLikeClick}
            className="text-white cursor-pointer mx-2 transition-colors duration-300"
          />
        )}
        <IoAddSharp
          size={24}
          color="white"
          className="cursor-pointer mx-2 text-gray-500"
        />
        <ButtonWithIcon
          className="w-6 h-6 text-black rounded-full bg-vivid-orange p-1 mx-2"
          icon={<GoDownload size={20} color="black" />}
        />
        <FiShoppingCart
          size={24}
          color="white"
          className="cursor-pointer mx-2"
        />
      </div>
    </div>
  </div>
  
  );
};

export default MusicPlayer;
