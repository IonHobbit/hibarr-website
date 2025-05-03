import { BankPackagesPage } from '@/types/sanity.types'
import PackageCard, { BankPackage } from './_components/PackageCard'
import RegistrationForm from './_components/RegistrationForm'
import { Fragment } from 'react'
import { client } from '@/lib/sanity/client'
import { Locale } from '@/lib/i18n-config'

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
          <p className="text-md md:text-center">
            {subtitle}
          </p>
        </div>
      </section>
      <section className='section'>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {packages.map((pkg, index) => (
            <PackageCard key={index} pkg={pkg as BankPackage} />
          ))}
        </div>
      </section>
      <div className='bg-primary bg-[url("/images/wave-background.webp")] bg-blend-overlay bg-cover bg-center bg-no-repeat w-full'>
        <section id='register' className='section'>
          <div className='flex flex-col gap-3 max-w-2xl mx-auto'>
            <h2 className='text-4xl font-bold text-center text-primary-foreground'>{form?.title}</h2>
          </div>
          <RegistrationForm packages={packages as BankPackage[]} form={form} />
        </section>
      </div>
    </Fragment>
  )
}
