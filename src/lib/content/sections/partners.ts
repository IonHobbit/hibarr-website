import { Locale } from "@/lib/i18n-config";

type PartnersContent = {
  [key in Locale]: {
    title: string;
  }
}

export const partnersContent: PartnersContent = {
  en: {
    title: 'Our Partners',
  },
  de: {
    title: 'Unsere Partner',
  },
  tr: {
    title: 'Ortaklarımız',
  },
  ru: {
    title: 'Наши Партнеры',
  },
}