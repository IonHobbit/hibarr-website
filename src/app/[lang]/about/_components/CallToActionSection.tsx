import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { Dictionary } from '@/lib/dictionary'

type CallToActionSectionProps = {
  dictionary: Dictionary
}

export default function CallToActionSection({ dictionary }: CallToActionSectionProps) {
  return (
    <div id='call-to-action' className='section'>
      <div className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-4 bg-primary rounded-lg p-8">
        <div className="flex flex-col gap-4">
          <h2 className="text-4xl text-primary-foreground">
            {dictionary.about.callToAction.title}
          </h2>
          <p className="text-primary-foreground text-xl">
            {dictionary.about.callToAction.description}
          </p>
        </div>
        <div className="flex items-center justify-end w-full">
          <Button variant="accent" size="lg" className='w-max' asChild>
            <Link href={dictionary.about.callToAction.cta.href}>
              {dictionary.about.callToAction.cta.text}
            </Link>
          </Button>
        </div>
      </div>

    </div>
  )
}
