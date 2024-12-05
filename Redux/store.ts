import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "@/services/user";
import userSlice from "./features/user/userSlice";
import { playlistApi } from "@/services/playlists";
import { artistApi } from "@/services/artists";
import { languageApi } from "@/services/languages";
import { newMusicApi } from "@/services/newMusic";
import newReleaseSlice from "./features/newRelease";
export const store = configureStore({
  reducer: {
    userReducer: userSlice,
    newRelease: newReleaseSlice,
    [userApi.reducerPath]: userApi.reducer,
    [playlistApi.reducerPath]: playlistApi.reducer,
    [artistApi.reducerPath]: artistApi.reducer,
    [languageApi.reducerPath]: languageApi.reducer,
    [newMusicApi.reducerPath]: newMusicApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(playlistApi.middleware)
      .concat(artistApi.middleware)
      .concat(languageApi.middleware)
      .concat(newMusicApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
