'use client'

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { cn, generateImageUrl } from '@/lib/utils';
import { SanityImageAsset } from '@/types/sanity.types';
import Image from 'next/image';
import React, { useState, useRef } from 'react'

type ListingImagesProps = {
  images: { image: SanityImageAsset, alt: string, isCover: boolean }[];
}

export default function ListingImages({ images }: ListingImagesProps) {

  const generatedImages = images.map((_) => ({ ..._, url: _.image ? generateImageUrl(_.image)?.url() : '' })).filter((_) => _.url !== '');

  const [activeImage, setActiveImage] = useState(generatedImages[0]);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleImageHover = (image: typeof generatedImages[0]) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setActiveImage(image);

    timerRef.current = setTimeout(() => {
      setActiveImage(generatedImages[0]);
      timerRef.current = null;
    }, 10000);
  }

  if (generatedImages.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      <div className='hidden md:grid grid-cols-1 md:grid-rows-2 md:grid-cols-4 gap-3'>
        <div className={cn('relative w-full min-h-80 md:col-span-3 md:row-span-2', generatedImages.length === 1 && 'md:col-span-4 md:row-span-2 min-h-96')}>
          <Image src={activeImage.url} alt={activeImage.alt} fill sizes='100%' className='object-cover' />
        </div>
        {
          generatedImages.slice(1, 3).map((image, index) => (
            <div key={index} className='relative w-full min-h-80 '>
              <Image src={image.url} alt={image.alt} fill sizes='100%' className='object-cover' onMouseEnter={() => handleImageHover(image)} />
            </div>
          ))
        }
      </div>
      <div className="hidden md:flex items-center gap-3 overflow-x-auto">
        {
          generatedImages.slice(3).map((image, index) => (
            <div key={index} className='relative size-60 shrink-0'>
              <Image src={image.url} alt={image.alt} fill sizes='100%' className='object-cover' onMouseEnter={() => handleImageHover(image)} />
            </div>
          ))
        }
      </div>
      <Carousel className='md:hidden'>
        <CarouselContent>
          {
            generatedImages.map((image, index) => (
              <CarouselItem key={index}>
                <div className='relative w-full h-96 shrink-0'>
                  <Image src={image.url} alt={image.alt} fill sizes='100%' className='object-cover' />
                </div>
              </CarouselItem>
            ))
          }
        </CarouselContent>
        <CarouselPrevious className='absolute left-4 top-1/2 -translate-y-1/2 bg-accent rounded-full p-2 border-none' />
        <CarouselNext className='absolute right-4 top-1/2 -translate-y-1/2 bg-accent rounded-full p-2 border-none' />
      </Carousel>
    </div>
  )
}
