import { Locale } from "@/lib/i18n-config";

type PartnersContent = {
  [key in Locale]: {
    title: string;
    logos: string[];
  }
}

const logos = [
  "https://res.cloudinary.com/hibarr/image/upload/v1748596118/near-east-bank_hwucb3.svg",
  "https://res.cloudinary.com/hibarr/image/upload/v1748595884/iktisatbank-logo_srk805.svg",
  "https://res.cloudinary.com/hibarr/image/upload/v1748595778/logo_j5fy0u.png",
  "https://res.cloudinary.com/hibarr/image/upload/v1748593886/ambasedeusBW-300x134-1_ejpsyy.png",
  "https://res.cloudinary.com/hibarr/image/upload/v1748593885/dwnamexBW-1_abd3e2.png",
  "https://res.cloudinary.com/hibarr/image/upload/v1748593885/grand-pasha-logo-BW-1-300x216-1_q0rlxv.png",
  "https://res.cloudinary.com/hibarr/image/upload/v1748593884/cratos-BW_esybo9.png",
  "https://res.cloudinary.com/hibarr/image/upload/v1748593883/creditwestBW_bblkpz.png"
]

export const partnersContent: PartnersContent = {
  en: {
    title: 'Our Partners',
    logos,
  },
  de: {
    title: 'Unsere Partner',
    logos,
  },
  tr: {
    title: 'Ortaklarımız',
    logos,
  },
  ru: {
    title: 'Наши Партнеры',
    logos,
  },
}