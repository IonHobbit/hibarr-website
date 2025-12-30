import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { WebinarPage } from '@/types/sanity.types'
import { translate } from '@/lib/translation'

type TwoForOneSectionProps = {
  data: WebinarPage['benefitsSection']
}

export default async function TwoForOneSection({ data }: TwoForOneSectionProps) {
  const title = await translate('Ready to learn how to buy two properties for the price of one?');

  return (
  <section id='two-for-one' className='bg-primary bg-[url("https://res.cloudinary.com/hibarr/image/upload/wave-background_tjiedr")] bg-blend-overlay bg-cover bg-center'>
      <div className="section grid place-items-center place-content-center gap-10 py-20 max-w-screen-md mx-auto">
        <h2 className='text-4xl md:text-5xl text-primary-foreground text-center' data-token={title.token}>{title.text}</h2>
        <Button className="w-max" variant="accent" size="lg" asChild>
          <Link href={data?.CTA?.url || ''}>{data?.CTA?.label}</Link>
        </Button>
      </div>
    </section>
  )
}
