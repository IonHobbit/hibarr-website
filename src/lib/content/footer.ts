import { Locale } from "../i18n-config";

type Content = {
  [key in Locale]: {
    [key: string]: string;
  }
}

export const footerContent: Content = {
  en: {
    contactUs: 'Contact Us',
    careers: 'Careers',
    privacyPolicy: 'Privacy Policy',
    copyright: '© Copyright {currentYear} <span class="font-semibold">XEGARA Trading Ltd.</span> all rights reserved',
  },
  de: {
    contactUs: 'Kontaktiere uns',
    careers: 'Karriere',
    copyright: '© Copyright {currentYear} <span class="font-semibold">XEGARA Trading Ltd.</span> Alle Rechte vorbehalten',
    privacyPolicy: 'Datenschutz',
  },
  tr: {
    contactUs: 'Bize Ulaşın',
    careers: 'Kariyer',
    copyright: '© Copyright {currentYear} <span class="font-semibold">XEGARA Trading Ltd.</span> Tüm hakları saklıdır',
    privacyPolicy: 'Gizlilik Politikası',
  },
  ru: {
    contactUs: 'Свяжитесь с нами',
    careers: 'Карьера',
    copyright: '© Copyright {currentYear} <span class="font-semibold">XEGARA Trading Ltd.</span> Все права защищены',
    privacyPolicy: 'Политика конфиденциальности',
  }
}