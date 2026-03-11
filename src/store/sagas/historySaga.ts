import { call, put, takeLatest } from 'redux-saga/effects';
import {
  clearHistoryRequested,
  deleteHistoryRequested,
  loadHistoryFailed,
  loadHistoryRequested,
  loadHistorySucceeded,
  recalcUsageRequested,
} from '../slices/historySlice';
import {
  clearHistory,
  deleteHistoryItem,
  getAllHistory,
  getTotalStorageUsage,
} from '@/services/db/historyRepository';

function* loadHistoryWorker(): Generator {
  try {
    const items = (yield call(getAllHistory)) as Awaited<ReturnType<typeof getAllHistory>>;
    const totalSizeBytes = (yield call(getTotalStorageUsage)) as Awaited<
      ReturnType<typeof getTotalStorageUsage>
    >;
    yield put(loadHistorySucceeded({ items, totalSizeBytes }));
  } catch (error) {
    yield put(loadHistoryFailed(error instanceof Error ? error.message : 'Failed to load history'));
  }
}

function* deleteHistoryWorker(action: ReturnType<typeof deleteHistoryRequested>): Generator {
  try {
    yield call(deleteHistoryItem, action.payload);
    yield* loadHistoryWorker();
  } catch (error) {
    yield put(loadHistoryFailed(error instanceof Error ? error.message : 'Failed to delete item'));
  }
}

function* clearHistoryWorker(): Generator {
  try {
    yield call(clearHistory);
    yield* loadHistoryWorker();
  } catch (error) {
    yield put(
      loadHistoryFailed(error instanceof Error ? error.message : 'Failed to clear history'),
    );
  }
}

function* recalcUsageWorker(): Generator {
  try {
    const totalSizeBytes: number = yield call(getTotalStorageUsage);
    const items = yield call(getAllHistory);
    yield put(loadHistorySucceeded({ items, totalSizeBytes }));
  } catch (error) {
    yield put(loadHistoryFailed(error instanceof Error ? error.message : 'Failed to recalc usage'));
  }
}

export function* historySaga() {
  yield takeLatest(loadHistoryRequested.type, loadHistoryWorker);
  yield takeLatest(deleteHistoryRequested.type, deleteHistoryWorker);
  yield takeLatest(clearHistoryRequested.type, clearHistoryWorker);
  yield takeLatest(recalcUsageRequested.type, recalcUsageWorker);
}
