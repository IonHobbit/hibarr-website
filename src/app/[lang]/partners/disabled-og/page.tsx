import { Icon } from '@iconify/react'
import { Metadata } from 'next'
import Image from 'next/image'
import React, { Fragment } from 'react'
import FAQAccordion from '../../_components/FAQAccordion'
import { Locale } from '@/lib/i18n-config'
import Video from '@/components/Video'

export const metadata: Metadata = {
  title: 'Oscar Group',
  description: 'Excellence Starts with the Right Partner – Oscar Group.',
}

export default async function OscarGroup(
  props: {
    params: Promise<{ lang: Locale }>;
  }
) {
  const { lang } = await props.params;

  const portfolioCompanies = [
    {
      name: 'Oscar Park Hotel',
      image: '/images/partners/oscar-group/oscar-park-hotel.webp',
    },
    {
      name: 'Oscar Petrol',
      image: '/images/partners/oscar-group/oscar-petrol.webp',
    },
    {
      name: 'Vuni Hotel',
      image: '/images/partners/oscar-group/vuni-hotel.webp',
    },
    {
      name: 'Oscar Car Hire',
      image: '/images/partners/oscar-group/oscar-car-hire.webp',
    },
    {
      name: 'Oscar Resort Hotel',
      image: '/images/partners/oscar-group/oscar-resort-hotel.webp',
    },
  ]

  const portfolioAreas = [
    {
      name: 'Travel & Hospitality',
      description: 'Boutique beachfront resorts in North Cyprus offering eco-friendly luxury and personalized service.',
    },
    {
      name: 'Food & Beverage',
      description: 'Premium olive oil crafted using traditional methods, with factory tours and tastings.',
    },
    {
      name: 'Essential Services',
      description: 'Convenient 24/7 petrol station with additional amenities like a store and EV charging.',
    },
  ]

  return (
    <Fragment>
      <section id='root' className="relative grid place-items-center place-content-center h-[60vh] bg-[url('/images/hibarr-oscar.jpg')] bg-cover bg-center bg-no-repeat bg-gradient-to-b from-primary via-primary/80 to-transparent">
        <div className="max-w-2xl text-center flex flex-col gap-10 px-4 z-10">
          <div className='flex flex-col items-center gap-6'>
            <Image src="/images/partners/oscar-group/oscar-group-logo.png" alt="Oscar Group Logo" width={400} height={400} />

            <p className="text-md md:text-2xl text-background">
              Excellence Starts with the Right Partner – <span className='font-bold'>Oscar Group.</span>
            </p>
          </div>
        </div>
        <div className='absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/40 to-transparent'></div>
      </section>
      <section className='section md:py-20'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl md:text-4xl'>
              About Oscar Group
            </h2>
            <p className='text-md md:text-lg'>
              The Oscar Group of Companies is a family run business, it is now the largest and oldest running company based in Northern Cyprus with a combined estimated market value of approximately 300 million dollars. Also employing a workforce of around 900 personal from a wide variety of ethnic backgrounds. The Oscar Group of Companies is today jointly run by the Oskar family, Mr Erdem Oskar being the Co President and appointing his four children as directors and equal shareholders of the company. The Group&apos;s investments include a large number of subsidairy companies ranging from hotel chains, self drive car hire, importation/distribution, water production, tourism, catering, solar energy, new and used vehicle sales. Somebody once stated &quot;The sky is the limit !&quot; We believe <span className='font-semibold'>there is no limit!</span>
            </p>
          </div>
          <div className='flex flex-col gap-6'>
            <h3 className='text-xl md:text-2xl'>Discover the Diverse Portfolio of Oscar Group</h3>
            <div className='grid sm:grid-cols-2 md:grid-cols-5 gap-6'>
              {portfolioCompanies.map((company, index) => (
                <div key={index} className='relative w-full h-28 overflow-hidden hover:scale-105 transition-all duration-300'>
                  <Image
                    src={company.image}
                    alt={company.name}
                    fill
                    className='object-contain'
                  />
                </div>
              ))}
            </div>
            <div className="grid md:flex flex-wrap justify-around gap-6">
              {portfolioAreas.map((area, index) => (
                <div key={index} className='flex flex-col gap-2 md:basis-[46%] first:md:basis-full'>
                  <h4 className='text-lg md:text-xl'>{area.name}</h4>
                  <p className='text-sm md:text-lg'>{area.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className='bg-primary w-full p-6 py-10 md:min-h-[25vh] flex flex-col gap-10 items-center justify-center'>
        <div className='flex flex-col gap-4'>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Image src="/images/partners/oscar-group/oscar-group-logo.png" alt="Oscar Group Logo" width={380} height={380} />
            <Icon icon="mdi:close" className='text-background text-6xl shrink-0' />
            <Image src="/logos/logo-full-white.svg" alt="Hibarr Logo" width={400} height={400} />
          </div>
          <p className='text-primary-foreground text-xl md:text-2xl text-center'>Elevated Experiences</p>
        </div>
        <div className="section py-0">
          <Video
            hls
            src="https://vz-da4cd036-d13.b-cdn.net/15e01ed4-1b90-4168-9498-932b6c0be50c/playlist.m3u8"
            fallbackMp4="https://vz-da4cd036-d13.b-cdn.net/15e01ed4-1b90-4168-9498-932b6c0be50c/play_720p.mp4"
          />
        </div>
        <div className='section py-0'>
          <h3 className='text-2xl md:text-4xl text-primary-foreground'>Benefits of this partnership</h3>
          <FAQAccordion lang={lang} />
        </div>
      </section>
    </Fragment>
  )
}
