'use client'

import { i18n, localeInfo } from '@/lib/i18n-config'
import { Locale } from '@/lib/i18n-config'
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { useState } from 'react';

export default function LanguageSwitcher() {
  const params = useParams();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const lang = params.lang as Locale;

  const handleMouseEnter = () => {
    setOpen(true);
  }

  const handleMouseLeave = () => {
    setOpen(false);
  }

  return (
    <div className="flex gap-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger onMouseEnter={handleMouseEnter}>
          <p className='text-2xl cursor-pointer'>{localeInfo[lang].flag}</p>
        </PopoverTrigger>
        <PopoverContent align='end' className='w-40 bg-primary flex flex-col gap-2 border-none mt-2 shadow-none rounded-md' onMouseLeave={handleMouseLeave}>
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
