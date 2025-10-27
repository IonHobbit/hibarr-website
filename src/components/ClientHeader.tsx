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

  const excludedPaths = ['/our-packages', '/listings/', 'webinar-recording', '/thank-you', '/blog', '/findr', '/partners/news-central-corp', '/ebook']
  const hiddenPaths = ['/calendar']

  const isExcludedPath = excludedPaths.some(path => pathname.includes(path))

  const isHiddenPath = hiddenPaths.some(path => pathname.includes(path))

  if (isHiddenPath) return null
  type NavItem = NonNullable<Navigation['items']>[number];
  const navigationItems: NavItem[] = (navigationData?.items || []).map((item: NavItem | undefined) => {
    const cloned = { ...(item || {}) } as NavItem;
    try {
      if (cloned.name && String(cloned.name).toLowerCase() === 'resources') {
        const children = Array.isArray(cloned.children) ? [...cloned.children] : [];
        const hasCareers = children.some((c) => c?.href === '/careers');
        if (!hasCareers) {
          children.push({ _key: 'careers', name: 'Careers', href: '/careers' });
        }
        cloned.children = children;
      }
    } catch {
      // noop
    }
    return cloned;
  });

  return (
    <header className={cn("absolute top-0 z-20 w-full h-[75px] flex items-center", isExcludedPath ? "bg-transparent mt-2 px-4" : "bg-gradient-to-b from-primary/90 to-transparent")}>
      <nav className={cn("section py-6 px-4 sm:px-6 lg:px-8", isExcludedPath ? "bg-primary rounded-lg py-3" : "")}>
        <div className="flex justify-between gap-2 items-center">
          <Link href={`/${lang}`} className='shrink-0'>
            <Image src="/logos/logo.png" alt="Hibarr Estates Logo" loading='eager' className="object-contain h-auto" width={140} height={20} />
          </Link>
          <div className="hidden md:flex space-x-8 items-center w-full justify-center overflow-x-auto">
            {navigationItems.map((item: NavItem, index: number) => (
              <HeaderItem key={index} item={item} lang={lang} />
            ))}
          </div>
          <div className="hidden md:flex items-center justify-end gap-4">
            <Button variant="accent" className='rounded uppercase' asChild>
              <Link href={navigationData?.bookCall?.href || ''}>
                {navigationData?.bookCall?.title}
              </Link>
            </Button>
            <LanguageSwitcher />
          </div>
          <MobileNavigationMenu navigation={navigationItems} lang={lang} />
        </div>
      </nav>
    </header>
  )
}
