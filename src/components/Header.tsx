import { getDictionary } from "@/lib/dictionary";
import { Locale } from "@/lib/i18n-config";
import LanguageSwitcher from "./LanguageSwitcher";
import Image from "next/image";
import Link from "next/link";

export default async function Header(
  props: {
    params: Promise<{ lang: Locale }>;
  }
) {
  const { lang } = await props.params;
  const dictionary = await getDictionary(lang);

  return (
    <header className="absolute top-0 z-10 w-full flex items-center bg-primary/20 backdrop-blur-sm">
      <nav className="max-w-screen-xl mx-auto py-6 px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between">
          <Link href={`/${lang}`}>
            <Image src="/logos/logo.png" alt="Hibarr Estates Logo" className="object-contain" width={140} height={20} />
          </Link>
          <div className="flex space-x-8">
            {dictionary.navigation.map((item, index) => (
              <Link key={index} href={`/${lang}/${item.href}`} className="text-primary-foreground hover:text-primary-foreground/80">
                {item.name}
              </Link>
            ))}
          </div>
          <LanguageSwitcher />
        </div>
      </nav>
    </header>
  )
}
