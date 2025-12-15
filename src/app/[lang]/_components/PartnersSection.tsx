import Image from 'next/image'
import { InfiniteMovingCards } from '@/components/InfiniteMovingCards'
import { Locale } from '@/lib/i18n-config';
import { CloudinaryFile, fetchFiles } from '@/lib/third-party/cloudinary.client';
import { fetchSanityData } from '@/lib/third-party/sanity.client';
import { HomePage } from '@/types/sanity.types';

type PartnersSectionProps = {
  lang?: Locale;
  partnersTitle?: string;
  partners?: CloudinaryFile[];
}

export default async function PartnersSection({ lang, partnersTitle, partners }: PartnersSectionProps) {
  const [resolvedPartners, resolvedTitleData] = await Promise.all([
    partners ?? fetchFiles('Website/Partners'),
    partnersTitle
      ? Promise.resolve(undefined)
      : lang
        ? fetchSanityData<HomePage>(`*[_type == "homePage" && language == $lang][0]`, { lang })
        : Promise.resolve(undefined),
  ]);

  const finalPartners = resolvedPartners ?? [];
  const finalTitle = partnersTitle ?? resolvedTitleData?.partnersSection?.title ?? 'Partners';

  if (finalPartners.length === 0) return null;

  const renderLogo = (item: CloudinaryFile) => (
    <div className="flex items-center justify-center relative w-40 h-20">
      <Image
        src={item.secure_url}
        alt={item.display_name}
        sizes="100%"
        fill
        loading='lazy'
        className="object-contain absolute hover:scale-110 transition-all duration-300 grayscale hover:grayscale-0"
      />
    </div>
  )

  return (
    <section id='partners' className='section'>
      <h3 className='text-3xl md:text-4xl text-center'>{finalTitle}</h3>
      <div className='relative w-full'>
        <InfiniteMovingCards
          items={finalPartners.map(item => renderLogo(item))}
          speed="fast"
        />
      </div>
    </section>
  )
}
