import { ThemeToggle } from '@/components/common/ThemeToggle';
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

type ContainerProps = {
  children: React.ReactNode;
};

export function Container({ children }: ContainerProps) {
  const tApp = useTranslations('app');

  return (
    <div>
      <header className="app-header">
        <div className="app-header-left">
          <span className="app-logo">IC</span>
          <span className="app-title">{tApp('title')}</span>
        </div>
        <div className="app-header-right">
          <nav className="app-nav">
            <Link href=".">{tApp('title')}</Link>
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
