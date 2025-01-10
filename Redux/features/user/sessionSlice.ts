import { IUserDetails } from '@/app/MyProfile/types/types';
import { createSlice } from '@reduxjs/toolkit';

interface ISessionProps
{
  accessToken: string|null,
  loggedInUser: IUserDetails| null,
}
const initialState :ISessionProps= {
  accessToken: null,
  loggedInUser: null,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    clearAccessToken: (state) => {
      state.accessToken = null;
    },
    setLoggedInUser: (state, action) => {
      state.loggedInUser = action.payload;  
    },
    clearLoggedInUser: (state) => {
      state.loggedInUser = null;  
    },
  },
});

export const { setAccessToken, clearAccessToken, setLoggedInUser, clearLoggedInUser } = sessionSlice.actions;

export default sessionSlice.reducer;