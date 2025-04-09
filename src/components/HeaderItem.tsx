'use client'

import { Locale } from "@/lib/i18n-config";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Dictionary } from "@/lib/dictionary";
import { useState } from "react";
import { Icon } from "@iconify/react";

export default function HeaderItem({ item, lang }: { item: Dictionary['navigation'][number], lang: Locale }) {
  const pathname = usePathname();

  if (item.hideOnHomePage && pathname === `/${lang}`) {
    return null;
  }

  if (item.children) {
    const [open, setOpen] = useState(false);

    return (
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 text-primary-foreground hover:text-primary-foreground/80 whitespace-nowrap cursor-pointer focus:outline-none focus:text-primary-foreground/80">
            <span>
              {item.name}
            </span>
            <Icon icon={open ? "mdi:chevron-up" : "mdi:chevron-down"} className="w-4 h-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" sideOffset={5}>
          {item.children.map((child: any, index: number) => (
            <DropdownMenuItem key={index} asChild>
              <Link href={`/${lang}${child.href}`}>
                {child.name}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <Link href={`/${lang}${item.href}`} className="text-primary-foreground hover:text-primary-foreground/80 whitespace-nowrap">
      {item.name}
    </Link>
  )
}