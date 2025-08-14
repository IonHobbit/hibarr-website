import Image from 'next/image'
import { InfiniteMovingCards } from '@/components/InfiniteMovingCards'
import { HomePage } from '@/types/sanity.types';
import { fetchSanityData } from '@/lib/third-party/sanity.client';
import { Locale } from '@/lib/i18n-config';
import { CloudinaryFile, fetchFiles } from '@/lib/third-party/cloudinary.client';

type PartnersSectionProps = {
  lang: Locale;
}

export default async function PartnersSection({ lang }: PartnersSectionProps) {
  const data = await fetchSanityData<HomePage>(`*[_type == "homePage" && language == $lang][0]`, { lang });

  const partners = await fetchFiles('Website/Partners');

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
      <h3 className='text-3xl md:text-4xl text-center'>{data?.partnersSection?.title}</h3>
      <div className='relative w-full'>
        <InfiniteMovingCards
          items={partners.map(item => renderLogo(item))}
          speed="fast"
        />
      </div>
    </section>
  )
}
