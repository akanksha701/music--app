import { create } from "zustand";
import { IMusicProps } from "@/app/(BrowsePage)/Browse/types/types";
import { generateUrl } from "@/utils/helpers";
import { redirect } from "next/navigation";

interface States {
  currentTrack: IMusicProps;
  isPlaying: boolean;
  currentSongIndex: number;
  volume: number;
  duration: number;
  currentTime: number;
}

interface Actions {
  setCurrentTrack: (track?: any) => void;
  setCurrentSongIndex: (index: number) => void;
  handleMusicClick: (music: IMusicProps, name: string) => void;
}

export const useMusic = create<States & Actions>((set) => ({
  currentTrack: {
    _id: "",
    name: "",
    artists: "",
    audioUrl: "",
    currency: "string",
    description: "string",
    email: "string",
    imageUrl: "string",
    price: 0,
    liked: false,
    duration: 0,
  },
  isPlaying: false,
  currentSongIndex: 0,
  volume: 1,
  duration: 0,
  currentTime: 0,

  setCurrentTrack: (track) => set({ currentTrack: track, isPlaying: true }),
  setCurrentSongIndex: (index: number) => set({ currentSongIndex: index }),
  handleMusicClick: async (music: IMusicProps, name: string) => {
    const url = await generateUrl("/Music", {
      name: music.name,
      id: music._id,
      type: name,
    });
    set({ currentTrack: music, isPlaying: true });
    redirect(url);
  },
}));
