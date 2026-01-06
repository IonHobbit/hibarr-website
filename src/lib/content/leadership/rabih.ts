import type { Locale } from '@/lib/i18n-config';

type RabihContent = {
  [key in Locale]: {
    bio: string;
    expertise: string[];
    achievements: string;
  }
}

export const rabihContent = {
  en: {
    bio:
      'Rabih is a visionary leader with over 15 years of experience in international real estate and finance. Before founding Hibarr, he managed multi-million dollar portfolios across the Middle East and Europe. His expertise lies in identifying emerging markets with high growth potential and bridging the gap for international investors through transparent, data-driven advice. Rabih believes that trust is the currency of modern business, a philosophy that permeates every level of our organization.',
    expertise: [
      'International Real Estate Strategy',
      'Investment Portfolio Management',
      'Cross-border Finance',
      'Market Analysis',
    ],
    achievements:
      "Under his leadership, Hibarr has facilitated over €50M in foreign direct investment into Cyprus and established strategic alliances with the region's top developers and banks.",
  },
  de: {
    bio:
      'Rabih ist eine visionäre Führungspersönlichkeit mit über 15 Jahren Erfahrung im internationalen Immobilien- und Finanzwesen. Vor der Gründung von Hibarr verwaltete er Portfolios im Wert von mehreren Millionen Dollar im Nahen Osten und Europa. Seine Expertise liegt in der Identifizierung von Wachstumsmärkten und der transparenten Beratung internationaler Investoren. Rabih glaubt daran, dass Vertrauen die Währung des modernen Geschäftslebens ist.',
    expertise: [
      'Internationale Immobilienstrategie',
      'Investment-Portfoliomanagement',
      'Grenzüberschreitende Finanzen',
      'Marktanalyse',
    ],
    achievements:
      'Unter seiner Führung hat Hibarr über 50 Mio. € an ausländischen Direktinvestitionen nach Zypern vermittelt und strategische Allianzen mit den Top-Entwicklern der Region geschmiedet.',
  },
  tr: {
    bio:
      "Rabih, uluslararası gayrimenkul ve finans alanında 15 yılı aşkın deneyime sahip vizyoner bir liderdir. Hibarr'ı kurmadan önce Orta Doğu ve Avrupa'da milyonlarca dolarlık portföyleri yönetmiştir.",
    expertise: [
      'Uluslararası Gayrimenkul Stratejisi',
      'Yatırım Portföy Yönetimi',
      'Sınıraşan Finans',
      'Piyasa Analizi',
    ],
    achievements:
      "Liderliğinde Hibarr, Kıbrıs'a 50 Milyon Euro'dan fazla doğrudan yabancı yatırım çekmiştir.",
  },
  ru: {
    bio:
      'Раби — визионер с более чем 15-летним опытом в международной недвижимости и финансах. До основания Hibarr он управлял многомиллионными портфелями на Ближнем Востоке и в Европе.',
    expertise: [
      'Международные стратегии недвижимости',
      'Управление портфелем',
      'Трансграничные финансы',
      'Анализ рынка',
    ],
    achievements:
      'Под его руководством Hibarr привлекла более 50 млн евро инвестиций на Кипр.',
  },
} as RabihContent;
