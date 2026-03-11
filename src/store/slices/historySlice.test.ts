import {
  historyReducer,
  loadHistoryRequested,
  loadHistorySucceeded,
  loadHistoryFailed,
  deleteHistoryRequested,
  clearHistoryRequested,
  recalcUsageRequested,
} from './historySlice';
import type { ConvertedImageRecord } from '@/types/history';

const mockRecord: ConvertedImageRecord = {
  id: '1',
  originalName: 'test.jpg',
  originalMimeType: 'image/jpeg',
  fileName: 'test.png',
  targetMimeType: 'image/png',
  createdAt: '2024-01-01T00:00:00Z',
  expiresAt: '2025-01-01T00:00:00Z',
  sizeBytes: 100,
  width: 10,
  height: 10,
  blob: new Blob(),
};

describe('historySlice', () => {
  const initialState = {
    items: [] as ConvertedImageRecord[],
    totalSizeBytes: 0,
    isLoading: false,
    error: null as string | null,
  };

  it('инициализируется с начальным состоянием', () => {
    expect(historyReducer(undefined, { type: 'unknown' })).toEqual(
      initialState,
    );
  });

  it('loadHistoryRequested выставляет isLoading и сбрасывает error', () => {
    let state = historyReducer(initialState, loadHistoryFailed('err'));
    state = historyReducer(state, loadHistoryRequested());
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('loadHistorySucceeded записывает items и totalSizeBytes', () => {
    let state = historyReducer(initialState, loadHistoryRequested());
    state = historyReducer(
      state,
      loadHistorySucceeded({ items: [mockRecord], totalSizeBytes: 100 }),
    );
    expect(state.isLoading).toBe(false);
    expect(state.items).toHaveLength(1);
    expect(state.items[0].id).toBe('1');
    expect(state.totalSizeBytes).toBe(100);
  });

  it('loadHistoryFailed записывает ошибку', () => {
    let state = historyReducer(initialState, loadHistoryRequested());
    state = historyReducer(state, loadHistoryFailed('Load failed'));
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Load failed');
  });

  it('deleteHistoryRequested не меняет состояние (сага обрабатывает)', () => {
    expect(
      historyReducer(initialState, deleteHistoryRequested('id')),
    ).toEqual(initialState);
  });

  it('clearHistoryRequested не меняет состояние (сага обрабатывает)', () => {
    expect(historyReducer(initialState, clearHistoryRequested())).toEqual(
      initialState,
    );
  });

  it('recalcUsageRequested не меняет состояние (сага обрабатывает)', () => {
    expect(historyReducer(initialState, recalcUsageRequested())).toEqual(
      initialState,
    );
  });
});
