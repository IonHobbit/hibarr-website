import { Locale } from "@/lib/i18n-config";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";

export default async function Footer(
  props: {
    params: Promise<{ lang: Locale }>;
  }
) {
  const { lang } = await props.params;

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      href: "https://www.facebook.com/hibarr.estates",
      icon: "mdi:facebook",
    },
    {
      href: "https://www.x.com/hibarr_estates",
      icon: "ri:twitter-x-fill",
    },
    {
      href: "https://www.youtube.com/@hibarr_estates",
      icon: "mdi:youtube",
    },
    {
      href: "https://www.instagram.com/hibarr_estates",
      icon: "mdi:instagram",
    }
  ]

  const mapsLocation = "https://www.google.com/maps/place/Bedrettin+Demirel+Caddesi+170,+Girne+3300/@35.3336985,33.3166627,18z/data=!4m6!3m5!1s0x14de6cccdb4417ff:0x2e4bf8cc19bc5142!8m2!3d35.3332887!4d33.3183817!16s%2Fg%2F11cpm46lr6?entry=ttu&g_ep=EgoyMDI1MDIxMC4wIKXMDSoASAFQAw%3D%3D"
  const embedURL = `https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d482.1690563968745!2d33.31788205231333!3d35.333427485504124!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14de6cccdb4417ff%3A0x2e4bf8cc19bc5142!2sBedrettin%20Demirel%20Caddesi%20170%2C%20Girne%203300!5e0!3m2!1sen!2s!4v1744102378116!5m2!1sen!2s`

  const contactInfo = [
    {
      icon: "mdi:email",
      text: "info@hibarr.de",
      link: "mailto:info@hibarr.de",
    },
    {
      icon: "mdi:phone",
      text: "(+90) 539 136 00 81",
      link: "tel:+905391360081",
    },
    {
      icon: "mdi:map-marker",
      text: "Bedrettin Demirel Caddesi 170, Girne 3300 | North Cyprus",
      link: mapsLocation,
    },
  ]

  return (
    <footer className="bg-background overflow-hidden">
      <div className="section py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse lg:flex-row lg:items-end gap-8 justify-between w-full">
          <div className="flex flex-col gap-3">
            <Link href={`/${lang}`}>
              <Image src="/logos/logo-blue.png" alt="Hibarr Estates Logo" className="object-contain w-auto h-auto" width={140} height={20} />
            </Link>
            <p className="text-xs md:text-sm text-foreground font-light">© Copyright {currentYear} <span className="font-semibold">Hibarr Estates</span> all rights reserved</p>
            <div className="flex items-center gap-4">
              {socialLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <Icon icon={link.icon} className="size-6 text-primary hover:text-primary/80" />
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end gap-6">
            <div className="flex flex-col gap-3 lg:items-end max-w-xs">
              <p className="text-lg font-semibold">Contact Us</p>
              {contactInfo.map((item, index) => (
                <div key={index} className="flex flex-row-reverse lg:flex-row justify-end lg:justify-start items-center gap-2.5">
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-sm md:text-base lg:text-right">
                    {item.text}
                  </a>
                  <Icon icon={item.icon} className="size-4 text-primary shrink-0" />
                </div>
              ))}
            </div>
            <iframe src={embedURL} width="250" height="200" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </div>
    </footer>
  )
}
