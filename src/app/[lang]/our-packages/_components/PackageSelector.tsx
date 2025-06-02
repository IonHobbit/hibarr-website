'use client'

import React, { Fragment, useMemo, useState } from 'react'
import PackageCard from './PackageCard'
import { BankPackage } from './PackageCard'
import { BankPackagesPage } from '@/types/sanity.types'
import RegistrationForm from './RegistrationForm'

type PackageSelectorProps = {
  packages: BankPackage[]
  form: BankPackagesPage['form']
}

export default function PackageSelector({ packages, form }: PackageSelectorProps) {
  const [activePackageSlug, setActivePackageSlug] = useState<string>(packages[0].slug || 'basic-package')

  const activePackage = useMemo(() => {
    return packages.find((pkg) => pkg.slug === activePackageSlug) as BankPackage
  }, [packages, activePackageSlug])

  const selectPackage = (slug: string) => {
    setActivePackageSlug(slug)
  }

  return (
    <Fragment>
      <section className='section'>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {packages.map((pkg, index) => (
            <PackageCard key={index} pkg={pkg as BankPackage} selectPackage={selectPackage} />
          ))}
        </div>
      </section>
      <div className='bg-primary bg-[url("/images/wave-background.webp")] bg-blend-overlay bg-cover bg-center bg-no-repeat w-full min-h-[80vh]'>
        <section id='register' className='section'>
          <div className='flex flex-col gap-3 max-w-2xl mx-auto'>
            <h2 className='text-4xl font-bold text-center text-primary-foreground'>{form?.title}</h2>
          </div>
          <RegistrationForm packages={packages as BankPackage[]} form={form} activePackage={activePackage} selectPackage={selectPackage} />
        </section>
      </div>
    </Fragment>
  )
}
