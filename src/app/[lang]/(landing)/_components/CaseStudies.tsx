'use client';

import Video from '@/components/Video'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { VideoRef } from '@/components/Video';
import React, { useRef } from 'react'
import { generateImageUrl } from '@/lib/utils';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { CaseStudy } from '@/types/sanity.types';

type CaseStudiesProps = {
  caseStudies: CaseStudy[];
}

export default function CaseStudies({ caseStudies }: CaseStudiesProps) {

  const videoRefs = useRef<VideoRef[]>([]);

  const handlePause = () => {
    videoRefs.current.forEach((videoRef) => {
      videoRef.pause();
    });
  }

  const handleNavigation = (e: React.MouseEvent<HTMLButtonElement>) => {
    handlePause();
  }

  return (
    <Carousel opts={{ loop: true }}>
      <CarouselContent>
        {caseStudies.map((caseStudy, index) => (
          <CarouselItem key={index}>
            <Video
              ref={(el) => { videoRefs.current[index] = el as VideoRef }}
              src={caseStudy.videoUrl ?? ''}
              poster={generateImageUrl(caseStudy.thumbnail as SanityImageSource).url()}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious onMouseDown={handlePause} className='border-none translate-x-16 md:translate-x-0 bg-accent hover:bg-accent/80 cursor-pointer disabled:opacity-0' />
      <CarouselNext onMouseDown={handlePause} className='border-none -translate-x-16 md:translate-x-0 bg-accent hover:bg-accent/80 cursor-pointer disabled:opacity-0' />
    </Carousel>
  )
}
