import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import gameReducer from './slices/game';

const store = configureStore({
  reducer: {
    auth: authReducer,
    game: gameReducer,
  },

  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
