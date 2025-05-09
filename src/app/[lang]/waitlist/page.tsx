import { Locale } from '@/lib/i18n-config'
import { client } from '@/lib/sanity/client'
import { generateSEOMetadata } from '@/lib/utils'
import type { WaitlistPage } from '@/types/sanity.types'
import { Metadata } from 'next'
import Image from 'next/image'
import WaitlistForm from './_components/WaitlistForm'

export async function generateMetadata(props: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await props.params;

  const { seo } = await client.fetch<WaitlistPage>(`*[_type == "waitlistPage" && language == $lang][0]{seo}`, { lang }, { cache: 'no-store' })

  return generateSEOMetadata(seo, {
    title: 'Join our Waitlist',
    keywords: [],
  })
}

export default async function WaitlistPage(
  props: {
    params: Promise<{ lang: Locale }>;
  }
) {
  const { lang } = await props.params;

  const waitlistPage = await client.fetch<WaitlistPage>(`*[_type == "waitlistPage" && language == $lang][0]`, { lang }, { cache: 'no-store' })

  const pageData = {
    title: waitlistPage?.title || 'Join the Waitlist for our',
    subtitle: waitlistPage?.subtitle || 'Facebook Group',
  }

  return (
    <section id='hero' className="relative w-full overflow-hidden px-4 sm:px-6 lg:px-8 grid place-items-center place-content-center h-screen bg-gradient-to-b from-primary via-primary/80 to-transparent">
      <div className='absolute inset-0 w-full h-full -z-10'>
        <Image src="/images/webinar-registration-background.webp" alt="Waitlist Hero" fill className='w-full h-full object-cover absolute' />
      </div>

      <div className="max-w-6xl text-center flex flex-col gap-10 px-8 bg-secondary p-6 rounded-lg">
        <div className='flex flex-col gap-2 max-w-xl mx-auto'>
          <h1 className="text-5xl md:text-5xl font-bold mb-4 text-primary">
            <span className='text-accent font-medium'>{pageData.title}</span> <br /> {pageData.subtitle}
          </h1>
          <p>Gain access to a group of like minded people who are looking to make money in the real estate market.</p>
        </div>
        <WaitlistForm formData={waitlistPage?.waitlistForm} />
      </div>
    </section>
  )
}
