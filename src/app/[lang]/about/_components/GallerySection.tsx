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
      src: "/images/gallery/1.png",
      alt: "Gallery"
    },
    {
      src: "/images/gallery/2.jpg",
      alt: "Gallery"
    },
    {
      src: "/images/gallery/3.jpg",
      alt: "Gallery"
    },
    {
      src: "/images/gallery/4.jpg",
      alt: "Gallery"
    },
    {
      src: "/images/gallery/5.png",
      alt: "Gallery"
    },
    {
      src: "/images/gallery/6.jpg",
      alt: "Gallery"
    },
  ]
  return (
    <div id='gallery' className='section'>
      <div className='max-w-screen-md mx-auto flex flex-col gap-2'>
        <h3 className='text-3xl text-center'>{data?.title}</h3>
        <p className="text-center text-muted-foreground">{data?.description}</p>
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
            <DialogContent className='min-h-[70vh] p-1'>
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
