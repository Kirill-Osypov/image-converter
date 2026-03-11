import {
  converterReducer,
  setFiles,
  setTargetFormat,
  removeFile,
  convertRequested,
  convertSucceeded,
  convertFailed,
  clearResults,
} from './converterSlice';
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

describe('converterSlice', () => {
  const initialState = {
    files: [] as File[],
    targetFormat: 'image/png' as const,
    isConverting: false,
    results: [] as ConvertedImageRecord[],
    error: null as string | null,
  };

  it('инициализируется с начальным состоянием', () => {
    expect(converterReducer(undefined, { type: 'unknown' })).toEqual({
      files: [],
      targetFormat: 'image/png',
      isConverting: false,
      results: [],
      error: null,
    });
  });

  it('setFiles устанавливает файлы', () => {
    const file = new File([''], 'test.png', { type: 'image/png' });
    const state = converterReducer(initialState, setFiles([file]));
    expect(state.files).toHaveLength(1);
    expect(state.files[0].name).toBe('test.png');
  });

  it('removeFile удаляет файл по индексу', () => {
    const file = new File([''], 'test.png', { type: 'image/png' });
    let state = converterReducer(initialState, setFiles([file, file]));
    expect(state.files).toHaveLength(2);
    state = converterReducer(state, removeFile(0));
    expect(state.files).toHaveLength(1);
  });

  it('setTargetFormat меняет целевой формат', () => {
    const state = converterReducer(
      initialState,
      setTargetFormat('image/webp'),
    );
    expect(state.targetFormat).toBe('image/webp');
  });

  it('convertRequested выставляет isConverting и сбрасывает error', () => {
    let state = converterReducer(initialState, convertFailed('error'));
    expect(state.error).toBe('error');
    state = converterReducer(state, convertRequested());
    expect(state.isConverting).toBe(true);
    expect(state.error).toBeNull();
  });

  it('convertSucceeded записывает результаты и очищает files', () => {
    const file = new File([''], 'test.png', { type: 'image/png' });
    let state = converterReducer(initialState, setFiles([file]));
    state = converterReducer(state, convertRequested());
    state = converterReducer(state, convertSucceeded([mockRecord]));
    expect(state.isConverting).toBe(false);
    expect(state.results).toHaveLength(1);
    expect(state.results[0].id).toBe('1');
    expect(state.files).toHaveLength(0);
  });

  it('convertFailed записывает ошибку и сбрасывает isConverting', () => {
    let state = converterReducer(initialState, convertRequested());
    state = converterReducer(state, convertFailed('Conversion failed'));
    expect(state.isConverting).toBe(false);
    expect(state.error).toBe('Conversion failed');
  });

  it('clearResults очищает results', () => {
    let state = converterReducer(initialState, convertSucceeded([mockRecord]));
    expect(state.results).toHaveLength(1);
    state = converterReducer(state, clearResults());
    expect(state.results).toHaveLength(0);
  });
});
