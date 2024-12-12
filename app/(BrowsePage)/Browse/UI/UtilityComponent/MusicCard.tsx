'use client';

import React, { useState, useRef } from 'react';
import { IMusicProps } from '../../types/types';
const MusicCard = (props: IMusicProps) => {
  const audioRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime] = useState(0);
  const [duration] = useState(0);
  const [currentSongIndex] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false);
  const songs = [
    {
      id: 1,
      title: 'Summer Walk',
      artist: 'Olexy',
      duration: '2:19',
      genre: 'Lofi',
      url: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
      cover:
        'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg',
    },
    {
      id: 2,
      title: 'Beautiful Dream',
      artist: 'Rafael Krux',
      duration: '2:15',
      genre: 'Ambient',
      url: 'https://cdn.pixabay.com/download/audio/2022/08/02/audio_2dde668d05.mp3',
      cover:
        'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg',
    },
    {
      id: 3,
      title: 'Lofi Study',
      artist: 'FASSounds',
      duration: '2:43',
      genre: 'Lofi',
      url: 'https://cdn.pixabay.com/download/audio/2022/05/16/audio_1808a67f50.mp3',
      cover:
        'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg',
    },
  ];

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleTimeSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const bar = e.currentTarget;
    const rect = bar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    if (audioRef.current) {
      audioRef.current.currentTime = percent * duration;
    }
  };

  const handlePlayPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className='min-h-screen bg-black p-8'>
      <audio
        ref={audioRef}
        src={songs[currentSongIndex].url}
        preload='metadata'
        className='hidden'
      />

      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='flex justify-between items-center mb-8'>
          <h1 className='text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'>
            Your Music
          </h1>
          <div className='flex items-center space-x-4'>
            <button className='hover:text-purple-400 transition-colors'>
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                />
              </svg>
            </button>
            <button className='hover:text-purple-400 transition-colors'>
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
                />
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                />
              </svg>
            </button>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Main Player */}
          <div className='lg:col-span-2'>
            <div className='bg-white/5 backdrop-blur-xl rounded-3xl p-8 shadow-2xl'>
              {/* Current Song Display */}
              <div className='flex items-center space-x-6 mb-8'>
                <div className='relative group w-32 h-32'>
                  <img
                    src={songs[currentSongIndex].cover}
                    alt={songs[currentSongIndex].title}
                    className='w-full h-full object-cover rounded-2xl shadow-lg group-hover:scale-105 transition-transform duration-300'
                  />
                  <div className='absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors rounded-2xl' />
                </div>
                <div>
                  <h2 className='text-2xl font-bold mb-2 text-white'>
                    {songs[currentSongIndex].title}
                  </h2>
                  <p className='text-gray-400 mb-2'>
                    {songs[currentSongIndex].artist}
                  </p>
                  <span className='px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm'>
                    {songs[currentSongIndex].genre}
                  </span>
                </div>
              </div>

              {/* Waveform Visualization (placeholder) */}
              <div className='h-24 mb-8 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 rounded-xl'>
                {/* Add waveform visualization here */}
              </div>

              {/* Progress Bar */}
              <div
                className='h-2 bg-gray-700 rounded-full mb-2 cursor-pointer'
                onClick={handleTimeSeek}
              >
                <div
                  className='h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full relative'
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                >
                  <div className='absolute -right-2 -top-1.5 w-5 h-5 bg-white rounded-full shadow-lg' />
                </div>
              </div>

              {/* Time Display */}
              <div className='flex justify-between text-sm text-gray-400 mb-8'>
                {/* <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span> */}
              </div>

              {/* Controls */}
              <div className='flex items-center justify-between'>
                <button
                  onClick={() => setIsShuffling(!isShuffling)}
                  className={`${
                    isShuffling ? 'text-purple-400' : 'text-gray-400'
                  } hover:text-purple-400 transition-colors`}
                >
                  <svg
                    className='w-6 h-6'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path d='M8 5v14l11-7z' />
                  </svg>
                </button>

                <div className='flex items-center space-x-6'>
                  <button className='text-gray-400 hover:text-white transition-colors'>
                    <svg
                      className='w-8 h-8'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M15 19l-7-7 7-7'
                      />
                    </svg>
                  </button>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handlePlayPause();
                    }}
                    className='w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center hover:opacity-90 transition-opacity'
                  >
                    {isPlaying ? (
                      <svg
                        className='w-8 h-8 text-white'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path d='M6 4h4v16H6V4zm8 0h4v16h-4V4z' />
                      </svg>
                    ) : (
                      <svg
                        className='w-8 h-8 text-white ml-1'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path d='M8 5v14l11-7z' />
                      </svg>
                    )}
                  </button>

                  <button className='text-gray-400 hover:text-white transition-colors'>
                    <svg
                      className='w-8 h-8'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M9 5l7 7-7 7'
                      />
                    </svg>
                  </button>
                </div>

                <button
                  onClick={() => setIsRepeating(!isRepeating)}
                  className={`${
                    isRepeating ? 'text-purple-400' : 'text-gray-400'
                  } hover:text-purple-400 transition-colors`}
                >
                  <svg
                    className='w-6 h-6'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path d='M8 5v14l11-7z' />
                  </svg>
                </button>
              </div>

              {/* Volume Control */}
              <div className='flex items-center space-x-3 mt-8'>
                <svg
                  className='w-5 h-5 text-gray-400'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M15.536 15.536a5 5 0 10-7.072-7.072l7.072 7.072z' />
                </svg>
                <input
                  type='range'
                  min='0'
                  max='1'
                  step='0.01'
                  value={volume}
                  onChange={handleVolumeChange}
                  className='w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer'
                />
              </div>
            </div>
          </div>

          {/* Playlist */}
          <div className='bg-white/5 backdrop-blur-xl rounded-3xl p-6 shadow-2xl'>
            <h3 className='text-xl font-bold mb-6 flex items-center justify-between'>
              <span className='text-white'>Up Next</span>
              <span className='text-sm text-gray-400'>
                {songs.length} songs
              </span>
            </h3>
            <div className='space-y-4 overflow-y-auto max-h-[600px] pr-4 custom-scrollbar'>
              {songs.map((song, index) => (
                <div
                  key={song.id}
                  // onClick={() => handleSongSelect(index)}
                  className={`group flex items-center space-x-4 p-4 rounded-xl cursor-pointer transition-all
                    ${
                currentSongIndex === index
                  ? 'bg-purple-500/20 border border-purple-500/50'
                  : 'hover:bg-white/5'
                }`}
                >
                  <img
                    src={song.cover}
                    alt={song.title}
                    className='w-12 h-12 rounded-lg object-cover group-hover:scale-105 transition-transform'
                  />
                  <div className='flex-1 min-w-0'>
                    <h4
                      className={`font-medium truncate ${
                        currentSongIndex === index
                          ? 'text-purple-400'
                          : 'text-white'
                      }`}
                    >
                      {song.title}
                    </h4>
                    <p className='text-sm text-gray-400 truncate'>
                      {song.artist}
                    </p>
                  </div>
                  <div className='flex items-center space-x-3'>
                    <span className='text-sm text-gray-400'>
                      {song.duration}
                    </span>
                    {currentSongIndex === index && isPlaying && (
                      <div className='flex space-x-0.5'>
                        <span className='w-1 h-4 bg-purple-500 animate-music-bar-1'></span>
                        <span className='w-1 h-4 bg-purple-500 animate-music-bar-2'></span>
                        <span className='w-1 h-4 bg-purple-500 animate-music-bar-3'></span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicCard;
