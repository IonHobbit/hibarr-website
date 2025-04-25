'use client'

import React, { Fragment, useState } from 'react'
import PackageCard from './_components/PackageCard'
import { useRouter } from 'next/navigation'
import RegistrationForm from './_components/RegistrationForm'

export default function BankingPackagesPage() {
  const packages = [
    {
      icon: 'mdi:euro',
      slug: 'free',
      title: 'Free',
      description: 'Perfect for independent travelers who want a hassle-free start',
      price: 0,
      features: [
        'Minimum deposit: €1,000',
        'We schedule the bank appointment for you',
        'We do not accompany you to the bank',
      ],
    },
    {
      icon: 'mdi:bank',
      slug: 'banking',
      title: 'Banking Package',
      description: 'Ideal for those who value hands-on assistance and comfort',
      price: 1000,
      features: [
        'Minimum deposit: €500',
        'We schedule and accompany you to the bank',
        'Airport transfer included',
        '1 night accommodation included',
      ],
    },
    {
      icon: 'mdi:home',
      slug: 'vip',
      title: 'VIP Package',
      description: 'Best for serious buyers ready to explore real estate opportunities in North Cyprus',
      price: 5000,
      features: [
        'Minimum deposit: €100',
        'We schedule and accompany you to the bank',
        '3 nights accommodation included',
        'Airport transfer included',
        'Includes a guided property inspection tour',
        'Cost fully refundable upon purchase of a property (applied to the down payment)',
      ],
    },
  ]

  const router = useRouter();
  const [activePackageSlug, setActivePackageSlug] = useState<string>(packages[0].slug);

  const selectPackage = (slug: string) => {
    setActivePackageSlug(slug);
    router.push(`/banking-packages#register`)
  }

  return (
    <Fragment>
      <section className="header-offset section">
        <div className='flex flex-col gap-3 max-w-2xl mx-auto'>
          <h1 className='text-4xl font-bold text-center'>Our Packages</h1>
          <p className="text-md md:text-center">
            At HIBARR, we provide tailored banking support for our clients in Northern Cyprus, whether you&apos;re seeking a simple account setup or an exclusive real estate-banking combination.
          </p>
        </div>
      </section>
      <section className='section'>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {packages.map((pkg) => (
            <PackageCard key={pkg.title} {...pkg} onSelect={() => selectPackage(pkg.slug)} />
          ))}
        </div>
      </section>
      <div className='bg-primary'>
        <section id='register' className='section'>
          <div className='flex flex-col gap-3 max-w-2xl mx-auto'>
            <h2 className='text-4xl font-bold text-center text-primary-foreground'>Register for a package</h2>
          </div>
          <RegistrationForm packages={packages} activePackageSlug={activePackageSlug} />
        </section>
      </div>
    </Fragment>
  )
}
