'use client'


import { Locale } from "@/lib/i18n-config";
import { featuredContent } from "@/lib/content/sections/featured";
import { InfiniteMovingCards } from "@/components/InfiniteMovingCards";

type FeaturedSectionProps = {
  lang: Locale;
  featuredLogos: string[];
}

export default function FeaturedSection({ lang, featuredLogos }: FeaturedSectionProps) {
  const content = featuredContent[lang] ?? featuredContent.en;

  if (!featuredLogos || featuredLogos.length === 0) return null;

  return (
    <section id='featured' className='section'>
      <h3 className='text-3xl text-center'>{content.title}</h3>
      <div className='relative w-full'>F
        <InfiniteMovingCards
          items={featuredLogos}
        />
      </div>
    </section>
  )
}
