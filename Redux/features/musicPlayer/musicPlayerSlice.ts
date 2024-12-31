import { IMusicProps } from "@/app/(BrowsePage)/Browse/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  selectedMusicIndex: -1,
  currentList: null,
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
  wavesurferRef: null,  
  wavesurferInstances: new Map(),  // Store instances in a Map
};

const musicPlayerSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    setCurrentList(state, action: PayloadAction<any | any>) {
      state.currentList = action.payload || initialState.currentList;
    },

    setCurrentTrack(state, action: PayloadAction<any | undefined>) {
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
    setWavesurferInstances(state, action: PayloadAction<Map<string, any>>) {
      state.wavesurferInstances = action.payload;
    },
    setDuration(state, action: PayloadAction<number>) {
      state.duration = action.payload;
    },
    setSeekPercentage(state, action: PayloadAction<number>) {
      state.seekPercentage = action.payload;
    },
    clearWavesurferInstances(state) {
      state.wavesurferInstances.clear();
    },

    setIsPlaying(state, action: PayloadAction<boolean>) {
      state.isPlaying = action.payload;
    },
    setIsMuted(state, action: PayloadAction<boolean>) {
      state.isMuted = action.payload;
    },    
    setWavesurferRef(state, action: PayloadAction<any>) {
      state.wavesurferRef = action.payload;
    },
    clearWavesurferRef(state) {
      state.wavesurferRef = null;
    },
    // Additional actions can go here...
  },
});

export const {
  setCurrentList,
  setCurrentTrack,
  setWavesurferInstances,
  clearWavesurferInstances,
  setIsPlaying,
  setCurrentSongIndex,
  setIsMuted,
  togglePlay,
  setWavesurferRef,
  clearWavesurferRef,
  setSeekPercentage,

} = musicPlayerSlice.actions;

export default musicPlayerSlice.reducer;
