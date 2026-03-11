import { combineReducers } from '@reduxjs/toolkit';
import { appReducer } from './slices/appSlice';
import { converterReducer } from './slices/converterSlice';
import { historyReducer } from './slices/historySlice';

export const rootReducer = combineReducers({
  app: appReducer,
  converter: converterReducer,
  history: historyReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
