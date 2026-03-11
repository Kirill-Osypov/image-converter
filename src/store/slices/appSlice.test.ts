import {
  appReducer,
  setTheme,
  setLocale,
  setInitialized,
  initializeApp,
} from './appSlice';

describe('appSlice', () => {
  const initialState = {
    isInitialized: false,
    theme: 'light' as const,
    locale: 'en' as const,
  };

  it('инициализируется с начальным состоянием', () => {
    expect(appReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('setTheme меняет тему', () => {
    expect(appReducer(initialState, setTheme('dark')).theme).toBe('dark');
    expect(appReducer(initialState, setTheme('light')).theme).toBe('light');
  });

  it('setLocale меняет локаль', () => {
    expect(appReducer(initialState, setLocale('uk')).locale).toBe('uk');
    expect(appReducer(initialState, setLocale('en')).locale).toBe('en');
  });

  it('setInitialized меняет флаг инициализации', () => {
    expect(appReducer(initialState, setInitialized(true)).isInitialized).toBe(
      true,
    );
    expect(appReducer(initialState, setInitialized(false)).isInitialized).toBe(
      false,
    );
  });

  it('initializeApp не меняет состояние (сага обрабатывает)', () => {
    expect(appReducer(initialState, initializeApp())).toEqual(initialState);
  });
});
