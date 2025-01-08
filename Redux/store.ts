import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "@/services/user";
import userSlice from "./features/user/userSlice";
import { playlistApi } from "@/services/playlists";
import { artistApi } from "@/services/artists";
import { languageApi } from "@/services/languages";
import { musicApi } from "@/services/music";
import { genreApi } from "@/services/genre";
import { albumApi } from "@/services/album";
import { likeApi } from "@/services/like";
import { audioApi } from "@/services/audio";
import newReleaseSlice from "./features/newRelease";
import sessionSlice from "./features/user/sessionSlice"
import musicPlayerSlice from "./features/musicPlayer/musicPlayerSlice";
export const store = configureStore({
  reducer: {
    userReducer: userSlice,
    newRelease: newReleaseSlice,
    musicPlayerSlice: musicPlayerSlice,
    session: sessionSlice,
    [userApi.reducerPath]: userApi.reducer,
    [playlistApi.reducerPath]: playlistApi.reducer,
    [artistApi.reducerPath]: artistApi.reducer,
    [languageApi.reducerPath]: languageApi.reducer,
    [musicApi.reducerPath]: musicApi.reducer,
    [genreApi.reducerPath]: genreApi.reducer,
    [albumApi.reducerPath]: albumApi.reducer,
    [likeApi.reducerPath]: likeApi.reducer,
    [audioApi.reducerPath]: audioApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "music/setWavesurferInstances",
          "music/setWavesurferRef",
        ],
        ignoredPaths: [
          "musicPlayerSlice.wavesurferRef",
          "musicPlayerSlice.wavesurferInstances",
        ],
      },
    })
      .concat(userApi.middleware)
      .concat(playlistApi.middleware)
      .concat(artistApi.middleware)
      .concat(languageApi.middleware)
      .concat(musicApi.middleware)
      .concat(genreApi.middleware)
      .concat(albumApi.middleware)
      .concat(likeApi.middleware)
      .concat(audioApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
