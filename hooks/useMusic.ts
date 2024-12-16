import { create } from "zustand";
import { IMusicProps } from "@/app/(BrowsePage)/Browse/types/types";
import { generateUrl } from "@/utils/helpers";
import { redirect } from "next/navigation";

interface States {
  currentTrack: IMusicProps | null;
  isPlaying: boolean;
  currentSongIndex: number;
  volume: number;
  duration: number;
  currentTime: number;
}

interface Actions {
  togglePlayPause: () => void;
  setCurrentTrack: (track?:any) => void;
  setVolume: (volume: number) => void;
  setCurrentSongIndex: (index: number) => void;
  setDuration: (duration: number) => void;
  setCurrentTime: (currentTime: number) => void;
  handleMusicClick: (music: IMusicProps,name:string) => void;
}

export const useMusic = create<States & Actions>((set) => ({
  currentTrack: null,
  isPlaying: false,
  currentSongIndex: 0,
  volume: 1,
  duration: 0,
  currentTime: 0,

  togglePlayPause: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setCurrentTrack: (track) => set({ currentTrack: track, isPlaying: true }),
  setVolume: (volume: number) => set({ volume }),
  setCurrentSongIndex: (index: number) => set({ currentSongIndex: index }),
  setDuration: (duration: number) => set({ duration }),
  setCurrentTime: (currentTime: number) => set({ currentTime }),
  handleMusicClick: async (music: IMusicProps,name:string) => {
    const url = await generateUrl("/Music", {
      name: music.name,
      category:name
    });
    set({ currentTrack: music, isPlaying: true });
    redirect(url);
  },
}));
