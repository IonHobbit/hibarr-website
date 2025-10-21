'use client'

import { i18n, localeInfo } from '@/lib/i18n-config'
import { Locale } from '@/lib/i18n-config'
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation'
import { Fragment, useState } from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { cn } from '@/lib/utils';

export default function LanguageSwitcher() {
  const params = useParams();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const lang = params.lang as Locale;

  return (
    <Fragment>
      <div className="flex gap-4">
        <HoverCard openDelay={200} closeDelay={300} open={open} onOpenChange={setOpen}>
          <HoverCardTrigger className='hidden md:flex'>
            <span className={cn('text-xl cursor-pointer', `fi fi-${localeInfo[lang].countryCode.toLowerCase()}`)}></span>
          </HoverCardTrigger>
          <HoverCardContent align='end' className='hidden md:flex w-40 bg-primary flex-col gap-3 border-none mt-2 shadow-none rounded-md'>
            {i18n.locales.map((locale) => (
              <Link
                key={locale}
                href={pathname.replace(`/${lang}`, `/${locale}`)}
                className={`text-primary-foreground flex gap-2 items-center hover:text-primary-foreground/80 ${locale === lang ? 'font-bold' : ''
                  }`}
              >
                <span className={cn('text-xl cursor-pointer', `fi fi-${localeInfo[locale].countryCode.toLowerCase()}`)}></span>
                <span>{localeInfo[locale].name}</span>
              </Link>
            ))}
          </HoverCardContent>
        </HoverCard>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger className='md:hidden'>
            <span className={cn('text-xl cursor-pointer', `fi fi-${localeInfo[lang].countryCode.toLowerCase()}`)}></span>
          </PopoverTrigger>
          <PopoverContent align='end' className='w-40 bg-primary flex md:hidden flex-col gap-3 border-none mt-2 shadow-none rounded-md'>
            {i18n.locales.map((locale) => (
              <Link
                key={locale}
                href={pathname.replace(`/${lang}`, `/${locale}`)}
                className={`text-primary-foreground flex gap-2 items-center hover:text-primary-foreground/80 ${locale === lang ? 'font-bold' : ''
                  }`}
              >
                <span className={cn('text-xl cursor-pointer', `fi fi-${localeInfo[locale].countryCode.toLowerCase()}`)}></span>
                <span>{localeInfo[locale].name}</span>
              </Link>
            ))}
          </PopoverContent>
        </Popover>
      </div>
    </Fragment>
  )
}
