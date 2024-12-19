import { IMusicProps } from "@/app/(BrowsePage)/Browse/types/types";
import WaveSurfer from "wavesurfer.js";

export interface IMusicListProps {
  data: IMusicProps[];
  title: string;
}
export interface IMusicPlayerProps {
  currentTrack: IMusicProps;
  isPlaying: boolean;
  currentSongIndex: number;
  volume: number;
  currentTime: number | string;
  seekPercentage: number;
  togglePlayPause: () => void;
  handleTimeSeek: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  ref: React.RefObject<HTMLDivElement>;
}

export interface IPlayerButtonsProps {
  isPlaying: boolean;
  selectedMusicIndex: number;
  data: Array<IMusicProps>;
  handlePlayPause:() => void;
  currentTime?:string,
  totalDuration?:number
}
export interface IVolumeProps
{
  isMuted:boolean;
  handleClick:()=>void
}

export interface IWaveProps
{
  handleClick?:(e: React.MouseEvent<HTMLDivElement>)=> void ,
  seekPercentage?:number
}