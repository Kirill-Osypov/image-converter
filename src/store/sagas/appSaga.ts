import { call, put, takeLatest } from 'redux-saga/effects';
import dayjs from 'dayjs';
import { initializeApp, setInitialized } from '../slices/appSlice';
import { loadHistorySucceeded, loadHistoryFailed } from '../slices/historySlice';
import {
  deleteExpiredHistory,
  getAllHistory,
  getTotalStorageUsage,
} from '@/services/db/historyRepository';

function* initializeAppWorker(): Generator {
  try {
    yield call(deleteExpiredHistory, dayjs().toISOString());
    const items = (yield call(getAllHistory)) as Awaited<ReturnType<typeof getAllHistory>>;
    const totalSizeBytes = (yield call(getTotalStorageUsage)) as Awaited<
      ReturnType<typeof getTotalStorageUsage>
    >;

    yield put(loadHistorySucceeded({ items, totalSizeBytes }));
    yield put(setInitialized(true));
  } catch (error) {
    yield put(
      loadHistoryFailed(error instanceof Error ? error.message : 'Failed to initialize app'),
    );
    yield put(setInitialized(true));
  }
}

export function* appSaga() {
  yield takeLatest(initializeApp.type, initializeAppWorker);
}
