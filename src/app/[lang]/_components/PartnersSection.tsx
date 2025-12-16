import { ImageCarousel } from '@/components/ImageCarousel';
import { partnersContent } from '@/lib/content/sections/partners';
import { Locale } from '@/lib/i18n-config';
import { CloudinaryFile } from '@/lib/third-party/cloudinary.client';

type PartnersSectionProps = {
  lang?: Locale;
  partners?: CloudinaryFile[];
}

export default async function PartnersSection({ lang, partners }: PartnersSectionProps) {
  // const [resolvedPartners] = await Promise.all([
  //   partners ?? fetchFiles('Website/Partners'),
  // ]);

  const content = partnersContent[lang ?? 'en'] ?? partnersContent.en;
  // const finalPartners = partners?.map(partner => partner.secure_url) ?? [];
  const finalPartners = ['https://res.cloudinary.com/hibarr/image/upload/v1748593885/dwnamexBW-1_abd3e2.png', 'https://res.cloudinary.com/hibarr/image/upload/v1748593886/ambasedeusBW-300x134-1_ejpsyy.png', 'https://res.cloudinary.com/hibarr/image/upload/v1748593886/ambasedeusBW-300x134-1_ejpsyy.png', 'https://res.cloudinary.com/hibarr/image/upload/v1748593886/ambasedeusBW-300x134-1_ejpsyy.png', 'https://res.cloudinary.com/hibarr/image/upload/v1748593886/ambasedeusBW-300x134-1_ejpsyy.png', 'https://res.cloudinary.com/hibarr/image/upload/v1748593886/ambasedeusBW-300x134-1_ejpsyy.png',
    'https://res.cloudinary.com/hibarr/image/upload/v1748593886/ambasedeusBW-300x134-1_ejpsyy.png',
    'https://res.cloudinary.com/hibarr/image/upload/v1748593886/ambasedeusBW-300x134-1_ejpsyy.png',
  ];

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
