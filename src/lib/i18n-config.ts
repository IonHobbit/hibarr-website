export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'de', 'tr', 'ru'],
} as const;


export enum LocaleCodes {
  EN = 'en',
  DE = 'de',
  TR = 'tr',
  RU = 'ru',
}

export const localeInfo = {
  [LocaleCodes.EN]: {
    flag: '🇬🇧',
    name: 'English',
    countryCode: 'GB',
  },
  [LocaleCodes.DE]: {
    flag: '🇩🇪',
    name: 'Deutsch',
    countryCode: 'DE',
  },
  [LocaleCodes.TR]: {
    flag: '🇹🇷',
    name: 'Türkçe',
    countryCode: 'TR',
  },
  [LocaleCodes.RU]: {
    flag: '🇷🇺',
    name: 'Русский',
    countryCode: 'RU',
  },
} as const;

export type Locale = (typeof i18n)['locales'][number]; 