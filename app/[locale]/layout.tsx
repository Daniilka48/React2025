import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Providers from './providers';
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
  return (
    <html lang={locale}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
