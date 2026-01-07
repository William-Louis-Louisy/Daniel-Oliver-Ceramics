'use client';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { NextIntlClientProvider } from 'next-intl';
import Header from '@/components/navigation/Header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function Providers({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode;
  locale: string;
  messages: Record<string, string>;
}) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );
  return (
    <QueryClientProvider client={client}>
      <NextIntlClientProvider locale={locale} messages={messages} timeZone="Europe/Paris">
        <Header />
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            className: '',
            duration: 3000,
            removeDelay: 1000,
            style: {
              background: '#313131',
              color: '#fff',
            },
          }}
        />
      </NextIntlClientProvider>
    </QueryClientProvider>
  );
}
