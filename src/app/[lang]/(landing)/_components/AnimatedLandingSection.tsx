'use client'

import Link from 'next/link'
import { Icon } from '@/components/icons';
import { HomePage } from '@/types/sanity.types';
import Video from '@/components/Video';

type AnimatedLandingSectionProps = {
  data: HomePage;
}

export default function AnimatedLandingSection({ }: AnimatedLandingSectionProps) {
  return (
    <section id='hero' className="relative w-full overflow-hidden px-4 sm:px-6 lg:px-8 grid place-items-center place-content-center">
      {/* <div className="h-screen w-screen relative overflow-hidden">
        <Image src="https://res.cloudinary.com/hibarr/image/upload/generate_pa5u3i" alt="Landing Background" fill className='absolute inset-0 object-contain object-center animate-landing-background w-full h-full' />
        <Image src="https://res.cloudinary.com/hibarr/image/upload/cover_w4idze" alt="Landing Background" fill className='absolute bottom-0 right-0 h-full object-cover object-bottom animate-landing-cover' />
        <Image
          src="https://res.cloudinary.com/hibarr/image/upload/couple_qlcyjh"
          alt="Landing Background"
          width={700}
          height={100}
          className='absolute bottom-0 right-24 animate-landing-couple'
        />
      </div> */}
      <div className='absolute inset-0 bg-primary/20' />
      <div className='h-screen w-screen'>
        <Video
          hls
          src="https://vz-da4cd036-d13.b-cdn.net/50e75c2c-6c87-432d-bd6c-e7078c3e580f/playlist.m3u8"
          fallbackMp4="https://vz-da4cd036-d13.b-cdn.net/50e75c2c-6c87-432d-bd6c-e7078c3e580f/play_720p.mp4"
          autoPlay
          muted
          loop
          containerClassName="contents"
          videoClassName="w-full h-full object-cover object-bottom"
        />
      </div>

      <Link href="#about" className='absolute bottom-6 md:bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1 text-primary-foreground cursor-pointer'>
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
