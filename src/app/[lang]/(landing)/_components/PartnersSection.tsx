import Image from 'next/image'
import { InfiniteMovingCards } from '@/components/InfiniteMovingCards'
import { Dictionary } from '@/lib/dictionary';

type PartnersSectionProps = {
  dictionary: Dictionary;
}

export default function PartnersSection({ dictionary }: PartnersSectionProps) {
  const partners = [
    {
      alt: 'Creditwest Bank Logo',
      src: '/images/partners/creditwestBW.png',
    },
    {
      alt: 'Cratos Hotel & Casino Logo',
      src: '/images/partners/cratos-BW.png',
    },
    {
      alt: 'Oscar Group Logo',
      src: '/images/partners/images.png',
    },
    {
      alt: 'Grand Pasha Hotel & Casino Logo',
      src: '/images/partners/grand-pasha-logo-BW-1-300x216-1.png',
    },
    {
      alt: 'DW Namex Logo',
      src: '/images/partners/dwnamexBW-1.png',
    },
    {
      alt: 'Ambasedeus Logo',
      src: '/images/partners/ambasedeusBW-300x134-1.png',
    },
    {
      alt: 'SIFA Logo',
      src: '/images/partners/sifa-logo-1.png',
    }
  ]

  const renderLogo = (item: { alt: string, src: string }) => (
    <div className="flex items-center justify-center relative w-40 h-20">
      <Image
        src={item.src}
        alt={item.alt}
        sizes="100%"
        fill
        className="object-contain absolute hover:scale-110 transition-all duration-300"
      />
    </div>
  )

  return (
    <section id='partners' className='section'>
      <h3 className='text-3xl font-bold text-center'>Our Partners</h3>
      <div className='relative w-full'>
        <InfiniteMovingCards
          items={partners.map(item => renderLogo(item))}
          speed="fast"
        />
      </div>
    </section>
  )
}
