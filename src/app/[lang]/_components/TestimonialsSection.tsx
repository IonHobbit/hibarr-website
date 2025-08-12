import { CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel'
import { Carousel } from '@/components/ui/carousel'
import { Icon } from '@iconify/react'
import { Button } from '@/components/ui/button'
import { HomePage, Testimonial } from '@/types/sanity.types'
import { fetchSanityData } from '@/lib/third-party/sanity.client'
import { Locale } from '@/lib/i18n-config';
import { cn, formatDate, generateImageUrl } from '@/lib/utils'
import Image from 'next/image'

type TestimonialsSectionProps = {
  lang: Locale;
  showImage?: boolean;
  type?: Testimonial['type']
}

export default async function TestimonialsSection({ lang, type = 'client', showImage = false }: TestimonialsSectionProps) {
  const data = await fetchSanityData<HomePage>(`*[_type == "homePage" && language == $lang][0]`, { lang });
  const testimonials = await fetchSanityData<Testimonial[]>(`*[_type == "testimonial" && type == $type] | order(date desc)[0...3]`, { type });

  if (testimonials.length === 0) return null;

  return (
    <section id='testimonials' className='section pt-20'>
      <div className="flex flex-col items-center justify-center gap-4 min-h-[40vh] w-full overflow-hidden md:overflow-visible max-w-screen-sm md:max-w-screen-md mx-auto">
        <div className="relative w-full mx-auto">
          <div className="flex items-end justify-center w-full gap-2">
            <h3 className="text-3xl md:text-4xl text-center">{data?.testimonialsSection?.title}</h3>
          </div>
          <Icon icon="icon-park-outline:quote" className='hidden md:block text-7xl text-primary absolute -top-10 left-10' />
          <Icon icon="icon-park-outline:quote" className='hidden md:block text-7xl rotate-180 text-primary absolute -top-10 right-10' />
        </div>
        <Carousel opts={{ loop: true }} className='max-h-52'>
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index}>
                <div className={cn(showImage && testimonial.clientImage ? 'items-start' : 'flex-col items-center', 'flex gap-4 p-4 relative')}>
                  {showImage && testimonial.clientImage && (
                    <div className='w-32 h-32 rounded overflow-hidden relative shrink-0'>
                      <Image src={generateImageUrl(testimonial.clientImage).url()} alt={testimonial.clientName || ''} className='w-full h-full object-cover' fill loading='lazy' />
                    </div>
                  )}
                  <div className={cn(showImage && testimonial.clientImage ? 'items-start' : 'items-center', 'flex flex-col gap-2')}>
                    <p className={cn(showImage && testimonial.clientImage ? 'text-left' : 'text-center', 'text-base md:text-lg font-medium line-clamp-5')}>{testimonial.comment}</p>
                    <div className={cn(showImage && testimonial.clientImage ? 'items-start' : 'items-center', 'flex flex-col gap-0.5')}>
                      <p className='text-lg text-primary font-medium'>{testimonial.clientName}</p>
                      {testimonial.date && (
                        <p className='text-sm text-muted-foreground'>{formatDate(testimonial.date)}</p>
                      )}
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className='border-none translate-x-16 md:translate-x-0 translate-y-[450%] md:translate-y-0 bg-primary hover:bg-primary/80 cursor-pointer disabled:opacity-0' />
          <CarouselNext className='border-none -translate-x-16 md:translate-x-0 translate-y-[450%] md:translate-y-0 bg-primary hover:bg-primary/80 cursor-pointer disabled:opacity-0' />
        </Carousel>
        <Button variant="link" href={data?.testimonialsSection?.CTA?.url || ''} addLocaleToHref size="lg" className='w-max mx-auto text-accent'>
          {data?.testimonialsSection?.CTA?.label}
        </Button>
      </div>
    </section>

  )
}
