import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { WebinarPage } from '@/types/sanity.types'

type TwoForOneSectionProps = {
  data: WebinarPage['benefitsSection']
}

export default function TwoForOneSection({ data }: TwoForOneSectionProps) {
  return (
    <section id='two-for-one' className='bg-primary bg-[url("/images/wave-background.webp")] bg-blend-overlay bg-cover bg-center'>
      <div className="sectiion grid place-items-center place-content-center gap-10 py-10 max-w-screen-md mx-auto">
        <h3 className='text-4xl text-primary-foreground text-center'>Ready to learn how to buy two properties for the price of one?</h3>
        <Button className="w-max" variant="accent" size="lg" asChild>
          <Link href={data?.CTA?.url ?? ''}>{data?.CTA?.label}</Link>
        </Button>
      </div>
    </section>
  )
}
