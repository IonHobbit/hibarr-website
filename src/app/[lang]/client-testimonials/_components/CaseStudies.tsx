'use client'

import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel'
import Video, { VideoRef } from '@/components/Video'
import { generateImageUrl } from '@/lib/utils'
import { CaseStudy } from '@/types/sanity.types'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { PortableText } from 'next-sanity'
import React, { useRef } from 'react'

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
  return (
    <Carousel opts={{ loop: true }}>
      <CarouselContent>
        {caseStudies.map((caseStudy, index) => (
          <CarouselItem key={index} className='w-full'>
            <div className='grid xl:grid-cols-7 gap-6'>
              <div className="flex flex-col items-start gap-2 xl:col-span-2 text-left">
                <div className="flex items-center gap-2">
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
                  const isHls = /\.m3u8(\?.*)?$/i.test(src);
                  let fallbackMp4: string | undefined;
                  if (isHls) {
                    // Get the fallback url (playlist/index.m3u8 -> play_720p.mp4)
                    const match = src.match(/^(.*\/)(playlist|index)\.m3u8(\?.*)?$/i);
                    if (match) {
                      const base = match[1];
                      const query = match[3] ?? '';
                      fallbackMp4 = `${base}play_720p.mp4${query}`;
                    }
                  }
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
