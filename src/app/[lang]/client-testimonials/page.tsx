import { Button } from '@/components/ui/button';
import CaseStudies from './_components/CaseStudies';
import { client } from '@/lib/third-party/sanity.client';
import { CaseStudy } from '@/types/sanity.types';
import Link from 'next/link';
import { Locale } from '@/lib/i18n-config';

export const metadata = {
  title: 'Client Testimonials',
  description: 'Client Testimonials',
}

type ClientTestimonialsPageProps = {
  params: Promise<{ lang: Locale }>;
}

export default async function ClientTestimonialsPage({ params }: ClientTestimonialsPageProps) {

  const { lang } = await params;

  const caseStudies = await client.fetch<CaseStudy[]>(`*[_type == "caseStudy" && isFeatured == true && language == $lang]`, { lang }, { cache: 'no-store' });

  return (
    <section id='hero' className="relative w-full overflow-hidden px-4 lg:px-8 grid place-items-center gap-4 place-content-center h-screen bg-[url('/images/testimonials-hero.jpg')] bg-cover bg-center bg-no-repeat scroll-smooth">
      <div className='absolute inset-0 w-full h-full bg-gradient-to-b from-primary via-primary/80 to-transparent'></div>

      <div className='flex flex-col items-center gap-4 z-10'>
        <div className="w-[80vw] md:w-[70vw] relative overflow-y-auto text-center p-4 md:p-6 lg:p-8 bg-secondary rounded-lg z-10">
          <div className="flex flex-col items-center gap-1">
            <h3 className='text-4xl font-bold text-primary'>Testimonials</h3>
            <p className='text-primary'>Hear from our clients</p>
          </div>
          <section id='case-studies' className='section'>
            <div className="max-w-screen-xl mx-auto w-full overflow-hidden md:overflow-visible">
              <CaseStudies caseStudies={caseStudies} />
            </div>
          </section>
          <Button variant="accent" size="lg" className='w-max' asChild>
            <Link href={'/webinar#register'}>
              Join the Webinar
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
