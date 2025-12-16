'use client'

import { useMemo } from "react"
import Image from "next/image"
import { InfiniteMovingCards } from "@/components/InfiniteMovingCards"
import { CloudinaryFile } from "@/lib/third-party/cloudinary.client"
import { Locale } from "@/lib/i18n-config"
import { featuredContent } from "@/lib/content/sections/featured"

type FeaturedSectionProps = {
  lang: Locale
  featuredLogos: CloudinaryFile[]
}

export default function FeaturedSection({ lang, featuredLogos }: FeaturedSectionProps) {
  const content = featuredContent[lang] ?? featuredContent.en

  // Memoize the logo elements to prevent recreation on every render
  const logoElements = useMemo(() => {
    if (!featuredLogos || featuredLogos.length === 0) {
      return []
    }

    return featuredLogos
      .filter(item => item?.secure_url && item?.display_name) // Filter invalid items
      .map((item) => (
        <div key={item.secure_url} className="flex items-center justify-center relative w-40 h-20">
          <Image
            src={item.secure_url}
            alt={item.display_name}
            sizes="160px"
            fill
            loading="lazy"
            className="object-contain absolute grayscale hover:grayscale-0 transition-all duration-300 will-change-[filter]"
          />
        </div>
      ))
  }, [featuredLogos])

  // Don't render if no logos
  if (logoElements.length === 0) {
    return null
  }

  return (
    <section id="featured" className="section">
      <h3 className="text-3xl text-center">{content.title}</h3>
      <div className="relative w-full">
        <InfiniteMovingCards
          items={logoElements}
          speed="fast"
        />
      </div>
    </section>
  )
}
