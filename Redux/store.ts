import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "@/services/user";
import userSlice from "./features/user/userSlice";
import { playlistApi } from "@/services/playlists";
import { artistApi } from "@/services/artists";
import { languageApi } from "@/services/languages";
import { musicApi } from "@/services/music";
import newReleaseSlice from "./features/newRelease";
import { genreApi } from "@/services/genre";
import { albumApi } from "@/services/album";
import { likeApi } from "@/services/like";
import musicPlayerSlice from "./features/musicPlayer/musicPlayerSlice";
export const store = configureStore({
  reducer: {
    userReducer: userSlice,
    newRelease: newReleaseSlice,
    musicPlayerSlice:musicPlayerSlice,
    [userApi.reducerPath]: userApi.reducer,
    [playlistApi.reducerPath]: playlistApi.reducer,
    [artistApi.reducerPath]: artistApi.reducer,
    [languageApi.reducerPath]: languageApi.reducer,
    [musicApi.reducerPath]: musicApi.reducer,
    [genreApi.reducerPath]: genreApi.reducer,
    [albumApi.reducerPath]: albumApi.reducer,
    [likeApi.reducerPath]: likeApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(playlistApi.middleware)
      .concat(artistApi.middleware)
      .concat(languageApi.middleware)
      .concat(musicApi.middleware)
      .concat(genreApi.middleware)
      .concat(albumApi.middleware)
      .concat(likeApi.middleware),

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
