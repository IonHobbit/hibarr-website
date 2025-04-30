'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from './ui/button'
import HeaderItem from './HeaderItem'
import { Locale } from '@/lib/i18n-config'
import { Navigation } from '@/types/sanity.types'
import LanguageSwitcher from './LanguageSwitcher'
import MobileNavigationMenu from './MobileNavigationMenu'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

type ClientHeaderProps = {
  lang: Locale
  navigationData: Navigation
}

export default function ClientHeader({ lang, navigationData }: ClientHeaderProps) {

  const pathname = usePathname()

  const excludedPaths = ['/banking-packages', '/listings/']

  const isExcludedPath = excludedPaths.some(path => pathname.includes(path))

  return (
    <header className={cn("absolute top-0 z-20 w-full h-[75px] flex items-center", isExcludedPath ? "bg-transparent mt-3 px-6" : "bg-gradient-to-b from-primary/90 to-transparent")}>
      <nav className={cn("section py-6 px-4 sm:px-6 lg:px-8", isExcludedPath ? "bg-primary rounded-lg py-3" : "")}>
        <div className="flex justify-between gap-2 items-center">
          <Link href={`/${lang}`}>
            <Image src="/logos/logo.png" alt="Hibarr Estates Logo" className="object-contain h-auto" width={140} height={20} />
          </Link>
          <div className="hidden md:flex space-x-8 items-center w-full justify-center">
            {navigationData?.items?.map((item, index) => (
              <HeaderItem key={index} item={item} lang={lang} />
            ))}
          </div>
          <div className="hidden md:flex items-center justify-end gap-6">
            <Button variant="outline" asChild>
              <Link href={navigationData?.bookCall?.href ?? ''}>
                {navigationData?.bookCall?.title}
              </Link>
            </Button>
            <LanguageSwitcher />
          </div>
          <MobileNavigationMenu navigation={navigationData?.items} lang={lang} />
        </div>
      </nav>
    </header>
  )
}
