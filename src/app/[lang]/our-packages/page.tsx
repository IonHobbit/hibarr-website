import { BankPackagesPage } from '@/types/sanity.types'
import { BankPackage } from './_components/PackageCard'
import { Fragment } from 'react'
import { client } from '@/lib/sanity/client'
import { Locale } from '@/lib/i18n-config'
import PackageSelector from './_components/PackageSelector'

export default async function BankingPackagesPage(
  props: {
    params: Promise<{ lang: Locale }>;
  }
) {
  const { lang } = await props.params;

  const bankingPackagesPage = await client.fetch<BankPackagesPage>(`*[_type == "bankPackagesPage"  && language == $lang][0]`, { lang: lang || 'de' }, { cache: 'no-cache' })

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
      <PackageSelector packages={packages as BankPackage[]} form={form} />
    </Fragment>
  )
}
