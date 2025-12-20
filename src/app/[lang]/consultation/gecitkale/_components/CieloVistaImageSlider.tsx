'use client'

import { gecitkaleConsultationContent } from '@/lib/content/gecitkale-consultation'
import { Locale } from '@/lib/i18n-config'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React from 'react'
import Slider, { Settings } from 'react-slick'

export default function CieloVistaImageSlider() {
  const { lang } = useParams<{ lang: Locale }>();
  const content = gecitkaleConsultationContent[lang] ?? gecitkaleConsultationContent.en;

  const settings: Settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    dots: false,
  }

  const images = content.images;

  return (
    <div className="rounded-lg border border-white/10 overflow-hidden h-60 md:h-80">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className='relative w-full h-60 md:h-80'>
            <Image alt={`Cielo Vista Image ${index + 1}`} src={image} fill sizes='100%' className='w-full h-full object-cover' />
          </div>
        ))}
      </Slider>
    </div>
  )
}
