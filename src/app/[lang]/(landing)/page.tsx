import { Fragment } from 'react';
import type { Locale } from '@/lib/i18n-config';
import LandingSection from './_components/LandingSection';
import AboutSection from './_components/AboutSection';
import PartnersSection from '../_components/PartnersSection';
import WhyCyprus from './_components/WhyCyprus';
import CaseStudiesSection from './_components/CaseStudiesSection';
import MeetRabih from './_components/MeetRabih';
import LeadershipTeamSection from './_components/LeadershipTeamSection';
import CallToActionSection from './_components/CallToActionSection';
import FreebieSignupSection from './_components/FreebieSignupSection';
import FeaturedSection from '../_components/FeaturedSection';
import TestimonialsSection from '@/app/[lang]/_components/TestimonialsSection';

import { client } from "@/lib/sanity/client";
import { HomePage } from '@/lib/sanity/sanity.types';
import ConsultationProcessSection from './_components/ConsultationProcessSection';

export default async function Home(
  props: {
    params: Promise<{ lang: Locale }>;
  }
) {
  const { lang } = await props.params;

  const data = await client.fetch<HomePage>(`*[_type == "homePage" && language == $lang][0]`, { lang });

  return (
    <Fragment>
      <LandingSection data={data} />
      <FeaturedSection />
      <AboutSection data={data} />
      <TestimonialsSection lang={lang} />
      <PartnersSection lang={lang} />
      <ConsultationProcessSection data={data.consultationProcessSection} />
      <WhyCyprus data={data.whyCyprusSection} />
      <CaseStudiesSection data={data.caseStudiesSection} />
      <MeetRabih data={data.meetRabihSection} />
      <LeadershipTeamSection data={data.leadershipTeamSection} />
      <CallToActionSection data={data.callToActionSection} />
      <FreebieSignupSection data={data.freebieSignupSection} />
    </Fragment>
  );
} 