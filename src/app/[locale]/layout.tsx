import '@/app/globals.css';
import type { Metadata } from 'next';
import Providers from '../providers';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '../../i18n/routing';
import { Inter, Hanken_Grotesk } from 'next/font/google';
import MainShell from '@/components/commons/MainShell';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});
const hankenGrotesk = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-hanken-grotesk',
});

export const metadata: Metadata = {
  title: 'Daniel Oliver Ceramics',
  description: 'Hand-built ceramics that invite you to play with your imagination.',
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
    console.error(error);
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`antialiased ${inter.variable} ${hankenGrotesk.variable}`}>
        <Providers locale={locale} messages={messages}>
          <MainShell>{children}</MainShell>
        </Providers>
      </body>
    </html>
  );
}
