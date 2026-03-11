import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AppTheme = 'light' | 'dark';
export type AppLocale = 'uk' | 'en';

export type AppState = {
  isInitialized: boolean;
  theme: AppTheme;
  locale: AppLocale;
};

const initialState: AppState = {
  isInitialized: false,
  theme: 'light',
  locale: 'uk',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    initializeApp() {},
    setTheme(state, action: PayloadAction<AppTheme>) {
      state.theme = action.payload;
    },
    setLocale(state, action: PayloadAction<AppLocale>) {
      state.locale = action.payload;
    },
    setInitialized(state, action: PayloadAction<boolean>) {
      state.isInitialized = action.payload;
    },
  },
});

export const { initializeApp, setTheme, setLocale, setInitialized } = appSlice.actions;
export const appReducer = appSlice.reducer;
