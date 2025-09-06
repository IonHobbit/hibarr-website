import { Button } from '@/components/ui/button'
import { Locale } from '@/lib/i18n-config'
import { fetchRawSanityData, fetchSanityData } from '@/lib/third-party/sanity.client'
import { HomePage, WebinarPage } from '@/types/sanity.types'
import { Metadata } from 'next'
import Link from 'next/link'
import { Fragment } from 'react'
import WhyCyprus from '../(landing)/_components/WhyCyprus'
import FeaturedSection from '../_components/FeaturedSection'
import TestimonialsSection from '../_components/TestimonialsSection'
import AboutHostSection from './_components/AboutHostSection'
import RegistrationFormSection from './_components/RegistrationFormSection'
import TwoForOneSection from './_components/TwoForOneSection'
import BenefitsSection from './_components/BenefitsSection'
import StatisticsSection from './_components/StatisticsSection'
import { generateSEOMetadata } from '@/lib/utils'
import Video from '@/components/Video'

export async function generateMetadata(props: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await props.params;

  const { seo } = await fetchRawSanityData<WebinarPage>(`*[_type == "webinarPage" && language == $lang][0]`, { lang });

  return generateSEOMetadata(seo, {
    title: 'Webinar',
  })
}

type ZoomRegistrationPageProps = {
  params: Promise<{ lang: Locale }>;
};

export default async function ZoomRegistrationPage(
  props: ZoomRegistrationPageProps
) {
  const { lang } = await props.params;

  const homePage = await fetchSanityData<HomePage>(`*[_type == "homePage" && language == $lang][0]`, { lang }, { cache: 'no-store' });
  const webinarPage = await fetchSanityData<WebinarPage>(`*[_type == "webinarPage" && language == $lang][0]`, { lang }, { cache: 'no-store' });

  return (
    <Fragment>
      <section id='hero' className="relative w-full overflow-hidden px-4 sm:px-6 lg:px-8 grid grid-cols-1 place-items-center place-content-center min-h-screen bg-gradient-to-b from-primary via-primary/80 to-transparent">
        <div className='absolute inset-0 w-full h-full -z-10'>
          <Video
            hls
            src="https://vz-da4cd036-d13.b-cdn.net/31c737df-ff40-48a5-a2ab-e8fc0a829df5/playlist.m3u8"
            fallbackMp4="https://vz-da4cd036-d13.b-cdn.net/31c737df-ff40-48a5-a2ab-e8fc0a829df5/play_720p.mp4"
            autoPlay
            muted
            loop
            poster='/images/landing-background-fallback.png'
            containerClassName="contents"
            videoClassName="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-5xl text-center flex flex-col gap-10 px-4 mt-20 md:mt-0">
          <div className='flex flex-col gap-2'>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 text-background">
              {webinarPage?.title}
            </h1>
            <p className="text-sm md:text-lg text-background">
              {webinarPage?.subtitle}
            </p>
          </div>
          <div className='flex flex-wrap items-center justify-center gap-4'>
            <Button variant='accent' size="lg" asChild>
              <Link href={webinarPage.CTA?.url || ''} className='uppercase font-semibold'>
                {webinarPage.CTA?.label}
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <FeaturedSection />
      <BenefitsSection data={webinarPage?.benefitsSection} />
      <TwoForOneSection data={webinarPage?.benefitsSection} />
      <AboutHostSection data={webinarPage?.aboutHostSection} />
      <StatisticsSection data={webinarPage?.statisticsSection} />
      <TestimonialsSection lang={lang} />
      <WhyCyprus data={homePage.whyCyprusSection} link='#register' />
      <RegistrationFormSection data={webinarPage} />
    </Fragment >
  )
}
