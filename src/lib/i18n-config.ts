export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'de', 'tr'],
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
  tr: {
    flag: '🇹🇷',
    name: 'Türkçe',
  },
} as const;

export type Locale = (typeof i18n)['locales'][number]; 