'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { setLocaleCookie } from '@/services/cookies/appCookies';

const supportedLocales = ['uk', 'en'] as const;

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = event.target.value;
    if (nextLocale === locale) return;

    const segments = pathname.split('/');
    segments[1] = nextLocale;
    const nextPath = segments.join('/') || `/${nextLocale}`;

    setLocaleCookie(nextLocale as (typeof supportedLocales)[number]);
    router.push(nextPath);
    document.documentElement.setAttribute('lang', nextLocale);
  };

  return (
    <select
      className="language-switcher"
      value={locale}
      onChange={handleChange}
      aria-label="Language"
    >
      {supportedLocales.map((value) => (
        <option key={value} value={value}>
          {value.toUpperCase()}
        </option>
      ))}
    </select>
  );
}
