import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  loggedInUser: null,
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
    setLoggedInUser: (state, action) => {
      state.loggedInUser = action.payload;  // Set the logged-in user
    },
    clearLoggedInUser: (state) => {
      state.loggedInUser = null;  // Clear the logged-in user
    },
  },
});

export const { setAccessToken, clearAccessToken, setLoggedInUser, clearLoggedInUser } = sessionSlice.actions;

export default sessionSlice.reducer;