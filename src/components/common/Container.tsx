 'use client';

import { ThemeToggle } from '@/components/common/ThemeToggle';
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { useEffect } from 'react';
import { setDayjsLocale } from '@/utils/dayjs';

type ContainerProps = {
  children: React.ReactNode;
};

export function Container({ children }: ContainerProps) {
  const tApp = useTranslations('app');
  const locale = useLocale();

  useEffect(() => {
    setDayjsLocale(locale);
  }, [locale]);

  return (
    <div>
      <header className="app-header">
        <Link href="/" className="app-header-left">
          <span className="app-logo">IC</span>
          <span className="app-title">{tApp('title')}</span>
        </Link>
        <div className="app-header-right">
          <nav className="app-nav">
            <Link href="history">{tApp('history')}</Link>
          </nav>
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </header>
      <main className="app-main">{children}</main>
    </div>
  );
}
