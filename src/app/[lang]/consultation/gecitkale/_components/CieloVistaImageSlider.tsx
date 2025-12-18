'use client'

import Image from 'next/image'
import React from 'react'
import Slider, { Settings } from 'react-slick'

export default function CieloVistaImageSlider() {
  const settings: Settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    dots: false,
  }

  const images = [
    'https://res.cloudinary.com/hibarr/image/upload/v1766086575/15_vallsy.webp',
    'https://res.cloudinary.com/hibarr/image/upload/v1766086572/16_ur1gbs.webp',
    'https://res.cloudinary.com/hibarr/image/upload/v1766086548/8_a8k0eg.webp',
    'https://res.cloudinary.com/hibarr/image/upload/v1766086548/13_kpecma.webp',
    'https://res.cloudinary.com/hibarr/image/upload/v1766086547/2_aav7h5.webp',
    'https://res.cloudinary.com/hibarr/image/upload/v1766086547/11_fjsddq.webp',
    'https://res.cloudinary.com/hibarr/image/upload/v1766086546/4_tsfsqt.webp',
  ]

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
