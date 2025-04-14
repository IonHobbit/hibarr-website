import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { HomePage } from '@/types/sanity.types';

type AboutSectionProps = {
  data: HomePage;
}

export default function AboutSection({ data }: AboutSectionProps) {
  return (
    <section id='about' className='section'>
      <div className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-10">
        <div>
          <Image src="/logos/logomark.svg" alt="Hibarr Logo" width={400} height={400} />
        </div>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <h3 className="text-3xl font-bold">{data.whyUsSection?.title}</h3>
            <p className="text-sm text-muted-foreground">
              {data.whyUsSection?.description}
            </p>
          </div>
          {data.whyUsSection?.reasons?.map((reason, index) => (
            <div key={index} className='flex flex-col'>
              <p className='text-base font-medium'>{reason.title}</p>
              <p className='text-sm text-muted-foreground'>{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-10">
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col gap-2'>
            <h3 className="text-3xl font-bold">{data.aboutSection?.title}</h3>
            <p className="text-sm text-muted-foreground">
              {data.aboutSection?.description}
            </p>
          </div>
          {data.aboutSection?.paragraphs?.map((paragraph, index) => (
            <p key={index} className='text-base'>{paragraph}</p>
          ))}
          <Button variant="accent" size="lg" className='w-fit' asChild>
            <Link href={data.aboutSection?.CTA?.url ?? ''}>
              {data.aboutSection?.CTA?.label}
            </Link>
          </Button>
        </div>
        <div>
          <Image src="/images/about-image.jpg" alt="Hibarr Logo" width={600} height={600} />
        </div>
      </div>
    </section>
  )
}
