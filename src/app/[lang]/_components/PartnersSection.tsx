import { InfiniteMovingCards } from '@/components/InfiniteMovingCards'
import { partnersContent } from '@/lib/content/sections/partners';
import { Locale } from '@/lib/i18n-config';
import { CloudinaryFile, fetchFiles } from '@/lib/third-party/cloudinary.client';

type PartnersSectionProps = {
  lang?: Locale;
  partners?: CloudinaryFile[];
}

export default async function PartnersSection({ lang, partners }: PartnersSectionProps) {
  const [resolvedPartners] = await Promise.all([
    partners ?? fetchFiles('Website/Partners'),
  ]);

  const content = partnersContent[lang ?? 'en'] ?? partnersContent.en;
  const finalPartners = resolvedPartners ?? [];

  if (finalPartners.length === 0) return null;

  return (
    <section id='partners' className='section'>
      <h3 className='text-3xl md:text-4xl text-center'>{content.title}</h3>
      <div className='relative w-full'>
        <InfiniteMovingCards
          items={finalPartners}
        />
      </div>
    </section>
  )
}
