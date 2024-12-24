import { IMusicProps } from "@/app/(BrowsePage)/Browse/types/types";

export interface IMusicListProps {
  data: IMusicProps[];
  title: string;
}
export interface IMusicPlayerProps {
  currentTrack: IMusicProps;
  isMuted: boolean;
  handleLikeClick: () => void;
  onMuteToggle: () => void;
  currentTime: string;
  seekPercentage: number;
  isPlaying: boolean;
  allSongs: IMusicProps[];
  handlePlayPause: () => void;
  onNextSong: () => void;
  onPreviousSong: () => void;
  volume: number;
  handlePlayTrack: (track: IMusicProps) => void;
}

export interface IPlayerButtonsProps {
  isPlaying: boolean;
  selectedMusicIndex: number;
  data: Array<IMusicProps>;
  handlePlayPause: () => void;
  currentTime?: string;
  totalDuration?: number;
}
export interface IVolumeProps {
  isMuted: boolean;
  handleClick: () => void;
}

export interface IWaveProps {
  handleClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  seekPercentage?: number;
}
