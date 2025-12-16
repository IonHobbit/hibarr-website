'use client'


import { Locale } from "@/lib/i18n-config";
import { featuredContent } from "@/lib/content/sections/featured";
import { ImageCarousel } from "@/components/ImageCarousel";

type FeaturedSectionProps = {
  lang: Locale;
  featuredLogos?: string[];
}

export default function FeaturedSection({ lang, featuredLogos }: FeaturedSectionProps) {
  const content = featuredContent[lang] ?? featuredContent.en;
  const finalFeaturedLogos = featuredLogos ?? content.logos;

  return (
    <section id='featured' className='section'>
      <h3 className='text-3xl text-center'>{content.title}</h3>
      <div className='relative w-full'>
        <ImageCarousel
          items={finalFeaturedLogos}
        />
      </div>
    </section>
  )
}
