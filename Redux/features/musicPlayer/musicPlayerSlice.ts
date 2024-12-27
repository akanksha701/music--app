import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMusicProps } from "@/app/(BrowsePage)/Browse/types/types";
import { IMusicState } from "./types/types";

const initialState: any = {
  selectedMusicIndex: -1,
  currentList:null,
  currentTrack: {
    _id: "",
    name: "",
    artists: "",
    audioUrl: "",
    currency: "",
    description: "",
    email: "",
    imageUrl: "",
    price: 0,
    liked: false,
    duration: 0,
  },
  isPlaying: true,
  volume: 1,
  duration: 0,
  currentTime: 0,
  seekPercentage: 0,
  isMuted: false,
};

const musicPlayerSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    setCurrentList(state, action: PayloadAction<any | any>) {
      state.currentList = action.payload || initialState.currentList;
    },
   
    setCurrentTrack(state, action: PayloadAction<IMusicProps | undefined>) {
      state.currentTrack = action.payload || initialState.currentTrack;
    },
    setCurrentSongIndex(state, action: PayloadAction<number>) {
      state.selectedMusicIndex = action.payload;
    },
    setVolume(state, action: PayloadAction<number>) {
      state.volume = action.payload;
    },
    togglePlay(state) {
      state.isPlaying = !state.isPlaying;
    },
    setDuration(state, action: PayloadAction<number>) {
      state.duration = action.payload;
    },
    setSeekPercentage(state, action: PayloadAction<number>) {
      state.seekPercentage = action.payload;
    },
    setIsPlaying(state, action: PayloadAction<boolean>) {
      state.isPlaying = action.payload;
    },
    setIsMuted(state, action: PayloadAction<boolean>) {
      state.isMuted = action.payload;
    },
    
  },
});

export const {
  setCurrentList,
  setCurrentTrack,
  setCurrentSongIndex,
  setVolume,
  togglePlay,
  setDuration,
  setSeekPercentage,
  setIsPlaying,
  setIsMuted,
} = musicPlayerSlice.actions;

export default musicPlayerSlice.reducer;
