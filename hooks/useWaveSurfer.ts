import WaveSurfer from "wavesurfer.js";
import { create } from "zustand";

interface States {
  currentTime: number;
  seekPercentage: number;
  volume: number;
  isPlaying: boolean;
  wavesurfer: WaveSurfer | null;
}

interface Actions {
  setWavesurfer: (ws: WaveSurfer | null) => void;
  setCurrentTime: (time: number) => void;
  setSeekPercentage: (per: number) => void;
  setVolume: (vol: number) => void;
  setIsPlaying: (val: boolean) => void;
  handleTimeSeek: (e: React.MouseEvent<HTMLDivElement>) => void; // Type for mouse event
  handleVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Type for change event
  handleMuteToggle: () => void;
  togglePlayPause: () => void;
}

export const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
};

export const useWaveSurfer = create<States & Actions>((set, get) => ({
  wavesurfer: null,
  currentTime: 0,
  seekPercentage: 0,
  volume: 0.5,
  isPlaying: false,

  setWavesurfer: (ws) => {
    set({ wavesurfer: ws });
  },
  setCurrentTime: (time) => {
    set({ currentTime: time });
  },

  setSeekPercentage: (per) => {
    set({ seekPercentage: per });
  },

  setVolume: (vol) => {
    set({ volume: vol });
  },

  setIsPlaying: (val) => {
    set({ isPlaying: val });
  },

  handleTimeSeek: (e) => {
    const bar = e.currentTarget;
    const rect = bar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;

    const wavesurfer = get().wavesurfer;
    if (wavesurfer) {
      wavesurfer.seekTo(percent);
      set({ seekPercentage: percent * 100 });
    }
  },
  handleVolumeChange: (e) => {
    const newVolume = parseFloat(e.target.value);
    const wavesurfer = get().wavesurfer;
    if (wavesurfer) {
      wavesurfer.setVolume(newVolume);
      set({ volume: newVolume });
    }
  },
  togglePlayPause: () => {
    const wavesurfer = get().wavesurfer;
    const isPlaying = get().isPlaying;
    if (wavesurfer) {
      if (isPlaying) {
        wavesurfer.pause();
        set({ isPlaying: false });
      } else {
        wavesurfer.play();
        set({ isPlaying: true });
      }
    }
  },
  handleMuteToggle: () => {
    const currentVolume = get().volume;
    const newVolume = currentVolume === 0 ? 0.5 : 0;

    const wavesurfer = get().wavesurfer;
    if (wavesurfer) {
      wavesurfer.setVolume(newVolume);
      set({ volume: newVolume });
    }
  },
}));
