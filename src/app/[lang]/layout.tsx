import { Fragment } from 'react';
import { i18n } from '@/lib/i18n-config';
import type { Locale } from '@/lib/i18n-config';
import { getDictionary } from '@/lib/dictionary';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout(
  props: {
    children: React.ReactNode;
    params: Promise<{ lang: Locale }>;
  }
) {
  const { params, children } = props;
  const { lang } = await params;

  const dictionary = await getDictionary(lang);

  return (
    <Fragment>
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between p-4">
            <div className="flex space-x-8">
              <a href={`/${lang}`} className="text-gray-900 hover:text-gray-700">
                {dictionary.navigation.home}
              </a>
              <a href={`/${lang}/listings`} className="text-gray-900 hover:text-gray-700">
                {dictionary.navigation.listings}
              </a>
              <a href={`/${lang}/about`} className="text-gray-900 hover:text-gray-700">
                {dictionary.navigation.about}
              </a>
              <a href={`/${lang}/testimonials`} className="text-gray-900 hover:text-gray-700">
                {dictionary.navigation.testimonials}
              </a>
              <a href={`/${lang}/partners`} className="text-gray-900 hover:text-gray-700">
                {dictionary.navigation.partners}
              </a>
              <a href={`/${lang}/consultation`} className="text-gray-900 hover:text-gray-700">
                {dictionary.navigation.consultation}
              </a>
            </div>
            <LanguageSwitcher />
          </div>
        </nav>
      </header>
      {children}
    </Fragment>
  );
} 