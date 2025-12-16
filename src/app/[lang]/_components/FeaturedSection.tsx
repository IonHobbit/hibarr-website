'use client'

import Image from "next/image"
// import { InfiniteMovingCards } from "@/components/InfiniteMovingCards"
import { CloudinaryFile } from "@/lib/third-party/cloudinary.client";
import { Locale } from "@/lib/i18n-config";
import { featuredContent } from "@/lib/content/sections/featured";

type FeaturedSectionProps = {
  lang: Locale;
  featuredLogos: CloudinaryFile[];
}

export default function FeaturedSection({ lang }: FeaturedSectionProps) {
  const content = featuredContent[lang] ?? featuredContent.en

  // const renderLogo = (item: CloudinaryFile) => (
  //   <div className="flex items-center justify-center relative w-40 h-20">
  //     <Image
  //       src={item.secure_url}
  //       alt={item.display_name}
  //       sizes="100%"
  //       fill
  //       loading='lazy'
  //       className="object-contain absolute grayscale hover:grayscale-0 transition-all duration-300"
  //     />
  //   </div>
  // )

  return (
    <section id='featured' className='section'>
      <h3 className='text-3xl text-center'>{content.title}</h3>
      <div className='relative w-full'>
        {/* <InfiniteMovingCards
          items={featuredLogos.map(item => renderLogo(item))}
          speed="fast"
        /> */}
      </div>
    </section>
  )
}
