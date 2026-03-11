import { defineRouting } from 'next-intl/routing';

export const locales = ['uk', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const routing = defineRouting({
  locales,
  defaultLocale,
  pathnames: {
    '/': '/',
    '/history': '/history',
  },
});
