import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ConvertedImageRecord } from '@/types/history';
import type { TargetMimeType } from '@/utils/converterFormats';

export type { TargetMimeType };

export type ConverterState = {
  files: File[];
  targetFormat: TargetMimeType;
  isConverting: boolean;
  results: ConvertedImageRecord[];
  error: string | null;
};

const initialState: ConverterState = {
  files: [],
  targetFormat: 'image/png',
  isConverting: false,
  results: [],
  error: null,
};

const converterSlice = createSlice({
  name: 'converter',
  initialState,
  reducers: {
    setFiles(state, action: PayloadAction<File[]>) {
      state.files = action.payload;
    },
    setTargetFormat(state, action: PayloadAction<TargetMimeType>) {
      state.targetFormat = action.payload;
    },
    convertRequested(state) {
      state.isConverting = true;
      state.error = null;
    },
    convertSucceeded(state, action: PayloadAction<ConvertedImageRecord[]>) {
      state.isConverting = false;
      state.results = action.payload;
    },
    convertFailed(state, action: PayloadAction<string>) {
      state.isConverting = false;
      state.error = action.payload;
    },
    clearResults(state) {
      state.results = [];
    },
  },
});

export const {
  setFiles,
  setTargetFormat,
  convertRequested,
  convertSucceeded,
  convertFailed,
  clearResults,
} = converterSlice.actions;

export const converterReducer = converterSlice.reducer;
