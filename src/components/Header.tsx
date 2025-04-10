import { getDictionary } from "@/lib/dictionary";
import { Locale } from "@/lib/i18n-config";
import LanguageSwitcher from "./LanguageSwitcher";
import Image from "next/image";
import Link from "next/link";
import HeaderItem from "./HeaderItem";
import MobileNavigationMenu from "./MobileNavigationMenu";
import { Button } from "./ui/button";

export default async function Header(
  props: {
    params: Promise<{ lang: Locale }>;
  }
) {
  const { lang } = await props.params;
  const dictionary = await getDictionary(lang);

  return (
    <header className="sticky top-0 z-20 w-full h-[75px] flex items-center bg-primary/80 via-primary/40 to-transparent backdrop-blur-sm">
      <nav className="section py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between md:grid grid-cols-3 gap-2 items-center">
          <Link href={`/${lang}`}>
            <Image src="/logos/logo.png" alt="Hibarr Estates Logo" className="object-contain" width={140} height={20} />
          </Link>
          <div className="hidden md:flex space-x-8 items-center w-full justify-center">
            {dictionary.navigation.map((item, index) => (
              <HeaderItem key={index} item={item} lang={lang} />
            ))}
          </div>
          <div className="hidden md:flex items-center justify-end gap-6">
            <Button variant="outline" asChild>
              <Link href={dictionary.bookCall.href}>
                {dictionary.bookCall.title}
              </Link>
            </Button>
            <LanguageSwitcher />
          </div>
          <MobileNavigationMenu navigation={dictionary.navigation} lang={lang} />
        </div>
      </nav>
    </header>
  )
}