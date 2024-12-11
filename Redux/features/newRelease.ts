import { createSlice } from "@reduxjs/toolkit";
import { newMusicApi } from "@/services/music";

const initialState = {
  newRelease: {},
  loading: false,
};

const newReleaseSlice = createSlice({
  name: "newMusics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      newMusicApi.endpoints.getnewMusics.matchFulfilled,
      (state, action) => {
        state.newRelease = action.payload;
        state.loading = false;
      }
    );
    builder.addMatcher(
      newMusicApi.endpoints.getnewMusics.matchPending,
      (state) => {
        state.loading = true;
      }
    );
    builder.addMatcher(
      newMusicApi.endpoints.getnewMusics.matchRejected,
      (state, action) => {
        state.loading = false;
      }
    );
  },
});

export default newReleaseSlice.reducer; // Make sure to export the reducer correctly
