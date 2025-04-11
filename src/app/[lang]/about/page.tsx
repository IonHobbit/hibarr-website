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
import { client } from '@/lib/sanity/client';
import { AboutPage as AboutPageType } from '@/lib/sanity/sanity.types';

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

  const data = await client.fetch<AboutPageType>(`*[_type == "aboutPage" && language == $lang][0]`, { lang }, { cache: 'no-store' });

  return (
    <Fragment>
      <section id='root' className="relative grid place-items-center place-content-center h-[60vh] bg-[url('/images/about-hero.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="max-w-2xl text-center flex flex-col gap-10 px-4 z-10">
          <div className='flex flex-col gap-2'>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-background uppercase">
              {data?.title}
            </h1>
            <p className="text-md md:text-base text-background">
              {data?.subtitle}
            </p>
          </div>
        </div>
        <div className='absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/40 to-transparent'></div>
      </section>
      <FeaturedSection />
      <MissionVisionSection data={data.missionVisionSection} />
      <AboutRabih data={data.aboutRabihSection} />
      <PartnersSection lang={lang} />
      <TestimonialsSection lang={lang} />
      <GallerySection data={data.gallerySection} />
      <CallToActionSection data={data.callToActionSection} />
    </Fragment>
  );
} 