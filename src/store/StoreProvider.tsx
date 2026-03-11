'use client';

import { Provider } from 'react-redux';
import { useEffect, useState } from 'react';
import { makeStore } from './index';
import { initializeApp, type AppLocale, type AppTheme } from './slices/appSlice';

type StoreProviderProps = {
  children: React.ReactNode;
  initialTheme: AppTheme;
  initialLocale: AppLocale;
};

export function StoreProvider({ children, initialTheme, initialLocale }: StoreProviderProps) {
  const [store] = useState(() =>
    makeStore({
      app: {
        isInitialized: false,
        theme: initialTheme,
        locale: initialLocale,
      },
    } as Parameters<typeof makeStore>[0]),
  );

  useEffect(() => {
    store.dispatch(initializeApp());
  }, [store]);

  return <Provider store={store}>{children}</Provider>;
}
