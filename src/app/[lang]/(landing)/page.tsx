import { Fragment } from 'react';
import { getDictionary } from '@/lib/dictionary';
import type { Locale } from '@/lib/i18n-config';
import LandingSection from './_components/LandingSection';
import AboutSection from './_components/AboutSection';
import PartnersSection from './_components/PartnersSection';
import ConsulationProcessSection from './_components/ConsulationProcessSection';
import WhyCyprus from './_components/WhyCyprus';
import CaseStudiesSection from './_components/CaseStudiesSection';
import MeetRabih from './_components/MeetRabih';
import LeadershipTeamSection from './_components/LeadershipTeamSection';
import CallToActionSection from './_components/CallToActionSection';
import FreebieSignupSection from './_components/FreebieSignupSection';
import FeaturedSection from './_components/FeaturedSection';

export default async function Home(
  props: {
    params: Promise<{ lang: Locale }>;
  }
) {
  const { lang } = await props.params;

  const dictionary = await getDictionary(lang);

  return (
    <Fragment>
      <LandingSection dictionary={dictionary} />
      <FeaturedSection />
      <AboutSection dictionary={dictionary} />
      <PartnersSection dictionary={dictionary} />
      <ConsulationProcessSection dictionary={dictionary} />
      <WhyCyprus dictionary={dictionary} />
      <CaseStudiesSection dictionary={dictionary} />
      <MeetRabih dictionary={dictionary} />
      <LeadershipTeamSection dictionary={dictionary} />
      <CallToActionSection dictionary={dictionary} />
      <FreebieSignupSection dictionary={dictionary} />
    </Fragment>
  );
} 