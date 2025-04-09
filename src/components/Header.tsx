import { getDictionary } from "@/lib/dictionary";
import { Locale } from "@/lib/i18n-config";
import LanguageSwitcher from "./LanguageSwitcher";
import Image from "next/image";
import Link from "next/link";
import HeaderItem from "./HeaderItem";

export default async function Header(
  props: {
    params: Promise<{ lang: Locale }>;
  }
) {
  const { lang } = await props.params;
  const dictionary = await getDictionary(lang);

  return (
    <header className="absolute top-0 z-10 w-full flex items-center bg-primary/20 backdrop-blur-sm">
      <nav className="section py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 gap-2 items-center">
          <Link href={`/${lang}`}>
            <Image src="/logos/logo.png" alt="Hibarr Estates Logo" className="object-contain" width={140} height={20} />
          </Link>
          <div className="flex space-x-8 items-center w-full justify-center">
            {dictionary.navigation.map((item, index) => (
              <HeaderItem key={index} item={item} lang={lang} />
            ))}
          </div>
          <div className="flex justify-end">
            <LanguageSwitcher />
          </div>
        </div>
      </nav>
    </header>
  )
}