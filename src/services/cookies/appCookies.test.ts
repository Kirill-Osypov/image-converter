import {
  getThemeCookie,
  setThemeCookie,
  getLocaleCookie,
  setLocaleCookie,
} from './appCookies';

describe('appCookies', () => {
  beforeEach(() => {
    document.cookie.split(';').forEach((c) => {
      document.cookie = c
        .replace(/^ +/, '')
        .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
    });
  });

  describe('theme', () => {
    it('getThemeCookie возвращает null если куки нет', () => {
      expect(getThemeCookie()).toBeNull();
    });

    it('setThemeCookie и getThemeCookie сохраняют и читают тему', () => {
      setThemeCookie('dark');
      expect(getThemeCookie()).toBe('dark');
      setThemeCookie('light');
      expect(getThemeCookie()).toBe('light');
    });

    it('getThemeCookie возвращает null для невалидного значения', () => {
      document.cookie = 'theme=invalid; path=/';
      expect(getThemeCookie()).toBeNull();
    });
  });

  describe('locale', () => {
    it('getLocaleCookie возвращает null если куки нет', () => {
      expect(getLocaleCookie()).toBeNull();
    });

    it('setLocaleCookie и getLocaleCookie сохраняют и читают локаль', () => {
      setLocaleCookie('uk');
      expect(getLocaleCookie()).toBe('uk');
      setLocaleCookie('en');
      expect(getLocaleCookie()).toBe('en');
    });

    it('getLocaleCookie возвращает null для невалидного значения', () => {
      document.cookie = 'locale=fr; path=/';
      expect(getLocaleCookie()).toBeNull();
    });
  });
});
