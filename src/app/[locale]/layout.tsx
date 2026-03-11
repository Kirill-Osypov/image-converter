import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { cookies } from 'next/headers';
import { getMessages } from '@/i18n/server';
import { locales } from '@/i18n/routing';
import { StoreProvider } from '@/store/StoreProvider';
import type { AppLocale, AppTheme } from '@/store/slices/appSlice';

type LocaleLayoutProps = LayoutProps<'/[locale]'>;

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const resolved = await params;
  const locale = resolved.locale;

  if (!locales.includes(locale as never)) {
    notFound();
  }

  const messages = await getMessages(locale as never);

  const cookieStore = await cookies();
  const themeCookie = cookieStore.get('theme')?.value;
  const initialTheme: AppTheme = themeCookie === 'dark' ? 'dark' : 'light';
  const initialLocale = locale as AppLocale;

  return (
    <StoreProvider initialTheme={initialTheme} initialLocale={initialLocale}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <div className="page-shell">{children}</div>
      </NextIntlClientProvider>
    </StoreProvider>
  );
}
