import Image from "next/image"
import { InfiniteMovingCards } from "@/components/InfiniteMovingCards"

export default function FeaturedSection() {
  const featuredIn = [
    {
      alt: 'Bellevue Logo',
      src: '/images/featured/bellevue-logo-black.png',
    },
    {
      alt: 'Netflix Logo',
      src: '/images/featured/Black-Netflix-Text-Logo.png',
    },
    {
      alt: 'Süddeutsche Zeitung Logo',
      src: '/images/featured/suddeutsche-zeitung-logo.png',
    },
    {
      alt: 'Wallstreet Online Logo',
      src: '/images/featured/wallstreet-online-logo-black-300x91-1.png',
    },
    {
      alt: 'Forbes Logo',
      src: '/images/featured/forbes-logo.png',
    },
    {
      alt: 'Gründer.de Logo',
      src: '/images/featured/gruender-de-logo-black.png',
    },
    {
      alt: 'Erfolg Magazin Logo',
      src: '/images/featured/erfolg-magazin-logo.webp',
    }
  ]

  const renderLogo = (item: { alt: string, src: string }) => (
    <div className="flex items-center justify-center relative w-40 h-20">
      <Image
        src={item.src}
        alt={item.alt}
        sizes="100%"
        fill
        className="object-contain absolute"
      />
    </div>
  )

  return (
    <section id='featured' className='section'>
      <h3 className='text-3xl text-center'>Featured in</h3>
      <div className='relative w-full'>
        <InfiniteMovingCards
          items={featuredIn.map(item => renderLogo(item))}
          speed="fast"
        />
      </div>
    </section>
  )
}
