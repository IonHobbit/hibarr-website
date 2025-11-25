import { Fragment } from 'react';
import type { Locale } from '@/lib/i18n-config';
import AboutSection from './_components/AboutSection';
import PartnersSection from '../_components/PartnersSection';
import WhyCyprus from './_components/WhyCyprus';
import CaseStudiesSection from './_components/CaseStudiesSection';
import MeetRabih from './_components/MeetRabih';
import LeadershipTeamSection from './_components/LeadershipTeamSection';
import CallToActionSection from './_components/CallToActionSection';
import FeaturedSection from '../_components/FeaturedSection';
import TestimonialsSection from '@/app/[lang]/_components/TestimonialsSection';

import { fetchRawSanityData, fetchSanityData } from "@/lib/third-party/sanity.client";
import { HomePage } from '@/types/sanity.types';
import ConsultationProcessSection from './_components/ConsultationProcessSection';
import InvestorCommunitySection from './_components/InvestorCommunitySection';
import WebinarSection from './_components/WebinarSection';
import { Metadata } from 'next';
import { generateSEOMetadata } from '@/lib/utils';

import LandingWrapper from './_components/LandingWrapper';

type HomePageProps = {
  params: Promise<{ lang: Locale }>;
}

export async function generateMetadata(props: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await props.params;

  const { seo } = await fetchRawSanityData<HomePage>(`*[_type == "homePage" && language == $lang][0]`, { lang });

  return generateSEOMetadata(seo)
}

export const revalidate = 60;

export default async function Home(props: HomePageProps) {
  const { lang } = await props.params;

  const data = await fetchSanityData<HomePage>(`*[_type == "homePage" && language == $lang][0]`, { lang });

  return (
    <Fragment>
      <LandingWrapper data={data} lang={lang} />
      <FeaturedSection />
      {/* <div className='section'>
        <div className='bg-primary rounded-lg p-4 py-8 md:py-4 md:px-2 max-w-screen-sm xl:max-w-screen-xl mx-auto'>
          <SearchBar />
        </div>
      </div> */}
      <AboutSection data={data} />
      {/* <FindrSection /> */}
      <TestimonialsSection lang={lang} />
      <PartnersSection lang={lang} />
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