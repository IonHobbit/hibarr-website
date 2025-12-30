'use client'

import React, { Fragment, useMemo, useState } from 'react'
import PackageCard from './PackageCard'
import { BankPackage } from './PackageCard'
import { BankPackagesPage } from '@/types/sanity.types'
import RegistrationForm from './RegistrationForm'


import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export type EnrichedPackageContent = {
  description: string;
  whoIsItFor: string;
  benefits: string[];
  faqs: Array<{ question: string; answer: string }>;
};

type PackageSelectorProps = {
  packages: BankPackage[]
  form: BankPackagesPage['form']
  enrichedContent?: Record<string, EnrichedPackageContent>
}

export default function PackageSelector({ packages, form, enrichedContent }: PackageSelectorProps) {
  const [activePackageSlug, setActivePackageSlug] = useState<string>(packages[0].slug || 'basic-package')

  const activePackage = useMemo(() => {
    return packages.find((pkg) => pkg.slug === activePackageSlug) as BankPackage
  }, [packages, activePackageSlug])

  const enriched = enrichedContent?.[activePackageSlug];

  const selectPackage = (slug: string) => {
    setActivePackageSlug(slug)
  }

  return (
    <Fragment>
      <section className='section'>
        <h2 className="sr-only">Available Packages</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {packages.map((pkg, index) => (
            <PackageCard key={index} pkg={pkg as BankPackage} selectPackage={selectPackage} />
          ))}
        </div>
      </section>

      {enriched && (
        <section className='section py-10 bg-muted/30 rounded-lg max-w-5xl mx-auto my-10 px-6'>
          <div className='flex flex-col gap-8'>
            <div>
              <h2 className='text-3xl font-bold mb-4'>{activePackage?.title} Details</h2>
              <p className='text-lg leading-relaxed'>{enriched.description}</p>
            </div>

            <div className='grid md:grid-cols-2 gap-10'>
              <div className='flex flex-col gap-4'>
                <h3 className='text-xl font-bold text-primary'>Who Is It For?</h3>
                <p className='text-muted-foreground'>{enriched.whoIsItFor}</p>
                
                <h3 className='text-xl font-bold text-primary mt-4'>Key Benefits</h3>
                <ul className='space-y-2'>
                  {enriched.benefits.map((benefit, i) => (
                    <li key={i} className='flex gap-2 items-start'>
                      <div className='size-1.5 bg-primary mt-2 rounded-full shrink-0' />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className='text-xl font-bold text-primary mb-4'>Frequently Asked Questions</h3>
                <Accordion type='single' collapsible className="w-full">
                  {enriched.faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className='text-left'>{faq.question}</AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </section>
      )}

      <div className='bg-primary bg-[url("https://res.cloudinary.com/hibarr/image/upload/wave-background_tjiedr")] bg-blend-overlay bg-cover bg-center bg-no-repeat w-full min-h-[80dvh]'>
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
