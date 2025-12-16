import { Fragment } from 'react';
import type { Locale } from '@/lib/i18n-config';
import AboutSection from './_components/AboutSection';
import PartnersSection from '../_components/PartnersSection';
import WhyCyprus from './_components/WhyCyprus';
import LeadershipTeamSection from './_components/LeadershipTeamSection';
import CallToActionSection from './_components/CallToActionSection';
import FeaturedSection from '../_components/FeaturedSection';
import TestimonialsSection from '@/app/[lang]/_components/TestimonialsSection';
import { fetchSanityData } from "@/lib/third-party/sanity.client";
import { HomePage, SeoMetaFields, Testimonial } from '@/types/sanity.types';
import ConsultationProcessSection from './_components/ConsultationProcessSection';
import InvestorCommunitySection from './_components/InvestorCommunitySection';
import WebinarSection from './_components/WebinarSection';
import { Metadata } from 'next';
import { generateSEOMetadata } from '@/lib/utils';
import LandingWrapper from './_components/LandingWrapper';
import { seoTitles } from '@/lib/seo-titles';
import { seoDescriptions } from '@/data/seo-descriptions';

import CaseStudiesSection from './_components/CaseStudiesSection';
import MeetRabih from './_components/MeetRabih';

type HomePageProps = {
  params: Promise<{ lang: Locale }>;
}

export async function generateMetadata(props: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await props.params;

  const { seo } = await fetchSanityData<HomePage>(`*[_type == "homePage" && language == $lang][0]`, { lang });

  return generateSEOMetadata({ ...seo, metaTitle: seoTitles[lang].home, metaDescription: seoDescriptions[lang].home } as SeoMetaFields)
}

export const revalidate = 60;

export default async function Home(props: HomePageProps) {
  const { lang } = await props.params;

  // const cookieStore = await cookies();
  // const disableMedia = cookieStore.get('hibarr_nomedia')?.value === '1';

  const [data, testimonials] = await Promise.all([
    fetchSanityData<HomePage>(`*[_type == "homePage" && language == $lang][0]`, { lang }),
    fetchSanityData<Testimonial[]>(`*[_type == "testimonial" && type == $type] | order(date desc)[0...3]`, { type: 'client' }),
  ]);

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
      <LandingWrapper data={data} lang={lang} />
      <FeaturedSection lang={lang} featuredLogos={finalFeatures} />
      {/* <div className='section'>
        <div className='bg-primary rounded-lg p-4 py-8 md:py-4 md:px-2 max-w-screen-sm xl:max-w-screen-xl mx-auto'>
          <SearchBar />
        </div>
      </div> */}
      <AboutSection data={data} />
      {/* <FindrSection /> */}
      <TestimonialsSection lang={lang} data={data} testimonials={testimonials} />
      <PartnersSection lang={lang} partnerUrls={finalPartners} />
      <ConsultationProcessSection data={data.consultationProcessSection} />
      <WebinarSection />
      <WhyCyprus data={data.whyCyprusSection} />
      <CaseStudiesSection data={data.caseStudiesSection} lang={lang} />
      <InvestorCommunitySection data={data.investorCommunitySection} />
      <MeetRabih data={data.meetRabihSection} />
      <LeadershipTeamSection data={data.leadershipTeamSection} />
      <CallToActionSection data={data.callToActionSection} />
      {/* <FreebieSignupSection data={data.freebieSignupSection} /> */}
      {/* <SignupSection data={data.freebieSignupSection} /> */}
    </Fragment>
  );
} 