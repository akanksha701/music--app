import { IMusicProps } from '@/app/(BrowsePage)/Browse/types/types';

export interface IMusicState {
  currentTrack: IMusicProps;
  isPlaying: boolean;
  duration: number;
  seekPercentage: number;
  selectedMusicIndex: number;
  isMuted: boolean;
  volume?:number;
  currentTime?: number;

}
export interface IMusicPlayerState {
  currentTrack: IMusicProps;
  selectedMusicIndex: number | null;
  seekPercentage: number;
  isPlaying: boolean;
  volume:number;
  isMuted:boolean
}

export interface RootState {
  musicPlayerSlice: IMusicPlayerState;
}
