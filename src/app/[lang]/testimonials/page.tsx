import Link from 'next/link';
import { Fragment } from 'react';
import { Icon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import type { Locale } from '@/lib/i18n-config';
import { formatDate, generateSEOMetadata } from '@/lib/utils';
import { Metadata } from 'next';
import { fetchRawSanityData, fetchSanityData } from '@/lib/third-party/sanity.client';
import { Testimonial, TestimonialsPage as TestimonialsPageType, SeoMetaFields } from '@/types/sanity.types';

import { seoTitles } from '@/lib/seo-titles';

import { seoDescriptions } from '@/data/seo-descriptions';


export async function generateMetadata(props: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await props.params;

  const { seo } = await fetchRawSanityData<TestimonialsPageType>(`*[_type == "testimonialsPage" && language == $lang][0]`, { lang });

  return generateSEOMetadata({ ...seo, metaTitle: seoTitles[lang].testimonials, metaDescription: seoDescriptions[lang].testimonials } as SeoMetaFields)
}

export default async function TestimonialsPage(
  props: {
    params: Promise<{ lang: Locale }>;
  }
) {
  const { lang } = await props.params;

  const data = await fetchSanityData<TestimonialsPageType>(`*[_type == "testimonialsPage" && language == $lang][0]`, { lang });
  const testimonials = await fetchSanityData<Testimonial[]>(`*[_type == "testimonial"] | order(date desc)`);

  return (
    <Fragment>
      <section id='hero' className="relative grid place-items-center place-content-center h-screen bg-[url('https://res.cloudinary.com/hibarr/image/upload/testimonials-hero_byqwmh')] bg-cover bg-center bg-no-repeat">
        <div className="max-w-5xl text-center flex flex-col gap-10 z-10 p-4">
          <div className='flex flex-col gap-2'>
            <div className='flex items-center p-1 px-3 bg-secondary w-max mx-auto rounded-full'>
              <p className="uppercase text-sm font-semibold">
                {data?.name}
              </p>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 text-primary-foreground">
              {data?.title}
            </h1>
            <p className="text-md md:text-2xl text-primary-foreground">
              {data?.description}
            </p>
          </div>
          <Button variant="accent" size="lg" className='w-max mx-auto' asChild>
            <Link href={data?.CTA?.url || ''} className='uppercase font-semibold'>
              {data?.CTA?.label}
            </Link>
          </Button>
        </div>
        <div className='absolute inset-0 w-full h-full bg-gradient-to-b from-primary via-primary/80 to-transparent'></div>

        <Link href="#stories" className='absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1 text-primary-foreground cursor-pointer'>
          <p className='text-md uppercase tracking-tight'>Scroll</p>
          <div className='flex flex-col items-center gap-1'>
            <Icon icon="iconamoon:mouse-thin" className='size-7' />
            <Icon icon="ph:arrow-down-thin" className='size-4' />
          </div>
          <p className='text-md uppercase'>Down</p>
        </Link>
      </section>
      <section id='stories' className='section'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {testimonials.map((testimonial, index) => (
            <div key={index} className='border p-4 rounded-lg flex flex-col gap-4'>
              <Icon icon="icon-park-outline:quote" className='text-4xl text-accent' />
              <p className='md:text-lg'>{testimonial.comment}</p>
              <div className='flex flex-col'>
                <p className='text-lg font-bold'>{testimonial.clientName}</p>
                {testimonial.date && (
                  <p className='text-sm text-muted-foreground'>{formatDate(testimonial.date)}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </Fragment>
  );
} 