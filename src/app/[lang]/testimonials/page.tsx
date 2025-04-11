import Link from 'next/link';
import { Fragment } from 'react';
import { Icon } from '@iconify/react';
import { Button } from '@/components/ui/button';
import type { Locale } from '@/lib/i18n-config';
import { formatDate } from '@/lib/utils';
import { Metadata } from 'next';
import { client } from '@/lib/sanity/client';
import { TestimonialsPage as TestimonialsPageType } from '@/lib/sanity/sanity.types';

export const metadata: Metadata = {
  title: 'Testimonials',
}

export default async function TestimonialsPage(
  props: {
    params: Promise<{ lang: Locale }>;
  }
) {
  const { lang } = await props.params;

  const data = await client.fetch<TestimonialsPageType>(`*[_type == "testimonialsPage" && language == $lang][0]`, { lang });

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
    <Fragment>
      <section id='hero' className="relative grid place-items-center place-content-center h-screen bg-[url('/images/testimonials-hero.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="max-w-2xl text-center flex flex-col gap-10 z-10 p-4">
          <div className='flex flex-col gap-2'>
            <div className='flex items-center p-1 px-3 bg-secondary w-max mx-auto rounded-full'>
              <p className="uppercase text-sm font-semibold">
                {data?.name}
              </p>
            </div>
            <h1 className="text-6xl font-bold mb-4 text-primary-foreground">
              {data?.title}
            </h1>
            <p className="text-md text-primary-foreground">
              {data?.description}
            </p>
          </div>
          <Button variant="accent" size="lg" className='w-max mx-auto' asChild>
            <Link href={data?.CTA?.url ?? ''} className='uppercase font-semibold'>
              {data?.CTA?.label}
            </Link>
          </Button>
        </div>
        <div className='absolute inset-0 w-full h-full bg-gradient-to-b from-primary via-primary/80 to-transparent'></div>

        <Link href="#stories" className='absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1 text-primary-foreground cursor-pointer'>
          <p className='text-md uppercase tracking-tight'>Scroll</p>
          <div className='flex flex-col items-center gap-1'>
            <Icon icon="iconamoon:mouse-thin" className='size-7' />
            <Icon icon="ph:arrow-down-thin" className='size-4' />
          </div>
          <p className='text-md uppercase'>Down</p>
        </Link>
      </section>
      <section id='stories' className='section'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {testimonials.map((testimonial, index) => (
            <div key={index} className='border p-4 rounded-lg flex flex-col gap-4'>
              <Icon icon="icon-park-outline:quote" className='text-4xl text-accent' />
              <p className='text-md'>{testimonial.text}</p>
              <div className='flex flex-col'>
                <p className='text-lg font-bold'>{testimonial.name}</p>
                <p className='text-sm text-muted-foreground'>{formatDate(testimonial.date)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Fragment>
  );
} 