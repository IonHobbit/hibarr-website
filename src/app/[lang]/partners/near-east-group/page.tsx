import { Icon } from '@iconify/react'
import { Metadata } from 'next'
import Image from 'next/image'
import React, { Fragment } from 'react'
import FAQAccordion from '../../_components/FAQAccordion'
import { Locale } from '@/lib/i18n-config'

export const metadata: Metadata = {
  title: 'Near East Group',
  description: 'Building Futures, One Property at a Time – Near East Group.',
}

export default async function NearEastGroup(
  props: {
    params: Promise<{ lang: Locale }>;
  }
) {
  const { lang } = await props.params;

  const portfolioCompanies = [
    {
      name: 'Near East University',
      image: 'https://res.cloudinary.com/hibarr/image/upload/near-east-university_x9d7ss',
    },
    {
      name: 'Near East Bank',
      image: 'https://res.cloudinary.com/hibarr/image/upload/near-east-bank_sslkyi',
    },
    {
      name: 'Near East Technology',
      image: 'https://res.cloudinary.com/hibarr/image/upload/near-east-technology_rphsjv',
    },
    {
      name: 'Near East Investment',
      image: 'https://res.cloudinary.com/hibarr/image/upload/near-east-investment_u6bgx4',
    },
  ]

  const portfolioAreas = [
    {
      name: 'Education',
      description: 'Near East University is a leading institution offering diverse academic programs and state-of-the-art facilities, preparing students for global success.',
    },
    {
      name: 'Banking & Insurance',
      description: 'Near East Bank offers innovative financial solutions, including loans, savings accounts, and medical insurance, tailored to meet your needs.',
    },
    {
      name: 'Medical Care',
      description: 'Near East Hospital provides advanced healthcare services with cutting-edge technology and expert professionals, ensuring top-quality patient care.',
    }
  ]

  return (
    <Fragment>
  <section id='root' className="relative grid place-items-center place-content-center h-[60vh] bg-[url('https://res.cloudinary.com/hibarr/image/upload/near-east-group-hero_cotcgf')] bg-cover bg-center">
        <div className="max-w-2xl text-center flex flex-col gap-10 px-4 z-10">
          <div className='flex flex-col items-center gap-6'>
            <Image src="https://res.cloudinary.com/hibarr/image/upload/near-east-group-logo_js67p5" alt="Near East Group Logo" width={280} height={280} />

            <p className="text-md md:text-2xl text-background">
              Building Futures, One Property at a Time – <span className='font-bold'>Near East Group.</span>
            </p>
          </div>
        </div>
        <div className='absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/40 to-transparent'></div>
      </section>
      <section className='section md:py-20'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl md:text-4xl'>
              About Near East Group
            </h2>
            <p className='text-md md:text-lg'>
              The Near East Group is a leading conglomerate based in Cyprus, renowned for its commitment to excellence, innovation, and community development. With a diverse portfolio spanning education, healthcare, banking, and more, the Near East Group has established itself as a cornerstone of progress in the region.
            </p>
            <h3 className='text-xl md:text-2xl'>Our Legacy</h3>
            <p className='text-md md:text-lg'>
              Founded with a vision to create a better future, the Near East Group has grown into a multifaceted organization that touches the lives of thousands every day. Our journey began with the establishment of <span className='font-semibold'>Near East University</span>, one of the most prestigious higher education institutions in the Eastern Mediterranean. Today, we continue to expand our reach, delivering world-class services across various sectors.
            </p>
          </div>
          <div className='flex flex-col gap-6'>
            <h3 className='text-xl md:text-2xl'>Discover the Diverse Portfolio of Near East Group</h3>
            <div className='grid sm:grid-cols-2 md:grid-cols-2 gap-6'>
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
            <Image src="https://res.cloudinary.com/hibarr/image/upload/near-east-group-logo_js67p5" alt="Near East Group Logo" width={140} height={140} />
            <Icon icon="mdi:close" className='text-background text-6xl shrink-0' />
            <Image src="/logos/logo-full-white.svg" alt="Hibarr Logo" width={400} height={160} />
          </div>
          <p className='text-primary-foreground text-xl md:text-2xl text-center'>Transforming Futures, Delivering Excellence</p>
        </div>
        <div className="section py-0">
          <iframe className='w-full h-full object-cover aspect-video rounded-lg overflow-hidden' src="https://www.youtube-nocookie.com/embed/KDPnXIJBDdQ?si=YeSXujsHWIAGxTNR" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
        <div className='section py-0'>
          <h3 className='text-2xl md:text-4xl text-primary-foreground'>Benefits of this partnership</h3>
          <FAQAccordion lang={lang} />
        </div>
      </section>
    </Fragment >
  )
}
