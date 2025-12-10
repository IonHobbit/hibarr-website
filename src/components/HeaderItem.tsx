'use client'

import { Locale } from "@/lib/i18n-config";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/icons";
import { Navigation } from "@/types/sanity.types";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

type Item = NonNullable<Navigation['items']>[number]
type Child = NonNullable<Item['children']>[number]

type HeaderItemProps = {
  item: Item;
  lang: Locale;
  mobile?: boolean;
  onClick?: () => void;
}

export default function HeaderItem({ item, lang, mobile, onClick }: HeaderItemProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (item.hidden) return null;

  if (item.hideOnHomePage && (pathname === `/${lang}` || pathname === `/${lang}/`)) {
    return null;
  }

  if (item.children && !mobile) {
    return (
      <HoverCard openDelay={200} closeDelay={300} open={open} onOpenChange={setOpen}>
        <HoverCardTrigger asChild>
          <button className="flex items-center gap-2 text-primary-foreground hover:text-primary-foreground/80 whitespace-nowrap cursor-pointer focus:outline-none focus:text-primary-foreground/80">
            <span>
              {item.name}
            </span>
            <Icon icon={open ? "mdi:chevron-up" : "mdi:chevron-down"} className="w-4 h-4" />
          </button>
        </HoverCardTrigger>
        <HoverCardContent align="start" sideOffset={10} className="bg-primary border-none p-1.5 rounded-md w-max min-w-32">
          {item.children.filter((child) => !child.hidden).map((child: Child, index: number) => (
            <Link key={index} href={`/${lang}${child.href}`}>
              <div className="w-full hover:bg-accent p-2 rounded text-white">
                {child.name}
              </div>
            </Link>
          ))}
        </HoverCardContent>
      </HoverCard>
    )
  }

  if (mobile && item.children) {
    return (
      <div className="flex flex-col gap-2">
        <p className="text-sm text-primary-foreground/70 hover:text-primary-foreground/80 whitespace-nowrap">
          {item.name}
        </p>
        {item.children.filter((child) => !child.hidden).map((child: Child, index: number) => (
          <Link
            onClick={onClick}
            href={`/${lang}${child.href}`}
            key={index}
            className="text-primary-foreground ml-4 hover:text-primary-foreground/80 whitespace-nowrap min-h-[48px] flex items-center">
            {child.name}
          </Link>
        ))}
      </div>
    )
  }

  return (
    <Link onClick={onClick} href={`/${lang}${item.href}`} className="text-primary-foreground hover:text-primary-foreground/80 whitespace-nowrap">
      {item.name}
    </Link>
  )
}