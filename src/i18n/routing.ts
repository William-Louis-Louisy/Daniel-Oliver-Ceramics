import { defineRouting } from 'next-intl/routing';
export const routing = defineRouting({
  locales: ['en', 'fr', 'es', 'zh', 'ja', 'ko'],
  defaultLocale: 'en',
});
