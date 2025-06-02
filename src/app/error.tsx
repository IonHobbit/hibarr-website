'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ErrorPage() {
  const refresh = () => {
    window.location.reload();
  }

  return (
    <div className='relative overflow-hidden px-4 sm:px-6 lg:px-8 grid place-items-center place-content-center gap-8 h-screen bg-gradient-to-b from-primary via-primary/80 to-transparent'>
      <div className='absolute inset-0 w-full h-full -z-10'>
        <video src="https://vz-da4cd036-d13.b-cdn.net/31c737df-ff40-48a5-a2ab-e8fc0a829df5/play_720p.mp4" autoPlay muted loop playsInline className='w-full h-full object-cover' />
      </div>
      <Image src='/logos/logo.png' alt='logo' width={300} height={58} />
      <div className="flex flex-col items-center gap-3">
        <h1 className='text-4xl text-primary-foreground'>Looks like something went wrong</h1>
        <p className='text-primary-foreground'>Please try refreshing the page or <Link href='mailto:it@hibarr.de' className='text-accent hover:underline'>contact support.</Link></p>
        <Button variant='accent' className='text-primary-foreground' onClick={refresh}>Refresh page</Button>
      </div>
    </div>
  )
}
