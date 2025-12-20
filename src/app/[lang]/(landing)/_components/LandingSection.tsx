'use client'

import Link from 'next/link'
import { Icon } from '@/components/icons';
import { Button } from '@/components/ui/button'
import { HomePage } from '@/types/sanity.types';
import { useFeatureFlagVariantKey } from 'posthog-js/react';

import { Locale } from '@/lib/i18n-config';
import { seoH1s } from '@/lib/seo-h1';

type LandingSectionProps = {
  data: HomePage;
  lang: Locale;
}

export default function LandingSection({ data, lang }: LandingSectionProps) {
  // fallback
  const baseLandingVideoMp4 = 'https://vz-da4cd036-d13.b-cdn.net/15ac0674-e562-4448-9853-a4992db2b7ab/play_720p.mp4';
  const v2LandingVideoMp4 = 'https://vz-da4cd036-d13.b-cdn.net/6ef32e69-1060-4df5-b792-b1179b6c6650/play.mp4';

  // const baseLandingVideoHls = 'https://vz-da4cd036-d13.b-cdn.net/15ac0674-e562-4448-9853-a4992db2b7ab/playlist.m3u8';
  // const v2LandingVideoHls = 'https://vz-da4cd036-d13.b-cdn.net/6ef32e69-1060-4df5-b792-b1179b6c6650/playlist.m3u8';

  const variantKey = useFeatureFlagVariantKey('v2-landing-video');

  const landingVideoMp4 = variantKey === 'v2' ? v2LandingVideoMp4 : baseLandingVideoMp4;
  // const landingVideoHls = variantKey === 'v2' ? v2LandingVideoHls : baseLandingVideoHls;

  return (
    <section id='hero' className="relative w-full overflow-hidden px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center h-screen  bg-gradient-to-b from-primary via-primary/80 to-transparent">
      <div className='absolute inset-0 w-full h-full -z-10 bg-black'>
        <video src={landingVideoMp4} autoPlay muted loop playsInline className='w-full h-full object-cover' poster='https://res.cloudinary.com/hibarr/image/upload/landing-background-fallback_fitt21' />
      </div>

      <div className="lg:max-w-6xl w-full text-center flex flex-col gap-10">
        <div className='flex flex-col gap-2 w-full'>
          <h1 className="text-5xl md:text-7xl xl:text-8xl font-bold mb-4 text-background break-words">
            {seoH1s.home[lang]}
          </h1>
          <p className="text-base md:text-2xl text-background">
            {data.subtitle}
          </p>
        </div>
        <div className='flex flex-wrap items-center justify-center gap-4'>
          {data.buttons?.map((button, index) => (
            <Button key={index} href={button.url || ''} addLocaleToHref
              variant={index === 0 ? 'accent' : 'outline'} size="lg">
              {button.label}
            </Button>
          ))}
        </div>
      </div>
      <Link href="#about" className='absolute bottom-12 md:bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1 text-primary-foreground cursor-pointer'>
        <p className='text-md uppercase tracking-tight'>Scroll</p>
        <div className='flex flex-col items-center gap-1'>
          <Icon icon="iconamoon:mouse-thin" className='size-7' />
          <Icon icon="ph:arrow-down-thin" className='size-4' />
        </div>
        <p className='text-md uppercase'>Down</p>
      </Link>
    </section>
  )
}
