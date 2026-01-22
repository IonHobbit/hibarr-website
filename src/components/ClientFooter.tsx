'use client'

import { Locale } from "@/lib/i18n-config";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { Footer as FooterType } from "@/types/sanity.types";
import { usePathname } from "next/navigation";
import { footerContent } from "@/lib/content/footer";

type ClientFooterProps = {
  lang: Locale
  footerData: FooterType
}

export default function ClientFooter({ lang, footerData }: ClientFooterProps) {

  const pathname = usePathname()

  const currentYear = new Date().getFullYear();

  const hiddenPaths = ['/calendar']
  const isHiddenPath = hiddenPaths.some(path => pathname.includes(path))

  const content = footerContent[lang] ?? footerContent.en;

  const socialLinks = [
    {
      href: footerData.socialMedia?.facebook || '',
      icon: "mdi:facebook" as const,
    },
    {
      href: footerData.socialMedia?.twitter || '',
      icon: "ri:twitter-x-fill" as const,
    },
    {
      href: footerData.socialMedia?.youtube || '',
      icon: "mdi:youtube" as const,
    },
    {
      href: footerData.socialMedia?.instagram || '',
      icon: "mdi:instagram" as const,
    }
  ].filter((link) => link.href !== '');

  const mapsLocation = footerData.contactSection?.address?.googleMapsLink || "https://www.google.com/maps/place/Bedrettin+Demirel+Caddesi+170,+Girne+3300/@35.3336985,33.3166627,18z/data=!4m6!3m5!1s0x14de6cccdb4417ff:0x2e4bf8cc19bc5142!8m2!3d35.3332887!4d33.3183817!16s%2Fg%2F11cpm46lr6?entry=ttu&g_ep=EgoyMDI1MDIxMC4wIKXMDSoASAFQAw%3D%3D"
  const embedURL = footerData.contactSection?.address?.mapsEmbedLink || `https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d482.1690563968745!2d33.31788205231333!3d35.333427485504124!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14de6cccdb4417ff%3A0x2e4bf8cc19bc5142!2sBedrettin%20Demirel%20Caddesi%20170%2C%20Girne%203300!5e0!3m2!1sen!2s!4v1744102378116!5m2!1sen!2s`

  const contactInfo = [
    {
      icon: "mdi:email" as const,
      text: footerData.contactSection?.email?.email || "info@hibarr.de",
      link: footerData.contactSection?.email?.emailLink || "mailto:info@hibarr.de",
    },
    {
      icon: "mdi:phone" as const,
      text: footerData.contactSection?.phone?.phoneNumber || "(+90) 539 119 18 23",
      link: footerData.contactSection?.phone?.phoneLink || "tel:+905391191823",
    },
    {
      icon: "mdi:map-marker" as const,
      text: footerData.contactSection?.address?.fullAddress || "Bedrettin Demirel Caddesi 170, Girne 3300 | North Cyprus",
      link: footerData.contactSection?.address?.googleMapsLink || mapsLocation,
    },
  ]

  if (isHiddenPath) return null

  return (
    <footer className="bg-background overflow-hidden">
      <div className="section pt-10 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse lg:flex-row lg:items-center gap-8 justify-between w-full">
          <div className="flex flex-col gap-3">
            <Link href={`/${lang}`}>
              <Image src="/logos/logo-blue.png" alt="HIBARR - North Cyprus Financial Investment Agency" className="object-contain w-auto h-auto" width={140} height={20} />
            </Link>
            <p className="text-xs md:text-sm text-foreground font-light">
              {content.copyrightPrefix.replace('{currentYear}', currentYear.toString())}
              <span className="font-semibold"> XEGARA Trading Ltd.</span>
              {content.copyrightSuffix}
            </p>
            <div className="flex items-center gap-4 text-base text-muted-foreground">
              <Link href={`/${lang}/privacy-policy`} className="hover:text-foreground transition-colors">
                {content.legalNotice}
              </Link>
              <Link href={`/${lang}/privacy-policy`} className="hover:text-foreground transition-colors">
                {content.privacyPolicy}
              </Link>
              {/* <Link href={`/${lang}/careers`} className="hover:text-foreground transition-colors">
                {content.careers}
              </Link> */}
            </div>
            <div className="flex items-center gap-4">
              {socialLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <Icon icon={link.icon} className="size-6 text-primary hover:text-primary/80" />
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            <div className="flex flex-col gap-3 lg:items-end max-w-xs">
              <p className="text-lg font-semibold">{content.contactUs}</p>
              {contactInfo.map((item, index) => (
                <div key={index} className="flex flex-row-reverse lg:flex-row justify-end lg:justify-start items-center gap-2.5">
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-sm md:text-base lg:text-right">
                    {item.text}
                  </a>
                  <Icon icon={item.icon} className="size-4 text-primary shrink-0" />
                </div>
              ))}
            </div>
            {embedURL && (
              <iframe src={embedURL} width="250" height="200" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
