import type { Metadata } from 'next';
import { headers, cookies } from 'next/headers';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.scss';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Image Converter',
  description: 'Client-side image converter with history and theming.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const localeFromHeader = headersList.get('x-next-intl-locale');

  const cookieStore = await cookies();
  const themeCookie = cookieStore.get('theme')?.value;

  const locale = localeFromHeader ?? 'uk';
  const theme = themeCookie === 'dark' ? 'dark' : 'light';

  return (
    <html lang={locale} data-theme={theme}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased app-root`}>
        {children}
      </body>
    </html>
  );
}
