import { Dictionary } from '@/lib/dictionary';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type AboutSectionProps = {
  dictionary: Dictionary;
}

export default function AboutSection({ dictionary }: AboutSectionProps) {
  return (
    <section id='about' className='section min-h-screen'>
      <div className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-10">
        <div>
          <Image src="/logos/logomark.svg" alt="Hibarr Logo" width={400} height={400} />
        </div>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <h3 className="text-3xl font-bold">{dictionary.home.whyUs.title}</h3>
            <p className="text-sm text-muted-foreground">
              {dictionary.home.whyUs.description}
            </p>
          </div>
          {dictionary.home.whyUs.reasons.map((reason, index) => (
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
            <h3 className="text-3xl font-bold">{dictionary.home.about.title}</h3>
            <p className="text-sm text-muted-foreground">
              {dictionary.home.about.description}
            </p>
          </div>
          {dictionary.home.about.paragraphs.map((paragraph, index) => (
            <p key={index} className='text-base'>{paragraph}</p>
          ))}
          <Button variant="accent" className='w-fit' asChild>
            <Link href="/consultation">
              {dictionary.home.about.cta.text}
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
