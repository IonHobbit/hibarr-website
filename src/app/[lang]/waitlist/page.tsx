import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Locale } from '@/lib/i18n-config'
import { client } from '@/lib/sanity/client'
import { generateSEOMetadata } from '@/lib/utils'
import type { WaitlistPage } from '@/types/sanity.types'
import { Metadata } from 'next'
import Image from 'next/image'

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
    form: waitlistPage?.waitlistForm?.form || {
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      phone: 'Phone Number',
      submitButton: 'Join the Waitlist',
    },
  }

  return (
    <section id='hero' className="relative w-full overflow-hidden px-4 sm:px-6 lg:px-8 grid place-items-center place-content-center h-screen bg-gradient-to-b from-primary via-primary/80 to-transparent">
      <div className='absolute inset-0 w-full h-full -z-10'>
        <Image src="/images/webinar-registration-background.webp" alt="Waitlist Hero" fill className='w-full h-full object-cover absolute' />
      </div>

      <div className="max-w-6xl text-center flex flex-col gap-10 px-8 bg-secondary p-6 rounded-lg">
        <div className='flex flex-col gap-2'>
          <h1 className="text-5xl md:text-5xl font-bold mb-4 text-primary">
            <span className='text-accent font-medium'>{pageData.title}</span> <br /> {pageData.subtitle}
          </h1>
        </div>
        <form className='flex flex-col gap-2'>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="text"
              required
              title={pageData.form.firstName}
              name="firstName"
              placeholder="eg. John"
            />
            <Input
              type="text"
              required
              title={pageData.form.lastName}
              name="lastName"
              placeholder="eg. Doe"
            />
          </div>
          <Input
            type="email"
            required
            title={pageData.form.email}
            name="email"
            placeholder="eg. john.doe@gmail.com"
          />
          <Input
            type="tel"
            required
            title={pageData.form.phone}
            name="phoneNumber"
            placeholder="eg. +1234567890"
          />
          <Button variant='accent' className='!mt-4 uppercase font-semibold' type='submit'>
            {pageData.form.submitButton}
          </Button>
        </form>
      </div>
    </section>
  )
}
