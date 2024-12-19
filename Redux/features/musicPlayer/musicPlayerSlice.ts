import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMusicProps } from "@/app/(BrowsePage)/Browse/types/types";
import { IMusicState } from "./types/types";

const initialState: IMusicState = {
  selectedMusicIndex: -1,  
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
  isMuted: false, // Add isMuted state
  duration: 0,
  currentTime: 0,
  seekPercentage: 0,
};

const musicPlayerSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    setCurrentTrack(state, action: PayloadAction<IMusicProps | undefined>) {
      state.currentTrack = action.payload || initialState.currentTrack;
    },
    setCurrentSongIndex(state, action: PayloadAction<number>) {
      state.selectedMusicIndex = action.payload;
    },
    setVolume(state, action: PayloadAction<number>) {
      state.volume = action.payload;
    },
    toggleMute(state) { // Add toggleMute action
      state.isMuted = !state.isMuted;
      state.volume = state.isMuted ? 0 : initialState.volume; // Set volume to 0 if muted, otherwise restore initial volume
    },
    togglePlay(state) {
      state.isPlaying = !state.isPlaying;
    },
    setCurrentTime(state, action: PayloadAction<number>) {
      state.currentTime = action.payload;
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
  },
});

export const {
  setCurrentTrack,
  setCurrentSongIndex,
  setVolume,
  toggleMute, // Export the new toggleMute action
  togglePlay,
  setCurrentTime,
  setDuration,
  setSeekPercentage,
  setIsPlaying,
} = musicPlayerSlice.actions;

export default musicPlayerSlice.reducer;
