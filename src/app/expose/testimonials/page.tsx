import CaseStudiesSection from '@/app/[lang]/(landing)/_components/CaseStudiesSection'
import { fetchSanityData } from '@/lib/third-party/sanity.client'
import { formatDate } from '@/lib/utils'
import { Testimonial } from '@/types/sanity.types'
import { Icon } from '@/components/icons'
import Image from 'next/image'
import React, { Suspense } from 'react'

export const metadata = {
  title: 'Expose Testimonials',
  description: 'Expose Testimonials',
}

export default async function ExposeTestimonialsPage() {

  const testimonials = await fetchSanityData<Testimonial[]>(`*[_type == "testimonial"] | order(date desc)`);
  return (
  <section id='hero' className="relative w-full overflow-hidden px-4 lg:px-8 grid place-items-center gap-4 place-content-center h-screen bg-[url('https://res.cloudinary.com/hibarr/image/upload/testimonials-hero_byqwmh')] bg-cover bg-center bg-no-repeat scroll-smooth">
      <div className='absolute inset-0 w-full h-full bg-gradient-to-b from-primary via-primary/80 to-transparent'></div>

      <div className='flex flex-col items-center gap-4 z-10'>
        <Image src="/logos/logo-full-white.svg" alt="Testimonials Hero" width={200} height={40} className='object-cover' />
        <div className="flex flex-col items-center gap-1">
          <h1 className='text-4xl font-bold text-primary-foreground'>Testimonials</h1>
          <p className='text-primary-foreground'>Hear from our clients</p>
        </div>
        <div className="w-[80vw] md:w-[70vw] h-[70dvh] relative overflow-y-auto text-center px-3 lg:px-8 bg-secondary rounded-lg z-10">
          <Suspense fallback={<div className="p-4">Loading testimonials...</div>}>
            <CaseStudiesSection data={{ title: '', description: '' }} lang='en' />
          </Suspense>
          <section id='stories' className='section pt-0'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {testimonials.map((testimonial, index) => (
                <div key={index} className='border p-4 rounded-lg flex flex-col justify-around gap-4'>
                  <Icon icon="icon-park-outline:quote" className='text-4xl text-accent' />
                  <p className='text-sm md:text-lg'>{testimonial.comment}</p>
                  <div className='flex flex-col'>
                    <p className='text-lg font-bold'>{testimonial.clientName}</p>
                    {testimonial.date && (
                      <p className='text-xs md:text-sm text-muted-foreground'>{formatDate(testimonial.date)}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  )
}
