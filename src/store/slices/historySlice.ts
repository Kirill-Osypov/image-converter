import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ConvertedImageRecord } from '@/types/history';

export type HistoryState = {
  items: ConvertedImageRecord[];
  totalSizeBytes: number;
  isLoading: boolean;
  error: string | null;
};

const initialState: HistoryState = {
  items: [],
  totalSizeBytes: 0,
  isLoading: false,
  error: null,
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    loadHistoryRequested(state) {
      state.isLoading = true;
      state.error = null;
    },
    loadHistorySucceeded(
      state,
      action: PayloadAction<{ items: ConvertedImageRecord[]; totalSizeBytes: number }>,
    ) {
      state.isLoading = false;
      state.items = action.payload.items;
      state.totalSizeBytes = action.payload.totalSizeBytes;
    },
    loadHistoryFailed(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    deleteHistoryRequested(_state, _action: PayloadAction<string>) {},
    clearHistoryRequested() {},
    recalcUsageRequested() {},
  },
});

export const {
  loadHistoryRequested,
  loadHistorySucceeded,
  loadHistoryFailed,
  deleteHistoryRequested,
  clearHistoryRequested,
  recalcUsageRequested,
} = historySlice.actions;

export const historyReducer = historySlice.reducer;
