import { ImageCarousel } from '@/components/ImageCarousel';
import { partnersContent } from '@/lib/content/sections/partners';
import { Locale } from '@/lib/i18n-config';

type PartnersSectionProps = {
  lang?: Locale;
  partnerUrls?: string[];
}

export default async function PartnersSection({ lang, partnerUrls }: PartnersSectionProps) {
  const content = partnersContent[lang ?? 'en'] ?? partnersContent.en;
  const finalPartners = partnerUrls ?? [];

  if (finalPartners.length === 0) return null;

  return (
    <section id='partners' className='section'>
      <h3 className='text-3xl md:text-4xl text-center'>{content.title}</h3>
      <div className='relative w-full'>
        <ImageCarousel
          items={finalPartners}
        />
      </div>
    </section>
  )
}
