import { generateSEOMetadata } from '@/lib/utils'
import { Metadata } from 'next'
import Image from 'next/image'
import { Suspense } from 'react'
import TrackingForm from './_components/TrackingForm'

export async function generateMetadata(): Promise<Metadata> {
  return generateSEOMetadata(undefined, {
    title: 'Campaign Tracking - Track Your Marketing Performance',
    description: 'Track your marketing campaigns and creative performance',
  })
}

export default function TrackingPage() {
  return (
    <section id='hero' className="relative w-full overflow-hidden px-4 sm:px-6 lg:px-8 grid place-items-center place-content-center min-h-screen bg-gradient-to-b from-primary via-primary/80 to-transparent">
      <div className='absolute inset-0 w-full h-full -z-10'>
        <Image src="/images/webinar-registration-background.webp" alt="Tracking Hero" fill className='w-full h-full object-cover absolute' />
      </div>

      <div className="max-w-xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-primary-foreground">
            Campaign Tracking
          </h1>
          <p className="text-xl text-primary-foreground/80">
            Track your marketing campaigns and creative performance across all platforms
          </p>
        </div>

        <Suspense fallback={
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-foreground mx-auto mb-4"></div>
            <p className="text-primary-foreground">Loading tracking form...</p>
          </div>
        }>
          <TrackingForm />
        </Suspense>
      </div>
    </section>
  )
}