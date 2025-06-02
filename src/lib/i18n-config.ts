export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'de', 'tr'],
} as const;

export const localeInfo = {
  en: {
    flag: '🇬🇧',
    name: 'English',
    countryCode: 'GB',
  },
  de: {
    flag: '🇩🇪',
    name: 'Deutsch',
    countryCode: 'DE',
  },
  tr: {
    flag: '🇹🇷',
    name: 'Türkçe',
    countryCode: 'TR',
  },
} as const;

export type Locale = (typeof i18n)['locales'][number]; 