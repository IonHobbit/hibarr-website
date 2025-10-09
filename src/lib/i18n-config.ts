export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'de', 'tr', 'ru'],
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
  ru: {
    flag: '🇷🇺',
    name: 'Русский',
    countryCode: 'RU',
  },
} as const;

export type Locale = (typeof i18n)['locales'][number]; 