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
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import SearchBar from '../listings/_components/SearchBar';

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
      <div className='section'>
        <div className='bg-primary rounded-lg p-4 py-8 md:py-4 md:px-2'>
          <SearchBar />
        </div>
      </div>
      <AboutSection data={data} />
      <TestimonialsSection lang={lang} />
      <PartnersSection lang={lang} />
      <ConsultationProcessSection data={data.consultationProcessSection} />
      <div className='bg-gray-50 '>
        <div className="section md:min-h-[50vh]">
          <div className="flex flex-col items-center gap-1.5">
            <h3 className='text-2xl md:text-4xl'>Unlock Exclusive North Cyprus Real Estate Opportunities</h3>
            <p className='text-sm md:text-lg'>Join Our Free Webinar today</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full grow">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3">
                <h3 className='text-2xl md:text-4xl'>What you will learn</h3>
                <p className='text-sm md:text-lg'>Join our webinar to gain exclusive insights into real estate investment in North Cyprus, including market updates, actionable strategies, and expert-backed advice. Learn about high rental yields, tax benefits, affordable property opportunities, and network with like-minded investors. With flexible payment plans and no credit checks, investing in North Cyprus has never been easier. Don&apos;t miss this chance to unlock your investment potential!</p>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className='text-2xl md:text-4xl'>Benefits of joining our webinar</h3>
                <p className='text-sm md:text-lg'>Joining our webinar offers you direct access to market insights, expert strategies, and actionable techniques to boost your results. Whether you&apos;re just starting or an experienced professional, you&apos;ll find valuable knowledge tailored to your level. The webinar provides opportunities to network with other professionals, learn from industry leaders, and hear real-world experiences. Plus, you&apos;ll gain all this at no cost price, without the need to search for information elsewhere.</p>
              </div>
              <Button size="lg" variant="accent" className='w-full md:w-max font-semibold'>Join Here</Button>
            </div>
            <div className="relative w-full h-80 md:h-full">
              <Image src="/images/freebie-image.webp" alt="Webinar" fill sizes="100%" className="object-cover" />
            </div>
          </div>
        </div>
      </div>
      <WhyCyprus data={data.whyCyprusSection} />
      <CaseStudiesSection data={data.caseStudiesSection} />
      <section className="section">
        <div className="flex flex-wrap md:grid grid-cols-2 justify-between gap-10 bg-accent p-6 rounded-lg">
          <h3 className='text-2xl md:text-5xl text-primary-foreground'>Join our community of Investors now on <span className='text-primary'>Facebook</span></h3>
          <div className="flex items-center gap-4 justify-center">
            <Button size="lg" className='w-full md:w-auto font-semibold'>Join Here</Button>
          </div>
        </div>
      </section>
      <MeetRabih data={data.meetRabihSection} />
      <LeadershipTeamSection data={data.leadershipTeamSection} />
      <CallToActionSection data={data.callToActionSection} />
      <FreebieSignupSection data={data.freebieSignupSection} />
    </Fragment>
  );
} 