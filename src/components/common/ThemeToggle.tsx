'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import type { RootState } from '@/store/rootReducer';
import { setTheme } from '@/store/slices/appSlice';
import { setThemeCookie } from '@/services/cookies/appCookies';
import { IconButton } from './IconButton';

export function ThemeToggle() {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.app.theme);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggle = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    dispatch(setTheme(nextTheme));
    setThemeCookie(nextTheme);
  };

  return (
    <IconButton aria-label="Toggle theme" onClick={toggle}>
      {theme === 'light' ? <MoonIcon className="icon-md" /> : <SunIcon className="icon-md" />}
    </IconButton>
  );
}
