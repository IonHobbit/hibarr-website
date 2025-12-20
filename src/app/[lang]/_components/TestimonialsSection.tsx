import { CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel'
import { Carousel } from '@/components/ui/carousel'
import { Icon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { HomePage, Testimonial } from '@/types/sanity.types'
import { Locale } from '@/lib/i18n-config';
import { cn, formatDate, generateImageUrl } from '@/lib/utils'
import Image from 'next/image'
import { fetchSanityData } from '@/lib/third-party/sanity.client'

type TestimonialsSectionProps = {
  lang: Locale;
  showImage?: boolean;
  type?: Testimonial['type']
  data?: HomePage;
  testimonials?: Testimonial[];
}

export default async function TestimonialsSection({ lang, type = 'client', showImage = false, data, testimonials }: TestimonialsSectionProps) {
  const resolvedData = data ?? await fetchSanityData<HomePage>(`*[_type == "homePage" && language == $lang][0]`, { lang });
  const resolvedTestimonials = testimonials ?? await fetchSanityData<Testimonial[]>(`*[_type == "testimonial" && type == $type] | order(date desc)[0...3]`, { type });

  const filteredTestimonials = resolvedTestimonials?.filter(testimonial => testimonial.type === type) ?? [];

  if (filteredTestimonials.length === 0) return null;

  return (
    <section id='testimonials' className='section pt-20'>
      <div className="flex flex-col items-center justify-center gap-4 min-h-[40dvh] w-full overflow-hidden md:overflow-visible max-w-screen-sm md:max-w-screen-md mx-auto">
        <div className="relative w-full mx-auto">
          <div className="flex items-end justify-center w-full gap-2">
            <h3 className="text-3xl md:text-4xl text-center">{resolvedData?.testimonialsSection?.title}</h3>
          </div>
          <Icon icon="icon-park-outline:quote" className='hidden md:block text-7xl text-primary absolute -top-16 left-10' />
          <Icon icon="icon-park-outline:quote" className='hidden md:block text-7xl rotate-180 text-primary absolute -top-16 right-10' />
        </div>
        <Carousel opts={{ loop: true }} className='max-h-52'>
          <CarouselContent>
            {filteredTestimonials.map((testimonial, index) => (
              <CarouselItem key={index}>
                <div className={cn(showImage && testimonial.clientImage ? 'items-start' : 'flex-col items-center', 'flex gap-4 p-4 relative')}>
                  {showImage && testimonial.clientImage && (
                    <div className='w-32 h-32 rounded overflow-hidden relative shrink-0'>
                      <Image src={generateImageUrl(testimonial.clientImage).format('jpg').url()} alt={testimonial.clientName || 'Hibarr Client Testimonial'} className='w-full h-full object-cover' fill loading='lazy' />
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
        <Button variant="link" href={resolvedData?.testimonialsSection?.CTA?.url || ''} addLocaleToHref size="lg" className='w-max mx-auto text-accent'>
          {resolvedData?.testimonialsSection?.CTA?.label}
        </Button>
      </div>
    </section>

  )
}
