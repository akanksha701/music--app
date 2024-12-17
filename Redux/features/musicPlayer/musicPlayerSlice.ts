import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMusicProps } from "@/app/(BrowsePage)/Browse/types/types";

interface MusicState {
  currentTrack: IMusicProps;
  isPlaying: boolean;
  currentSongIndex: number;
  volume: number;
  duration: number;
  currentTime: number;
  seekPercentage: number; 
}

const initialState: MusicState = {
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
  isPlaying: true,
  currentSongIndex: 0,
  volume: 1,
  duration: 0,
  currentTime: 0,
  seekPercentage: 0,
};

const musicPlayerSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    setCurrentTrack(state, action: PayloadAction<IMusicProps | undefined>) {
      state.currentTrack = action.payload || initialState.currentTrack;
      state.isPlaying = true; 
    },
    setCurrentSongIndex(state, action: PayloadAction<number>) {
      state.currentSongIndex = action.payload;
    },
    setVolume(state, action: PayloadAction<number>) {
      state.volume = action.payload;
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
  togglePlay,
  setCurrentTime,
  setDuration,
  setSeekPercentage,
  setIsPlaying,
} = musicPlayerSlice.actions;

export default musicPlayerSlice.reducer;
