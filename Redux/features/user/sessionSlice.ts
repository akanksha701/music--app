// src/redux/sessionSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Initial state for session (you can set the initial value to `null` or an empty object)
const initialState = {
  session: null,
};

// Create a slice for the session
const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    // Action to set the session in the Redux store
    setSession: (state, action) => {
      state.session = action.payload;
    },
    // Action to clear the session
    clearSession: (state) => {
      state.session = null;
    },
  },
});

export const { setSession, clearSession } = sessionSlice.actions;

export default sessionSlice.reducer;
