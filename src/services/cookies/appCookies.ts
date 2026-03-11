const THEME_COOKIE_KEY = 'theme';
const LOCALE_COOKIE_KEY = 'locale';

type Theme = 'light' | 'dark';
type Locale = 'uk' | 'en';

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') {
    return null;
  }

  const value = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`))
    ?.split('=')[1];

  return value ? decodeURIComponent(value) : null;
}

function setCookie(name: string, value: string, days = 365): void {
  if (typeof document === 'undefined') {
    return;
  }

  const expires = new Date();
  expires.setDate(expires.getDate() + days);

  document.cookie = `${name}=${encodeURIComponent(
    value,
  )}; expires=${expires.toUTCString()}; path=/`;
}

export function getThemeCookie(): Theme | null {
  const value = getCookie(THEME_COOKIE_KEY);
  return value === 'dark' || value === 'light' ? value : null;
}

export function setThemeCookie(theme: Theme): void {
  setCookie(THEME_COOKIE_KEY, theme);
}

export function getLocaleCookie(): Locale | null {
  const value = getCookie(LOCALE_COOKIE_KEY);
  return value === 'uk' || value === 'en' ? value : null;
}

export function setLocaleCookie(locale: Locale): void {
  setCookie(LOCALE_COOKIE_KEY, locale);
}
