'use client'

import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel'
import { VideoRef } from '@/components/Video'
import dynamic from 'next/dynamic'

const Video = dynamic(() => import('@/components/Video'), {
  loading: () => <div className="w-full aspect-video bg-muted animate-pulse rounded-lg" />
})
import { generateImageUrl } from '@/lib/utils'
import { CaseStudy } from '@/types/sanity.types'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { PortableText } from 'next-sanity'
import React, { useRef } from 'react'

type CaseStudiesProps = {
  caseStudies: CaseStudy[];
}

function getHlsInfo(src: string): { isHls: boolean; fallbackMp4?: string } {
  const isHls = /\.m3u8(\?.*)?$/i.test(src);
  if (!isHls) return { isHls: false };

  // playlist/index.m3u8 -> play_720p.mp4 (preserve query if present)
  const match = src.match(/^(.*\/)(playlist|index)\.m3u8(\?.*)?$/i);
  if (match) {
    const base = match[1];
    const query = match[3] ?? '';
    return { isHls: true, fallbackMp4: `${base}play_720p.mp4${query}` };
  }
  return { isHls: true };
}

export default function CaseStudies({ caseStudies }: CaseStudiesProps) {
  const videoRefs = useRef<VideoRef[]>([]);

  const handlePause = () => {
    videoRefs.current.forEach((videoRef) => {
      videoRef.pause();
    });
  }
  return (
    <Carousel opts={{ loop: true }}>
      <CarouselContent>
        {caseStudies.map((caseStudy, index) => (
          <CarouselItem key={index} className='w-full'>
            <div className='grid xl:grid-cols-7 gap-6'>
              <div className="flex flex-col items-start gap-2 xl:col-span-2 text-left">
                <div className="flex flex-col gap-1.5">
                  <h2 className="text-4xl font-medium">{caseStudy.clientName}</h2>
                  <p className="text-base text-muted-foreground">{caseStudy.jobTitle}</p>
                </div>
                <h3 className='text-lg'>{caseStudy.tagLine}</h3>
                <PortableText value={caseStudy.description || []} components={{
                  block: {
                    paragraph: ({ children }) => <p className='text-lg'>{children}</p>
                  }
                }} />
              </div>
              <div className='xl:col-span-5 flex flex-col gap-2'>
                {(() => {
                  const src = caseStudy.videoUrl || '';
                  const { isHls, fallbackMp4 } = getHlsInfo(src);
                  return (
                    <Video
                      ref={(el) => { videoRefs.current[index] = el as VideoRef }}
                      src={src}
                      poster={generateImageUrl(caseStudy.thumbnail as SanityImageSource).url()}
                      hls={isHls}
                      fallbackMp4={fallbackMp4}
                    />
                  );
                })()}
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious onMouseDown={handlePause} className='border-none translate-x-16 md:translate-x-0 bg-accent hover:bg-accent/80 cursor-pointer disabled:opacity-0' />
      <CarouselNext onMouseDown={handlePause} className='border-none -translate-x-16 md:translate-x-0 bg-accent hover:bg-accent/80 cursor-pointer disabled:opacity-0' />
    </Carousel>
  )
}
