
import { InfiniteMovingCards } from '@/components/InfiniteMovingCards';
import { partnersContent } from '@/lib/content/sections/partners';
import { Locale } from '@/lib/i18n-config';

type PartnersSectionProps = {
  lang: Locale;
  partnerLogos: (string | { src: string; alt: string })[];
}

export default function PartnersSection({ lang, partnerLogos }: PartnersSectionProps) {
  const content = partnersContent[lang ?? 'en'] ?? partnersContent.en;

  if (partnerLogos?.length === 0) return null;

  return (
    <section id='partners' className='section'>
      <h3 className='text-3xl md:text-4xl text-center'>{content.title}</h3>
      <div className='relative w-full'>
        <InfiniteMovingCards
          items={partnerLogos}
        />
      </div>
    </section>
  )
}
