import React from 'react'
import Image from 'next/image'
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { AboutPage } from '@/types/sanity.types';

type GallerySectionProps = {
  data: AboutPage['gallerySection'];
}

export default function GallerySection({ data }: GallerySectionProps) {
  const gallery = [
    {
      src: "https://res.cloudinary.com/hibarr/image/upload/about-team-collaboration-analytics-office_apqzto",
      alt: "Team collaborating on analytics dashboards in the office"
    },
    {
      src: 'https://res.cloudinary.com/hibarr/image/upload/about-team-group-photo-exterior_ydobgc',
      alt: 'Hibarr team group photo taken outdoors',
    },
    {
      src: "https://res.cloudinary.com/hibarr/image/upload/about-boardroom-contract-signing_gja0yn",
      alt: "Executives reviewing and signing partnership documents in a boardroom"
    },
    {
      src: "https://res.cloudinary.com/hibarr/image/upload/about-partnership-handshake-restaurant_rdhehd",
      alt: "Business partners shaking hands in a modern restaurant after a meeting"
    },
    {
      src: 'https://res.cloudinary.com/hibarr/image/upload/about-team-meeting-boardroom_xfchbn',
      alt: 'Team meeting in a boardroom discussing strategy',
    },
    {
      src: 'https://res.cloudinary.com/hibarr/image/upload/about-leadership-team-portrait_krhorc',
      alt: 'Hibarr leadership team portrait',
    },
  ]
  return (
    <div id='gallery' className='section'>
      <div className='max-w-screen-md mx-auto flex flex-col gap-2'>
        <h3 className='text-3xl md:text-4xl text-center'>{data?.title}</h3>
        <p className="text-center text-muted-foreground md:text-lg">{data?.description}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {gallery.map((item, index) => (
          <Dialog key={index}>
            <DialogTrigger>
              <div className="group relative w-full h-96 cursor-pointer">
                <Image src={item.src} alt={item.alt} sizes='100%' fill className='object-cover' />
                <div className="absolute inset-0 bg-primary/30 grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Image src="/logos/logo.png" alt="Hibarr Logo" width={100} height={100} className='w-auto h-auto translate-y-10 group-hover:translate-y-0 transition-transform duration-300' />
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className='min-h-[70dvh] p-1'>
              <div className='flex flex-col gap-4'>
                <DialogTitle className='hidden'>{item.alt}</DialogTitle>
                <div className='relative w-full h-full overflow-hidden rounded-md'>
                  <Image src={item.src} alt={item.alt} sizes='100%' fill className='object-cover object-center' />
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  )
}
