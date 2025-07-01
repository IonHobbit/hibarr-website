import { Button } from '@/components/ui/button'
import React from 'react'
import { AboutPage } from '@/types/sanity.types';

type CallToActionSectionProps = {
  data: AboutPage['callToActionSection'];
}

export default function CallToActionSection({ data }: CallToActionSectionProps) {
  return (
    <div id='call-to-action' className='section'>
      <div className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-10 bg-primary rounded-lg p-8">
        <div className="flex flex-col gap-4">
          <h2 className="text-4xl text-primary-foreground">
            {data?.title}
          </h2>
          <p className="text-primary-foreground text-xl">
            {data?.description}
          </p>
        </div>
        <div className="flex items-center justify-end w-full">
          <Button href={data?.CTA?.url || ''} addLocaleToHref variant="accent" size="lg" className='w-max'>
            {data?.CTA?.label}
          </Button>
        </div>
      </div>

    </div>
  )
}
