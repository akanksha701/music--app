import WaveSurfer from "wavesurfer.js";
import { create } from "zustand";

interface States {
  wavesurfer: WaveSurfer | null;
  isPlaying: boolean;
  volume: number;
  seekPercentage: number;
  currentTime: number;
}

interface Actions {
  initWaveSurfer: (container: HTMLElement, audioUrl: string) => void;
  togglePlayPause: () => void;
  setVolume: (volume: number) => void;
  seekTo: (percent: number) => void;
}

export const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
};

export const useWaveSurfer = create<States & Actions>((set) => ({
  wavesurfer: null,
  isPlaying: false,
  volume: 0.5,
  seekPercentage: 0,
  currentTime: 0,

  initWaveSurfer: (container, audioUrl) => {
    const wavesurfer = WaveSurfer.create({
      container,
      waveColor: "#1DB954",
      progressColor: "#1DB954",
      cursorColor: "#FFFFFF",
      barWidth: 3,
      height: 3,
    });

    wavesurfer.load(audioUrl);

    wavesurfer.on("audioprocess", () => {
      set({ currentTime: wavesurfer.getCurrentTime() });
      set({
        seekPercentage:
          (wavesurfer.getCurrentTime() / wavesurfer.getDuration()) * 100,
      });
    });

    wavesurfer.on("finish", () => {
      set({ isPlaying: false });
    });

    set({ wavesurfer });
  },

  togglePlayPause: () => set((state) => {
    const wavesurfer = state.wavesurfer;
    if (wavesurfer) {
      if (state.isPlaying) {
        wavesurfer.pause();
      } else {
        wavesurfer.play();
      }
      return { isPlaying: !state.isPlaying };
    }
    return state;
  }),

  setVolume: (volume) => set((state) => {
    const wavesurfer = state.wavesurfer;
    if (wavesurfer) {
      wavesurfer.setVolume(volume);
    }
    return { volume };
  }),

  seekTo: (percent) => set((state) => {
    const wavesurfer = state.wavesurfer;
    if (wavesurfer) {
      wavesurfer.seekTo(percent);
    }
    return { seekPercentage: percent * 100 };
  }),
}));
