import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '@/store/rootReducer';
import { ConverterModule } from './ConverterModule';
import type { RootState } from '@/store/rootReducer';
import type { ConvertedImageRecord } from '@/types/history';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en',
}));

jest.mock('next/link', () => {
  return function MockLink({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) {
    return <a href={href}>{children}</a>;
  };
});

jest.mock('@/components/common/Container', () => ({
  Container: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

function createTestStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

describe('ConverterModule', () => {
  it('рендерит заголовок и зону загрузки', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <ConverterModule />
      </Provider>,
    );
    expect(screen.getByText('heading')).toBeInTheDocument();
  });

  it('показывает EmptyState когда результатов нет', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <ConverterModule />
      </Provider>,
    );
    expect(screen.getByText('noResults')).toBeInTheDocument();
  });

  it('показывает сетку результатов при наличии записей', () => {
    const record: ConvertedImageRecord = {
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
    const store = createTestStore({
      converter: {
        files: [],
        targetFormat: 'image/png',
        isConverting: false,
        results: [record],
        error: null,
      },
    } as RootState);
    render(
      <Provider store={store}>
        <ConverterModule />
      </Provider>,
    );
    expect(screen.queryByText('noResults')).not.toBeInTheDocument();
    expect(document.querySelector('.converter-results-grid')).toBeInTheDocument();
  });
});
