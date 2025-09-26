'use client'

import Link from 'next/link'
import { Icon } from '@/components/icons';
import { Button } from '@/components/ui/button'
import { HomePage } from '@/types/sanity.types';
import { useFeatureFlagVariantKey } from 'posthog-js/react';
import Video from '@/components/Video';

type LandingSectionProps = {
  data: HomePage;
}

export default function LandingSection({ data }: LandingSectionProps) {
  // fallback
  const baseLandingVideoMp4 = 'https://vz-da4cd036-d13.b-cdn.net/15ac0674-e562-4448-9853-a4992db2b7ab/play_720p.mp4';
  const v2LandingVideoMp4 = 'https://vz-da4cd036-d13.b-cdn.net/6ef32e69-1060-4df5-b792-b1179b6c6650/play.mp4';

  const baseLandingVideoHls = 'https://vz-da4cd036-d13.b-cdn.net/15ac0674-e562-4448-9853-a4992db2b7ab/playlist.m3u8';
  const v2LandingVideoHls = 'https://vz-da4cd036-d13.b-cdn.net/6ef32e69-1060-4df5-b792-b1179b6c6650/playlist.m3u8';

  const variantKey = useFeatureFlagVariantKey('v2-landing-video');

  const landingVideoMp4 = variantKey === 'v2' ? v2LandingVideoMp4 : baseLandingVideoMp4;
  const landingVideoHls = variantKey === 'v2' ? v2LandingVideoHls : baseLandingVideoHls;

  return (
    <section id='hero' className="relative w-full overflow-hidden px-4 sm:px-6 lg:px-8 grid place-items-center place-content-center h-screen  bg-gradient-to-b from-primary via-primary/80 to-transparent">
      <div className='absolute inset-0 w-full h-full -z-10'>
        <Video
          hls
          src={landingVideoHls}
          fallbackMp4={landingVideoMp4}
          muted
          autoPlay
          loop
          poster='https://res.cloudinary.com/hibarr/image/upload/landing-background-fallback_fitt21'
          containerClassName="contents"
          videoClassName="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-6xl text-center flex flex-col gap-10 px-4">
        <div className='flex flex-col gap-2'>
          <h1 className="text-5xl md:text-7xl xl:text-8xl font-bold mb-4 text-background">
            {data.title}
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
