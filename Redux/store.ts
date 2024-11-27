// store.ts
import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "@/services/user";
import userSlice from "./features/user/userSlice";
export const store = configureStore({
  reducer: {
    userReducer: userSlice,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
