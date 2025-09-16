import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { HomePage } from '@/types/sanity.types';
import BounceCards from '@/components/bits/BounceCards/BounceCards';

type AboutSectionProps = {
  data: HomePage;
}

export default function AboutSection({ data }: AboutSectionProps) {
  return (
    <section id='about' className='section'>
      <div className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-10">
        <div>
          <Image src="/logos/logomark.svg" loading='lazy' alt="Hibarr Logo" width={400} height={400} />
        </div>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <h3 className="text-3xl font-bold">{data.whyUsSection?.title}</h3>
            <p className="text-sm md:text-base text-muted-foreground">
              {data.whyUsSection?.description}
            </p>
          </div>
          {data.whyUsSection?.reasons?.map((reason, index) => (
            <div key={index} className='flex flex-col'>
              <p className='text-base font-medium'>{reason.title}</p>
              <p className='text-sm md:text-base text-muted-foreground'>{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-10">
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col gap-2'>
            <h3 className="text-3xl font-bold">{data.aboutSection?.title}</h3>
            <p className="text-sm md:text-base text-muted-foreground">
              {data.aboutSection?.description}
            </p>
          </div>
          {data.aboutSection?.paragraphs?.map((paragraph, index) => (
            <p key={index} className='text-base'>{paragraph}</p>
          ))}
          <Button variant="accent" size="lg" className='w-fit' href={data.aboutSection?.CTA?.url || ''} addLocaleToHref>
            {data.aboutSection?.CTA?.label}
          </Button>
        </div>
        <div>
          <BounceCards
            enableHover={true}
            images={[
              '/images/about/home/about-image.webp',
              '/images/about/home/about-hero.webp',
              '/images/about/home/about24.webp',
              '/images/about/home/about1.webp',
              '/images/about/home/about2.webp']}
          />
        </div>
      </div>
    </section>
  )
}
