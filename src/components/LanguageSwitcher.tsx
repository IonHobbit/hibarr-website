'use client'

import { i18n, localeInfo } from '@/lib/i18n-config'
import { Locale } from '@/lib/i18n-config'
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

export default function LanguageSwitcher() {
  const params = useParams();
  const pathname = usePathname();

  const lang = params.lang as Locale;

  return (
    <div className="flex gap-4">
      <Popover>
        <PopoverTrigger>
          <p className='text-2xl cursor-pointer'>{localeInfo[lang].flag}</p>
        </PopoverTrigger>
        <PopoverContent align='end' className='w-40 bg-primary flex flex-col gap-2 border-none mt-2 shadow-none rounded-md'>
          {i18n.locales.map((locale) => (
            <Link
              key={locale}
              href={pathname.replace(`/${lang}`, `/${locale}`)}
              className={`text-primary-foreground flex gap-2 items-center hover:text-primary-foreground/80 ${locale === lang ? 'font-bold' : ''
                }`}
            >
              <span>{localeInfo[locale].flag}</span>
              <span>{localeInfo[locale].name}</span>
            </Link>
          ))}
        </PopoverContent>
      </Popover>
    </div>
  )
}
