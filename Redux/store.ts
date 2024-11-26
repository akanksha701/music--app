import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice'
export default function makeStore() {
  return configureStore({
    reducer: {
      user: userReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
  });
}

export const store = makeStore();
