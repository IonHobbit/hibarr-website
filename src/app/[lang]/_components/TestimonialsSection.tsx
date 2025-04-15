import { CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel'
import { Carousel } from '@/components/ui/carousel'
import { Icon } from '@iconify/react'
import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { HomePage, Testimonial } from '@/types/sanity.types'
import { client } from '@/lib/sanity/client'
import { Locale } from '@/lib/i18n-config';
import { formatDate } from '@/lib/utils'

type TestimonialsSectionProps = {
  lang: Locale;
  showImage?: boolean;
  type?: Testimonial['type']
}

export default async function TestimonialsSection({ lang, type = 'client', showImage = false }: TestimonialsSectionProps) {
  const data = await client.fetch<HomePage>(`*[_type == "homePage" && language == $lang][0]`, { lang }, { cache: 'no-store' });
  const testimonials = await client.fetch<Testimonial[]>(`*[_type == "testimonial" && type == $type] | order(date desc)[0...3]`, { type }, { cache: 'no-store' });

  if (testimonials.length === 0) return null;

  return (
    <section id='testimonials' className='section'>
      <div className="flex flex-col justify-center gap-4 min-h-[40vh] w-full overflow-hidden md:overflow-visible max-w-screen-sm md:max-w-screen-md mx-auto">
        <div className="relative w-full mx-auto">
          <div className="flex items-end justify-center w-full gap-2">
            <h3 className="text-3xl font-bold text-center">{data?.testimonialsSection?.title}</h3>
          </div>
          <Icon icon="icon-park-outline:quote" className='hidden md:block text-7xl text-primary absolute -top-10 left-10' />
          <Icon icon="icon-park-outline:quote" className='hidden md:block text-7xl rotate-180 text-primary absolute -top-10 right-10' />
        </div>
        <Carousel opts={{ loop: true }}>
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index}>
                <div className='flex flex-col items-center gap-2 p-4 relative'>
                  <p className='text-base text-center font-medium'>{testimonial.comment}</p>
                  <div className='flex flex-col items-center gap-0.5'>
                    <p className='text-lg text-primary font-medium'>{testimonial.clientName}</p>
                    {testimonial.date && (
                      <p className='text-sm text-muted-foreground'>{formatDate(testimonial.date)}</p>
                    )}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className='border-none translate-x-16 md:translate-x-0 translate-y-[450%] md:translate-y-0 bg-primary hover:bg-primary/80 cursor-pointer disabled:opacity-0' />
          <CarouselNext className='border-none -translate-x-16 md:translate-x-0 translate-y-[450%] md:translate-y-0 bg-primary hover:bg-primary/80 cursor-pointer disabled:opacity-0' />
        </Carousel>
        <Button variant="link" size="lg" className='w-max mx-auto text-accent' asChild>
          <Link href={data?.testimonialsSection?.CTA?.url ?? ''}>
            {data?.testimonialsSection?.CTA?.label}
          </Link>
        </Button>
      </div>
    </section>

  )
}
