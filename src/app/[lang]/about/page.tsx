import type { Locale } from '@/lib/i18n-config';
import { seoH1s } from '@/lib/seo-h1';
import { Metadata } from 'next';
import { Fragment } from 'react';
import FeaturedSection from '../_components/FeaturedSection';
import Video from '@/components/Video';
import PartnersSection from '../_components/PartnersSection';
import TestimonialsSection from '../_components/TestimonialsSection';
import MissionVisionSection from './_components/MissionVisionSection';
import AboutRabih from './_components/AboutRabih';
import CallToActionSection from './_components/CallToActionSection';
import GallerySection from './_components/GallerySection';
import { fetchRawSanityData, fetchSanityData } from '@/lib/third-party/sanity.client';
import { AboutPage as AboutPageType, SeoMetaFields } from '@/types/sanity.types';
import { generateSEOMetadata } from '@/lib/utils';

import { seoTitles } from '@/lib/seo-titles';
import { seoDescriptions } from '@/data/seo-descriptions';


export async function generateMetadata(props: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await props.params;

  const { seo } = await fetchRawSanityData<AboutPageType>(`*[_type == "aboutPage" && language == $lang][0]`, { lang });

  return generateSEOMetadata({ ...seo, metaTitle: seoTitles[lang].about, metaDescription: seoDescriptions[lang].about } as SeoMetaFields)
}

export default async function AboutPage(
  props: {
    params: Promise<{ lang: Locale }>;
  }
) {
  const { lang } = await props.params;

  const data = await fetchSanityData<AboutPageType>(`*[_type == "aboutPage" && language == $lang][0]`, { lang }, { cache: 'no-store' });
  const finalFeatures = [
    "https://res.cloudinary.com/hibarr/image/upload/v1758785140/whatswhat-logo_xyq9sw.png",
    "https://res.cloudinary.com/hibarr/image/upload/v1750747645/erfolg-magazin-logo_nthlb6.webp",
    "https://res.cloudinary.com/hibarr/image/upload/v1750747645/gruender-de-logo-black_ndnwry.png",
    "https://res.cloudinary.com/hibarr/image/upload/v1750747645/forbes-logo_vwad88.png",
    "https://res.cloudinary.com/hibarr/image/upload/v1750747645/wallstreet-online-logo-black-300x91-1_gelaga.png",
    "https://res.cloudinary.com/hibarr/image/upload/v1750747645/Black-Netflix-Text-Logo_ehsqkh.png",
    "https://res.cloudinary.com/hibarr/image/upload/v1750747645/suddeutsche-zeitung-logo_sqjx2p.png",
    "https://res.cloudinary.com/hibarr/image/upload/v1750747645/bellevue-logo-black_ej8bvy.png"
  ];
  const finalPartners = [
    "https://res.cloudinary.com/hibarr/image/upload/v1748596118/near-east-bank_hwucb3.svg",
    "https://res.cloudinary.com/hibarr/image/upload/v1748595884/iktisatbank-logo_srk805.svg",
    "https://res.cloudinary.com/hibarr/image/upload/v1748595778/logo_j5fy0u.png",
    "https://res.cloudinary.com/hibarr/image/upload/v1748593886/ambasedeusBW-300x134-1_ejpsyy.png",
    "https://res.cloudinary.com/hibarr/image/upload/v1748593885/dwnamexBW-1_abd3e2.png",
    "https://res.cloudinary.com/hibarr/image/upload/v1748593885/grand-pasha-logo-BW-1-300x216-1_q0rlxv.png",
    "https://res.cloudinary.com/hibarr/image/upload/v1748593884/cratos-BW_esybo9.png",
    "https://res.cloudinary.com/hibarr/image/upload/v1748593883/creditwestBW_bblkpz.png"
  ];

  return (
    <Fragment>
      <section id='root' className="relative grid place-items-center place-content-center min-h-screen bg-cover bg-center bg-no-repeat">
        <div className='absolute inset-0 w-full h-full -z-10'>
          <Video
            hls
            src="https://hibarr-01.b-cdn.net/Website%20Assets/Videos/HERO/playlist.m3u8"
            fallbackMp4="https://hibarr-01.b-cdn.net/Website%20Assets/Videos/HERO.mp4"
            autoPlay
            muted
            loop
            poster='https://res.cloudinary.com/hibarr/image/upload/aboutus-background-fallback_dhjxlb'
            containerClassName="contents"
            videoClassName="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-2xl text-center flex flex-col gap-10 px-4 z-10">
          <div className='flex flex-col gap-2'>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 text-background">
              {seoH1s.about[lang]}
            </h1>
            <p className="text-md md:text-xl text-background">
              {data?.subtitle}
            </p>
          </div>
        </div>
        <div className='absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/40 to-transparent'></div>
      </section>
      <FeaturedSection lang={lang} featuredLogos={finalFeatures} />
      <MissionVisionSection data={data.missionVisionSection} />
      <AboutRabih data={data.aboutRabihSection} />
      <PartnersSection lang={lang} partnerUrls={finalPartners} />
      <TestimonialsSection lang={lang} showImage />
      <GallerySection data={data.gallerySection} />
      <CallToActionSection data={data.callToActionSection} />
    </Fragment>
  );
} 