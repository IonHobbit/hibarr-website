'use client';

import Link from 'next/link'
import HeaderItem from './HeaderItem'
import { Icon } from "@/components/icons";
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription } from "./ui/sheet";
import LanguageSwitcher from './LanguageSwitcher';
import { Locale } from '@/lib/i18n-config';
import Image from 'next/image';
import { Navigation } from '@/types/sanity.types';
import { useState } from 'react';

type MobileNavigationMenuProps = {
  navigation: Navigation['items'];
  lang: Locale;
}

export default function MobileNavigationMenu({ navigation, lang }: MobileNavigationMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <div className="flex md:hidden justify-end">
          <button className="text-white min-h-[48px] min-w-[48px] flex items-center justify-center">
            <Icon icon="heroicons:bars-2-solid" className="w-6 h-6" />
          </button>
        </div>
      </SheetTrigger>
      <SheetContent className="bg-primary p-6 border-none w-[80vw]" side="left">
        <SheetTitle className="hidden"></SheetTitle>
        <SheetDescription className="hidden"></SheetDescription>
        <div className="flex items-center justify-between gap-3">
          <Link href={`/${lang}`}>
            <Image src="/logos/logo.png" alt="Hibarr Estates Logo" className="object-contain" width={140} height={20} />
          </Link>
          <LanguageSwitcher />
        </div>
        <div className="flex flex-col gap-4">
          {navigation?.map((item) => (
            <HeaderItem key={item._key} item={item} lang={lang} mobile onClick={() => setOpen(false)} />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
