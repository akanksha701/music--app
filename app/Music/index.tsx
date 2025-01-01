'use client';
import React from 'react';
import useFetchMusicData from '@/app/About/UI/UtilityComponent/useFetchMusicList';
import MusicList from './UI/UtilityComponent/MusicList'; 
// import MusicListContainer from './UI/UtilityComponent/MusicListContainer';
import MusicListContainer from '@/common/MusicPlayer/MusicListContainer';

const Index = () => {
  return <MusicListContainer />;
};

export default Index;
