import { Dictionary } from '@/lib/dictionary';
import { InfiniteMovingCards } from '@/components/InfiniteMovingCards';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Icon } from '@iconify/react';

type AboutSectionProps = {
  dictionary: Dictionary;
}

export default function AboutSection({ dictionary }: AboutSectionProps) {
  const featuredIn = [
    {
      alt: 'Bellevue Logo',
      src: '/images/featured/bellevue-logo-black.png',
    },
    {
      alt: 'Netflix Logo',
      src: '/images/featured/Black-Netflix-Text-Logo.png',
    },
    {
      alt: 'Süddeutsche Zeitung Logo',
      src: '/images/featured/suddeutsche-zeitung-logo.png',
    },
    {
      alt: 'Wallstreet Online Logo',
      src: '/images/featured/wallstreet-online-logo-black-300x91-1.png',
    },
    {
      alt: 'Forbes Logo',
      src: '/images/featured/forbes-logo.png',
    },
    {
      alt: 'Gründer.de Logo',
      src: '/images/featured/gruender-de-logo-black.png',
    },
    {
      alt: 'Erfolg Magazin Logo',
      src: '/images/featured/erfolg-magazin-logo.webp',
    }
  ]

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

  const renderLogo = (item: { alt: string, src: string }) => (
    <div className="flex items-center justify-center relative w-40 h-20">
      <Image
        src={item.src}
        alt={item.alt}
        fill
        className="object-contain absolute"
      />
    </div>
  )

  return (
    <section id='about' className='section min-h-screen'>
      <h3 className='text-3xl font-bold text-center'>Featured in</h3>
      <div className='relative w-full'>
        <InfiniteMovingCards
          items={featuredIn.map(item => renderLogo(item))}
          speed="fast"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-10">
        <div>
          <Image src="/logos/logomark.svg" alt="Hibarr Logo" width={400} height={400} />
        </div>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <h3 className="text-3xl font-bold">{dictionary.home.whyUs.title}</h3>
            <p className="text-sm text-muted-foreground">
              {dictionary.home.whyUs.description}
            </p>
          </div>
          {dictionary.home.whyUs.reasons.map((reason, index) => (
            <div key={index} className='flex flex-col'>
              <p className='text-base font-medium'>{reason.title}</p>
              <p className='text-sm text-muted-foreground'>{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-10">
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col gap-2'>
            <h3 className="text-3xl font-bold">{dictionary.home.about.title}</h3>
            <p className="text-sm text-muted-foreground">
              {dictionary.home.about.description}
            </p>
          </div>
          {dictionary.home.about.paragraphs.map((paragraph, index) => (
            <p key={index} className='text-base'>{paragraph}</p>
          ))}
          <Button variant="accent" className='w-fit' asChild>
            <Link href="/consultation">
              {dictionary.home.about.cta.text}
            </Link>
          </Button>
        </div>
        <div>
          <Image src="/images/about-image.jpg" alt="Hibarr Logo" width={600} height={600} />
        </div>
      </div>
      <div className="flex flex-col justify-center gap-4 min-h-[60vh] max-w-screen-md mx-auto">
        <div className="relative w-max mx-auto">
          <div className="flex items-end gap-2">
            <h3 className="text-3xl font-bold text-center">{dictionary.home.testimonials.title}</h3>
          </div>
          <Icon icon="icon-park-outline:quote" className='text-7xl text-accent absolute -top-10 -left-10 mix-blend-multiply' />
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
          <CarouselPrevious className='border-none bg-accent hover:bg-accent/80 cursor-pointer disabled:opacity-0' />
          <CarouselNext className='border-none bg-accent hover:bg-accent/80 cursor-pointer disabled:opacity-0' />
        </Carousel>
        <Button variant="link" className='w-max mx-auto' asChild>
          <Link href={dictionary.home.testimonials.cta.href}>
            {dictionary.home.testimonials.cta.text}
          </Link>
        </Button>
      </div>
    </section>
  )
}
