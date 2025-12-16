'use client'

import { CloudinaryFile } from "@/lib/third-party/cloudinary.client";
import { Locale } from "@/lib/i18n-config";
import { featuredContent } from "@/lib/content/sections/featured";
import { InfiniteMovingCards } from "@/components/InfiniteMovingCards";

type FeaturedSectionProps = {
  lang: Locale;
  featuredLogos: CloudinaryFile[];
}

export default function FeaturedSection({ lang, featuredLogos }: FeaturedSectionProps) {
  const content = featuredContent[lang] ?? featuredContent.en

  return (
    <section id='featured' className='section'>
      <h3 className='text-3xl text-center'>{content.title}</h3>
      <div className='relative w-full'>
        <InfiniteMovingCards
          items={featuredLogos}
        />
      </div>
    </section>
  )
}
