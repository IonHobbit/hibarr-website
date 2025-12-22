import { BankPackagesPage } from '@/types/sanity.types'
import { BankPackage } from './_components/PackageCard'
import { Fragment, Suspense } from 'react'
import { fetchSanityData } from '@/lib/third-party/sanity.client'
import { Locale } from '@/lib/i18n-config'
import { seoH1s } from '@/lib/seo-h1'
import PackageSelector, { EnrichedPackageContent } from './_components/PackageSelector'
import { Metadata } from 'next'
import { seoTitles } from '@/lib/seo-titles'
import { generateSEOMetadata } from '@/lib/utils'
import { seoDescriptions } from '@/data/seo-descriptions'
import { SeoMetaFields } from '@/types/sanity.types'
import { EXPANDED_CONTENT } from '@/data/expanded-content'

export async function generateMetadata(props: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await props.params;
  return generateSEOMetadata({ metaTitle: seoTitles[lang].packages, metaDescription: seoDescriptions[lang].packages } as SeoMetaFields)
}

export default async function BankingPackagesPage(
  props: {
    params: Promise<{ lang: Locale }>;
  }
) {
  const { lang } = await props.params;

  const bankingPackagesPage = await fetchSanityData<BankPackagesPage>(`*[_type == "bankPackagesPage"  && language == $lang][0]`, { lang: lang || 'de' })

  const { packages = [], subtitle, form } = bankingPackagesPage;

  const enrichedContent = EXPANDED_CONTENT[lang]?.packages || EXPANDED_CONTENT['en'].packages;

  return (
    <Fragment>
      <section className="header-offset section">
        <div className='flex flex-col gap-3 max-w-2xl mx-auto'>
          <h1 className='text-4xl font-bold text-center'>{seoH1s.packages[lang]}</h1>
          <p className="text-md text-center">
            {subtitle}
          </p>
        </div>
      </section>
      <SuspendedPackageSelector packages={packages as BankPackage[]} form={form} enrichedContent={enrichedContent} />
    </Fragment>
  )
}

const SuspendedPackageSelector = (props: { packages: BankPackage[], form: BankPackagesPage['form'], enrichedContent: Record<string, EnrichedPackageContent> }) => {
  const { packages, form, enrichedContent } = props;

  return (
    <Suspense fallback={null}>
      <PackageSelector packages={packages as BankPackage[]} form={form} enrichedContent={enrichedContent} />
    </Suspense>
  )
}
