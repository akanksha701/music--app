import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "@/services/user";
import userSlice from "./features/user/userSlice";
import { playlistApi } from "@/services/playlists";
import { artistApi } from "@/services/artists";

export const store = configureStore({
  reducer: {
    userReducer: userSlice,
    [userApi.reducerPath]: userApi.reducer,
    [playlistApi.reducerPath]: playlistApi.reducer,
    [artistApi.reducerPath]: artistApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(playlistApi.middleware)
      .concat(artistApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
