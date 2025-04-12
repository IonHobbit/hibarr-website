import Video from '@/components/Video'
import CountUp from '@/components/bits/CountUp/CountUp'
import { Button } from '@/components/ui/button'
import { Locale } from '@/lib/i18n-config'
import { client } from '@/lib/sanity/client'
import { AboutPage, HomePage, WebinarPage } from '@/types/sanity.types'
import { Metadata } from 'next'
import Link from 'next/link'
import { Fragment } from 'react'
import WhyCyprus from '../(landing)/_components/WhyCyprus'
import FeaturedSection from '../_components/FeaturedSection'
import TestimonialsSection from '../_components/TestimonialsSection'
import AboutHostSection from './_components/AboutHostSection'
import RegistrationFormSection from './_components/RegistrationFormSection'

export const metadata: Metadata = {
  title: 'Webinar',
}

type ZoomRegistrationPageProps = {
  params: Promise<{ lang: Locale }>;
};

export default async function ZoomRegistrationPage(
  props: ZoomRegistrationPageProps
) {
  const { lang } = await props.params;

  const homePage = await client.fetch<HomePage>(`*[_type == "homePage" && language == $lang][0]`, { lang }, { cache: 'no-store' });
  const aboutPage = await client.fetch<AboutPage>(`*[_type == "aboutPage" && language == $lang][0]`, { lang }, { cache: 'no-store' });
  const webinarPage = await client.fetch<WebinarPage>(`*[_type == "webinarPage" && language == $lang][0]`, { lang }, { cache: 'no-store' });

  return (
    <Fragment>
      <section id='hero' className="relative w-full overflow-hidden px-4 sm:px-6 lg:px-8 grid place-items-center place-content-center h-screen bg-gradient-to-b from-primary via-primary/80 to-transparent">
        <div className='absolute inset-0 w-full h-full -z-10'>
          <video src="https://vz-da4cd036-d13.b-cdn.net/31c737df-ff40-48a5-a2ab-e8fc0a829df5/play_720p.mp4" autoPlay muted loop playsInline className='w-full h-full object-cover' />
        </div>

        <div className="max-w-4xl text-center flex flex-col gap-10 px-4">
          <div className='flex flex-col gap-2'>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-background">
              {webinarPage?.title}
            </h1>
            <p className="text-sm md:text-base text-background">
              {webinarPage?.subtitle}
            </p>
          </div>
          <div className='flex flex-wrap items-center justify-center gap-4'>
            <Button variant='accent' size="lg" asChild>
              <Link href={webinarPage.CTA?.url ?? ''} className='uppercase font-semibold'>
                {webinarPage.CTA?.label}
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <FeaturedSection />
      <section id='benefits' className='section'>
        <div className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-10">
          <div>
            <Video
              autoPlay
              muted
              loop
              src="https://hibarr.de/wp-content/uploads/2025/03/flyer.mp4"
            />
          </div>
          <div className="flex flex-col gap-6">
            <h3 className="text-3xl">{webinarPage?.benefitsSection?.title}</h3>
            <div className="flex flex-col gap-4">
              {webinarPage?.benefitsSection?.benefits?.map((benefit) => (
                <div key={benefit.title} className="flex gap-2">
                  <p className="text-sm font-semibold">{benefit.title}: <span className="font-normal">{benefit.description}</span></p>
                </div>
              ))}
            </div>
            <Button className="w-max" variant="accent" asChild>
              <Link href={webinarPage?.benefitsSection?.CTA?.url ?? ''}>{webinarPage?.benefitsSection?.CTA?.label}</Link>
            </Button>
          </div>
        </div>
      </section>
      <section className='bg-primary bg-[url("https://hibarr.de/wp-content/uploads/2025/03/line-wave-background-gradient-style-template.webp")] bg-blend-overlay bg-cover bg-center'>
        <div className="sectiion grid place-items-center place-content-center gap-10 py-10 max-w-screen-md mx-auto">
          <h3 className='text-4xl text-primary-foreground text-center'>Ready to learn how to buy two properties for the price of one?</h3>
          <Button className="w-max" variant="accent" asChild>
            <Link href={webinarPage?.benefitsSection?.CTA?.url ?? ''}>{webinarPage?.benefitsSection?.CTA?.label}</Link>
          </Button>
        </div>
      </section>
      <AboutHostSection data={aboutPage.aboutRabihSection} />
      <section className='bg-primary bg-[url("https://hibarr.de/wp-content/uploads/2025/03/line-wave-background-gradient-style-template.webp")] bg-blend-overlay bg-cover bg-center'>
        <div className="sectiion grid place-items-center place-content-center gap-10 py-20 max-w-screen-md mx-auto">
          <h3 className='text-4xl text-primary-foreground text-center'>Unlocking Success in Exclusive Real Estate with Rabih Rabea</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            {webinarPage?.statisticsSection?.map((statistic, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                <p className="text-6xl font-semibold text-primary-foreground">
                  {statistic.prefix && <span>{statistic.prefix}</span>}
                  <CountUp from={0} to={statistic.number ?? 0} />
                  {statistic.postfix && <span>{statistic.postfix}</span>}
                </p>
                <p className="text-sm md:text-base text-primary-foreground">{statistic.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <TestimonialsSection lang={lang} />
      <WhyCyprus data={homePage.whyCyprusSection} />
      <RegistrationFormSection data={webinarPage} />
    </Fragment >
  )
}
