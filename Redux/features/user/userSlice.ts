import { createSlice } from "@reduxjs/toolkit";
import { userApi } from "@/services/user";

const initialState = {
  userDetails: {},
  loading: false,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      userApi.endpoints.fetchUserProfile.matchFulfilled,
      (state, action) => {
        state.userDetails = action.payload;
        state.loading = false;
      }
    );
    builder.addMatcher(
      userApi.endpoints.fetchUserProfile.matchPending,
      (state) => {
        state.loading = true;
      }
    );
    builder.addMatcher(
      userApi.endpoints.fetchUserProfile.matchRejected,
      (state, action) => {
        state.loading = false;
      }
    );
  },
});

export default userSlice.reducer; // Make sure to export the reducer correctly
