import { IMusicProps } from '@/app/(BrowsePage)/Browse/types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import WaveSurfer from 'wavesurfer.js';  // Assuming you're using this library for waveform visualization
import { WritableDraft } from 'immer';

interface MusicState {
  selectedMusicIndex: number;
  currentList: IMusicProps[] | null;
  currentTrack: IMusicProps;
  isPlaying: boolean;
  volume: number;
  duration: string;
  currentTime: number;
  seekPercentage: number;
  isMuted: boolean;
  wavesurferRef: WritableDraft<WaveSurfer> | null; 
  wavesurferInstances: Map<string, WritableDraft<WaveSurfer>>; 
}

const initialState: MusicState = {
  selectedMusicIndex: -1,
  currentList: null,
  currentTrack: {
    _id: '',
    name: '',
    artists: '',
    audioUrl: '',
    currency: '',
    description: '',
    email: '',
    imageUrl: '',
    price: 0,
    liked: false,
    duration: 0,
  },
  isPlaying: true,
  volume: 1,
  duration: '0',
  currentTime: 0,
  seekPercentage: 0,
  isMuted: false,
  wavesurferRef: null,
  wavesurferInstances: new Map(),
};

const musicPlayerSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    setCurrentList(state, action: PayloadAction<IMusicProps[] | null>) {
      state.currentList = action.payload || initialState.currentList;
    },

    setCurrentTrack(state, action: PayloadAction<IMusicProps>) {
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

    setWavesurferInstances(state, action: PayloadAction<Map<string, WritableDraft<WaveSurfer>>>) {
      state.wavesurferInstances = action.payload;
    },

    setDuration(state, action: PayloadAction<string>) {
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

    setWavesurferRef(state, action: PayloadAction<WritableDraft<WaveSurfer> | null>) {
      state.wavesurferRef = action.payload;
    },

    clearWavesurferRef(state) {
      state.wavesurferRef = null;
    },
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
  setVolume
} = musicPlayerSlice.actions;

export default musicPlayerSlice.reducer;
