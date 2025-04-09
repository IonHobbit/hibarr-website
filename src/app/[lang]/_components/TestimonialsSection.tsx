import { CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel'
import { Carousel } from '@/components/ui/carousel'
import { Icon } from '@iconify/react'
import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Dictionary } from '@/lib/dictionary'

type TestimonialsSectionProps = {
  data: Dictionary['home']['testimonials'];
}

export default function TestimonialsSection({ data }: TestimonialsSectionProps) {
  const testimonials = [
    {
      date: '2024-01-01',
      name: 'Petra Seitz',
      text: 'Von der ersten Kontaktaufnahme bis zum erfolgreichen Kaufabschluss unserer Villa, haben sich Rabih und Natalie hervorragend um unsere Fragen und Anliegen gekümmert. Sie unterstützen uns (schon fast rund um die Uhr) mit Rat und Tat, waren immer für uns erreichbar. Zu den Behördengängen, Bank-/ Rechtsanwaltterminen und sogar zum Abschluss eines Telefonvertrages, wurden wir von ihnen begleitet. Ein sehr engagiertes und kompetentes Team, welches ich unbedingt weiterempfehlen möchte.',
    },
    {
      date: '2024-01-01',
      name: 'Petra Seitz',
      text: 'Von der ersten Kontaktaufnahme bis zum erfolgreichen Kaufabschluss unserer Villa, haben sich Rabih und Natalie hervorragend um unsere Fragen und Anliegen gekümmert. Sie unterstützen uns (schon fast rund um die Uhr) mit Rat und Tat, waren immer für uns erreichbar. Zu den Behördengängen, Bank-/ Rechtsanwaltterminen und sogar zum Abschluss eines Telefonvertrages, wurden wir von ihnen begleitet. Ein sehr engagiertes und kompetentes Team, welches ich unbedingt weiterempfehlen möchte.',
    },
    {
      date: '2024-01-01',
      name: 'Petra Seitz',
      text: 'Von der ersten Kontaktaufnahme bis zum erfolgreichen Kaufabschluss unserer Villa, haben sich Rabih und Natalie hervorragend um unsere Fragen und Anliegen gekümmert. Sie unterstützen uns (schon fast rund um die Uhr) mit Rat und Tat, waren immer für uns erreichbar. Zu den Behördengängen, Bank-/ Rechtsanwaltterminen und sogar zum Abschluss eines Telefonvertrages, wurden wir von ihnen begleitet. Ein sehr engagiertes und kompetentes Team, welches ich unbedingt weiterempfehlen möchte.',
    },
    {
      date: '2024-01-01',
      name: 'Petra Seitz',
      text: 'Von der ersten Kontaktaufnahme bis zum erfolgreichen Kaufabschluss unserer Villa, haben sich Rabih und Natalie hervorragend um unsere Fragen und Anliegen gekümmert. Sie unterstützen uns (schon fast rund um die Uhr) mit Rat und Tat, waren immer für uns erreichbar. Zu den Behördengängen, Bank-/ Rechtsanwaltterminen und sogar zum Abschluss eines Telefonvertrages, wurden wir von ihnen begleitet. Ein sehr engagiertes und kompetentes Team, welches ich unbedingt weiterempfehlen möchte.',
    },
  ]

  return (
    <section id='testimonials' className='section'>
      <div className="flex flex-col justify-center gap-4 min-h-[60vh] w-full overflow-hidden md:overflow-visible max-w-screen-sm md:max-w-screen-md mx-auto">
        <div className="relative w-full mx-auto">
          <div className="flex items-end justify-center w-full gap-2">
            <h3 className="text-3xl font-bold text-center">{data.title}</h3>
          </div>
          <Icon icon="icon-park-outline:quote" className='hidden md:block text-7xl text-accent absolute -top-10 left-10' />
          <Icon icon="icon-park-outline:quote" className='hidden md:block text-7xl rotate-180 text-accent absolute -top-10 right-10' />
        </div>
        <Carousel opts={{ loop: true }}>
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index}>
                <div className='flex flex-col items-center gap-2 p-4 relative'>
                  <p className='text-base text-center font-medium'>{testimonial.text}</p>
                  <div className='flex flex-col items-center gap-0.5'>
                    <p className='text-lg text-primary font-medium'>{testimonial.name}</p>
                    <p className='text-sm text-muted-foreground'>{testimonial.date}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className='border-none translate-x-16 md:translate-x-0 translate-y-[450%] md:translate-y-0 bg-accent hover:bg-accent/80 cursor-pointer disabled:opacity-0' />
          <CarouselNext className='border-none -translate-x-16 md:translate-x-0 translate-y-[450%] md:translate-y-0 bg-accent hover:bg-accent/80 cursor-pointer disabled:opacity-0' />
        </Carousel>
        <Button variant="link" className='w-max mx-auto' asChild>
          <Link href={data.cta.href}>
            {data.cta.text}
          </Link>
        </Button>
      </div>
    </section>

  )
}
