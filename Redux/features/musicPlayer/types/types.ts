import { IMusicProps } from "@/app/(BrowsePage)/Browse/types/types";

export interface IMusicState {
    currentTrack: IMusicProps;
    isPlaying: boolean;
    isMuted:boolean,
    volume: number;
    duration: number;
    currentTime: number;
    seekPercentage: number; 
    selectedMusicIndex: number; 
  }
  export interface IMusicPlayerState {
    currentTrack: IMusicProps ;
    selectedMusicIndex: number | null;
    currentTime: number;
    seekPercentage: number;
    isPlaying: boolean;
  }
  
  export interface RootState {
    musicPlayerSlice: IMusicPlayerState;
  }