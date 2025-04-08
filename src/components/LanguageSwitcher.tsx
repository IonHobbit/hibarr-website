'use client'

import { i18n } from '@/lib/i18n-config'
import { Locale } from '@/lib/i18n-config'
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation'

export default function LanguageSwitcher() {
  const params = useParams();
  const pathname = usePathname();

  const lang = params.lang as Locale;

  return (
    <div className="flex gap-4">
      {i18n.locales.map((locale) => (
        <Link
          key={locale}
          href={pathname.replace(`/${lang}`, `/${locale}`)}
          className={`text-primary-foreground hover:text-primary-foreground/80 ${locale === lang ? 'font-bold' : ''
            }`}
        >
          {locale.toUpperCase()}
        </Link>
      ))}
    </div>
  )
}
