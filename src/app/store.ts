import { configureStore } from '@reduxjs/toolkit';
import qaReducer from '../features/qa/qaSlice';

export const store = configureStore({
  reducer: {
    qa: qaReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;