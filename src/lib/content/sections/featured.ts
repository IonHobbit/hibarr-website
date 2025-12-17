import { Locale } from "@/lib/i18n-config";

type FeaturedContent = {
  [key in Locale]: {
    title: string;
  }
}

export const featuredContent: FeaturedContent = {
  en: {
    title: 'Featured in',
  },
  tr: {
    title: 'Öne Çıkanlar',
  },
  de: {
    title: 'Vorgestellt in',
  },
  ru: {
    title: 'Известные бренды',
  },
}