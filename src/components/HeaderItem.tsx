'use client'

import { Locale } from "@/lib/i18n-config";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { Navigation } from "@/types/sanity.types";

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

  if (item.hideOnHomePage && pathname === `/${lang}`) {
    return null;
  }

  // if (item.children && !mobile) {
  //   return (
  //     <NavigationMenuItem>
  //       <NavigationMenuTrigger>
  //         <NavigationMenuLink>{item.name}</NavigationMenuLink>
  //       </NavigationMenuTrigger>
  //       <NavigationMenuContent popoverTarget={item.href ?? ''}>
  //         {item.children.filter((child) => !child.hidden).map((child: Child, index: number) => (
  //           <NavigationMenuLink key={index} href={`/${lang}${child.href}`}>{child.name}</NavigationMenuLink>
  //         ))}
  //       </NavigationMenuContent>
  //     </NavigationMenuItem>
  //   )
  // }

  if (item.children && !mobile) {
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
          {item.children.filter((child) => !child.hidden).map((child: Child, index: number) => (
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
            className="text-primary-foreground ml-4 hover:text-primary-foreground/80 whitespace-nowrap">
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