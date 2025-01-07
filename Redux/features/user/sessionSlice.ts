import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    clearAccessToken: (state) => {
      state.accessToken = null;
    },
  },
});

export const { setAccessToken, clearAccessToken } = sessionSlice.actions;

export default sessionSlice.reducer;
