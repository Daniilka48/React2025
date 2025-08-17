import type { Metadata } from 'next';
import { getMessages, setRequestLocale } from 'next-intl/server';
import Providers from './providers';
import { NextIntlClientProvider } from 'next-intl';
import '../globals.css';
import { locales } from '../../i18n';

export const metadata: Metadata = {
  title: 'SWAPI Search',
  description: 'Next.js SSR + RTK Query + i18n',
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
