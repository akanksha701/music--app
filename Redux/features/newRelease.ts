import { createSlice } from '@reduxjs/toolkit';
import { musicApi } from '@/services/music';

const initialState = {
  newRelease: {},
  loading: false,
};

const newReleaseSlice = createSlice({
  name: 'newMusics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      musicApi.endpoints.getnewMusics.matchFulfilled,
      (state, action) => {
        state.newRelease = action.payload;
        state.loading = false;
      }
    );
    builder.addMatcher(
      musicApi.endpoints.getnewMusics.matchPending,
      (state) => {
        state.loading = true;
      }
    );
    builder.addMatcher(
      musicApi.endpoints.getnewMusics.matchRejected,
      (state) => {
        state.loading = false;
      }
    );
  },
});

export default newReleaseSlice.reducer; 