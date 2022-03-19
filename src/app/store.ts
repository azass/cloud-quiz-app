import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import editReducer from '../slices/editSlice';

export const store = configureStore({
  reducer: {
    edit: editReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
