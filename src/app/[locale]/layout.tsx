import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from '@/i18n/server';
import { locales } from '@/i18n/routing';
import { StoreProvider } from '@/store/StoreProvider';

type LocaleLayoutProps = LayoutProps<'/[locale]'>;

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const resolved = await params;
  const locale = resolved.locale;

  if (!locales.includes(locale as never)) {
    notFound();
  }

  const messages = await getMessages(locale as never);

  return (
    <StoreProvider>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <div className="page-shell">{children}</div>
      </NextIntlClientProvider>
    </StoreProvider>
  );
}
