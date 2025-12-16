import { Locale } from "@/lib/i18n-config";

type FeaturedContent = {
  [key in Locale]: {
    title: string;
    logos: string[];
  }
}

const logos = [
  "https://res.cloudinary.com/hibarr/image/upload/v1758785140/whatswhat-logo_xyq9sw.png",
  "https://res.cloudinary.com/hibarr/image/upload/v1750747645/erfolg-magazin-logo_nthlb6.webp",
  "https://res.cloudinary.com/hibarr/image/upload/v1750747645/gruender-de-logo-black_ndnwry.png",
  "https://res.cloudinary.com/hibarr/image/upload/v1750747645/forbes-logo_vwad88.png",
  "https://res.cloudinary.com/hibarr/image/upload/v1750747645/wallstreet-online-logo-black-300x91-1_gelaga.png",
  "https://res.cloudinary.com/hibarr/image/upload/v1750747645/Black-Netflix-Text-Logo_ehsqkh.png",
  "https://res.cloudinary.com/hibarr/image/upload/v1750747645/suddeutsche-zeitung-logo_sqjx2p.png",
  "https://res.cloudinary.com/hibarr/image/upload/v1750747645/bellevue-logo-black_ej8bvy.png"
]

export const featuredContent: FeaturedContent = {
  en: {
    title: 'Featured in',
    logos,
  },
  tr: {
    title: 'Öne Çıkanlar',
    logos,
  },
  de: {
    title: 'Vorgestellt in',
    logos,
  },
  ru: {
    title: 'Известные бренды',
    logos,
  },
}