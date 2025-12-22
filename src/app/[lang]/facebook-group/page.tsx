import { Locale } from '@/lib/i18n-config'
import { fetchRawSanityData, fetchSanityData } from '@/lib/third-party/sanity.client'
import { generateSEOMetadata } from '@/lib/utils'
import { getHreflangAlternates } from '@/lib/seo-metadata'
import type { WaitlistPage, SeoMetaFields } from '@/types/sanity.types'
import { Metadata } from 'next'
import Image from 'next/image'
import WaitlistForm from './_components/WaitlistForm'
import { translate } from '@/lib/translation'
import WhyJoinSectionRawText from './_components/WhyJoinSectionRawText'

import { seoTitles } from '@/lib/seo-titles';
import { seoDescriptions } from '@/data/seo-descriptions'

export async function generateMetadata(props: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await props.params;

  const { seo } = await fetchRawSanityData<WaitlistPage>(`*[_type == "waitlistPage" && language == $lang][0]{seo}`, { lang })

  return generateSEOMetadata({ ...seo, metaTitle: seoTitles[lang].facebookGroup, metaDescription: seoDescriptions[lang].facebookGroup } as SeoMetaFields, {
    alternates: getHreflangAlternates('/facebook-group', lang)
  })
}

export default async function FacebookGroupPage(
  props: {
    params: Promise<{ lang: Locale }>;
  }
) {
  const { lang } = await props.params;

  const waitlistPage = await fetchSanityData<WaitlistPage>(`*[_type == "waitlistPage" && language == $lang][0]`, { lang }, { cache: 'no-store' })

  const formTitle = await translate('Join the')
  const formSubtitle = await translate(waitlistPage?.subtitle || 'Facebook Group')

  const pageData = {
    title: formTitle.text,
    subtitle: formSubtitle.text,
  }

  const title = await translate('Join the #1 Private Group for North Cyprus Real Estate Buyers & Relocators')
  const subtext = await translate('Gain access to a group of like minded people who are looking to make money in the markets.')

  return (
    <section id='hero' className="relative w-full overflow-hidden px-4 sm:px-6 lg:px-8 grid place-items-center place-content-center min-h-screen bg-gradient-to-b from-primary via-primary/80 to-transparent">
      <div className='absolute inset-0 w-full h-full -z-10'>
        <Image src="https://res.cloudinary.com/hibarr/image/upload/webinar-registration-background_m3p9kq" alt="Waitlist Hero" fill className='w-full h-full object-cover absolute' />
      </div>

      <div className="section grid grid-cols-1 lg:grid-cols-2 place-items-center gap-10 my-28">
        <div className='flex flex-col gap-4 lg:col-span-2 max-w-5xl mx-auto'>
          <h1 className='text-4xl md:text-6xl font-bold mb-4 text-primary-foreground text-center'>{title.text}</h1>

          {/* <div className='flex flex-col gap-2'>
            <p className='text-primary-foreground text-xl text-left'>{subtext1.text}</p>
            <p className='text-primary-foreground text-xl text-left'>{subtext2.text}</p>
          </div> */}
        </div>
        <div className="flex flex-col gap-4 w-full max-w-2xl mx-auto">
          {/* <WhyJoinSection /> */}
          {/* <WhyJoinSectionText /> */}
          <WhyJoinSectionRawText />
        </div>

        <div className='flex flex-col gap-4'>
          <div className="text-center flex flex-col gap-10 px-8 bg-secondary p-6 rounded-lg h-max">
            <div className='flex flex-col gap-2 max-w-xl mx-auto'>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
                <span className='text-accent font-medium'>{pageData.title}</span> {pageData.subtitle}
              </h1>
              <p data-token={subtext.token}>{subtext.text}</p>
            </div>
            <WaitlistForm formData={waitlistPage?.waitlistForm} />
          </div>
        </div>
      </div>
    </section>
  )
}