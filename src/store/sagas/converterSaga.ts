import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import dayjs from 'dayjs';
import { convertRequested, convertSucceeded, convertFailed } from '../slices/converterSlice';
import type { RootState } from '../rootReducer';
import { convertImage } from '@/services/image/imageConverter';
import { saveHistoryItem, getTotalStorageUsage } from '@/services/db/historyRepository';
import type { ConvertedImageRecord } from '@/types/history';
import { loadHistorySucceeded } from '../slices/historySlice';

const selectFiles = (state: RootState) => state.converter.files;
const selectTargetFormat = (state: RootState) => state.converter.targetFormat;

function* convertWorker() {
  try {
    const [files, targetMimeType]: [File[], string] = yield all([
      select(selectFiles),
      select(selectTargetFormat),
    ]);

    if (!files.length) {
      yield put(convertFailed('No files to convert'));
      return;
    }

    const results: ConvertedImageRecord[] = [];

    for (const file of files) {
      const { blob, width, height, sizeBytes } = yield call(convertImage, file, targetMimeType);

      const createdAt = dayjs();
      const expiresAt = createdAt.add(7, 'day');

      const record: ConvertedImageRecord = {
        id: crypto.randomUUID(),
        originalName: file.name,
        originalMimeType: file.type,
        targetMimeType: targetMimeType as ConvertedImageRecord['targetMimeType'],
        createdAt: createdAt.toISOString(),
        expiresAt: expiresAt.toISOString(),
        sizeBytes,
        width,
        height,
        blob,
      };

      yield call(saveHistoryItem, record);
      results.push(record);
    }

    const totalSizeBytes: number = yield call(getTotalStorageUsage);
    yield put(convertSucceeded(results));
    yield put(loadHistorySucceeded({ items: results, totalSizeBytes }));
  } catch (error) {
    yield put(convertFailed(error instanceof Error ? error.message : 'Failed to convert images'));
  }
}

export function* converterSaga() {
  yield takeLatest(convertRequested.type, convertWorker);
}
