export const i18n = {
  defaultLocale: 'en',
  // locales: ['en', 'de', 'tr'],
  locales: ['en', 'de'],
} as const;

export const localeInfo = {
  en: {
    flag: '🇬🇧',
    name: 'English',
  },
  de: {
    flag: '🇩🇪',
    name: 'Deutsch',
  },
} as const;

export type Locale = (typeof i18n)['locales'][number]; 