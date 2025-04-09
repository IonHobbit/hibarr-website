import { getDictionary } from '@/lib/dictionary';
import type { Locale } from '@/lib/i18n-config';
import { Metadata } from 'next';
import { Fragment } from 'react';
import FeaturedSection from '../_components/FeaturedSection';
import PartnersSection from '../_components/PartnersSection';
import TestimonialsSection from '../_components/TestimonialsSection';
import MissionVisionSection from './_components/MissionVisionSection';
import AboutRabih from './_components/AboutRabih';
import CallToActionSection from './_components/CallToActionSection';
import GallerySection from './_components/GallerySection';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'About Us',
}

export default async function AboutPage(
  props: {
    params: Promise<{ lang: Locale }>;
  }
) {
  const { lang } = await props.params;
  const dictionary = await getDictionary(lang);

  return (
    <Fragment>
      <section id='root' className="relative grid place-items-center place-content-center h-[60vh] bg-[url('/images/about-hero.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="max-w-2xl text-center flex flex-col gap-10 z-10">
          <div className='flex flex-col gap-2'>
            <h1 className="text-6xl font-bold mb-4 text-background uppercase">
              {dictionary.about.title}
            </h1>
            <p className="text-md text-background">
              {dictionary.about.welcome}
            </p>
          </div>
        </div>
        <div className='absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/40 to-transparent'></div>
      </section>
      <FeaturedSection />
      <MissionVisionSection dictionary={dictionary} />
      <AboutRabih dictionary={dictionary} />
      <PartnersSection dictionary={dictionary} />
      <TestimonialsSection data={dictionary.about.testimonials} />
      <GallerySection dictionary={dictionary} />
      <CallToActionSection dictionary={dictionary} />
    </Fragment>
  );
} 