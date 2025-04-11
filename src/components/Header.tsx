import { Locale } from "@/lib/i18n-config";
import LanguageSwitcher from "./LanguageSwitcher";
import Image from "next/image";
import Link from "next/link";
import HeaderItem from "./HeaderItem";
import MobileNavigationMenu from "./MobileNavigationMenu";
import { Button } from "./ui/button";
import { Navigation } from "@/lib/sanity/sanity.types";
import { client } from "@/lib/sanity/client";

export default async function Header(
  props: {
    params: Promise<{ lang: Locale }>;
  }
) {
  const { lang } = await props.params;
  const data = await client.fetch<Navigation>(`*[_type == "navigation" && language == $lang][0]`, { lang });

  return (
    <header className="absolute top-0 z-20 w-full h-[75px] flex items-center">
      <nav className="section py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between md:grid grid-cols-3 gap-2 items-center">
          <Link href={`/${lang}`}>
            <Image src="/logos/logo.png" alt="Hibarr Estates Logo" className="object-contain h-auto" width={140} height={20} />
          </Link>
          <div className="hidden md:flex space-x-8 items-center w-full justify-center">
            {data?.items?.map((item, index) => (
              <HeaderItem key={index} item={item} lang={lang} />
            ))}
          </div>
          <div className="hidden md:flex items-center justify-end gap-6">
            <Button variant="outline" asChild>
              <Link href={data?.bookCall?.href ?? ''}>
                {data?.bookCall?.title}
              </Link>
            </Button>
            <LanguageSwitcher />
          </div>
          <MobileNavigationMenu navigation={data?.items} lang={lang} />
        </div>
      </nav>
    </header>
  )
}