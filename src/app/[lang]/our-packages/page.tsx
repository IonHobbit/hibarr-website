import { BankPackagesPage } from '@/types/sanity.types'
import { BankPackage } from './_components/PackageCard'
import { Fragment, Suspense } from 'react'
import { fetchSanityData } from '@/lib/third-party/sanity.client'
import { Locale } from '@/lib/i18n-config'
import PackageSelector from './_components/PackageSelector'
import { Metadata } from 'next'
import { seoTitles } from '@/lib/seo-titles'

export async function generateMetadata(props: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await props.params;
  return {
    title: seoTitles[lang].packages
  }
}

export default async function BankingPackagesPage(
  props: {
    params: Promise<{ lang: Locale }>;
  }
) {
  const { lang } = await props.params;

  const bankingPackagesPage = await fetchSanityData<BankPackagesPage>(`*[_type == "bankPackagesPage"  && language == $lang][0]`, { lang: lang || 'de' })

  const { packages = [], title, subtitle, form } = bankingPackagesPage;

  return (
    <Fragment>
      <section className="header-offset section">
        <div className='flex flex-col gap-3 max-w-2xl mx-auto'>
          <h1 className='text-4xl font-bold text-center'>{title}</h1>
          <p className="text-md text-center">
            {subtitle}
          </p>
        </div>
      </section>
      <SuspendedPackageSelector packages={packages as BankPackage[]} form={form} />
    </Fragment>
  )
}

const SuspendedPackageSelector = (props: { packages: BankPackage[], form: BankPackagesPage['form'] }) => {
  const { packages, form } = props;

  return (
    <Suspense fallback={null}>
      <PackageSelector packages={packages as BankPackage[]} form={form} />
    </Suspense>
  )
}
