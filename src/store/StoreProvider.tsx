'use client';

import { Provider } from 'react-redux';
import { useEffect } from 'react';
import { store } from './index';
import { initializeApp } from './slices/appSlice';

type StoreProviderProps = {
  children: React.ReactNode;
};

export function StoreProvider({ children }: StoreProviderProps) {
  useEffect(() => {
    store.dispatch(initializeApp());
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
