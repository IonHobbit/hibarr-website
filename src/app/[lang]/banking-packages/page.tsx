'use client'

import React, { Fragment } from 'react'
import PackageCard from './_components/PackageCard'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { useFormik } from 'formik'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { PopoverClose } from '@radix-ui/react-popover'
import { Icon } from '@iconify/react'
import { useRouter } from 'next/navigation'

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

  const salutations = [
    {
      label: 'Mr',
      value: 'mr',
    },
    {
      label: 'Mrs',
      value: 'mrs',
    },
    {
      label: 'Ms',
      value: 'ms',
    },
    {
      label: 'Dr',
      value: 'dr',
    },
  ]

  const router = useRouter()

  const { values, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      package: packages[0].slug,
      salutation: 'mr',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      passport: '',
      idType: '',
      id: '',
      proofOfTravel: '',
      requireRentalCar: false,
      rentalCar: 'small',
      airportTransfer: false,
    },
    onSubmit: (values) => {
      console.log(values)
    },
  })

  const selectPackage = (slug: string) => {
    setFieldValue('package', slug)
    router.push(`/banking-packages#register`)
  }

  return (
    <Fragment>
      <section className="header-offset section">
        <div className='flex flex-col gap-3 max-w-2xl mx-auto'>
          <h1 className='text-4xl font-bold text-center'>Our Packages</h1>
          <p className="text-md md:text-center">
            At HIBARR, we provide tailored banking support for our clients in Northern Cyprus, whether you're seeking a simple account setup or an exclusive real estate-banking combination.
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
          <Card className='max-w-lg w-full mx-auto p-6'>
            <form className='flex flex-col gap-4'>
              <div className="flex items-center gap-2 rounded-sm px-3 py-2 w-max bg-primary text-primary-foreground">
                <p className='font-normal'>Package:</p>
                <Popover>
                  <PopoverTrigger className='cursor-pointer flex items-center gap-2'>
                    {values.package ? (
                      <p className='font-medium'>{packages.find((pkg) => pkg.slug === values.package)?.title} {packages.find((pkg) => pkg.slug === values.package)?.price ? `(€${packages.find((pkg) => pkg.slug === values.package)?.price.toLocaleString()})` : ''}</p>
                    ) : (
                      <p className='font-medium text-muted-foreground'>Select Package</p>
                    )}
                    <Icon icon='mdi:chevron-down' className='w-4 h-4' />
                  </PopoverTrigger>
                  <PopoverContent align='start' className='w-max flex flex-col items-start gap-2'>
                    {packages.map((pack, index) => (
                      <PopoverClose asChild key={index}>
                        <p className='cursor-pointer w-full' onClick={() => setFieldValue('package', pack.slug)}>{pack.title} {pack.price ? `(€${pack.price.toLocaleString()})` : ''}</p>
                      </PopoverClose>
                    ))}
                  </PopoverContent>
                </Popover>
              </div>
              <div className='flex flex-col gap-2'>
                <p className='font-medium'>Personal Information</p>
                <div className='flex flex-col gap-3'>
                  <div className="grid grid-cols-2 lg:grid-cols-8 gap-2">
                    <div className='col-span-2 overflow-hidden'>
                      <Select onValueChange={(value) => setFieldValue('salutation', value)}>
                        <SelectTrigger title='Salutation' className='w-full'>
                          <SelectValue placeholder='eg. Mr, Mrs, Ms, Dr' />
                        </SelectTrigger>
                        <SelectContent>
                          {salutations.map((salutation) => (
                            <SelectItem key={salutation.value} value={salutation.value}>
                              {salutation.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className='col-span-3'>
                      <Input type='text' title='First Name' name='firstName' value={values.firstName} onChange={handleChange} placeholder='eg. John' />
                    </div>
                    <div className='col-span-3'>
                      <Input type='text' title='Last Name' name='lastName' value={values.lastName} onChange={handleChange} placeholder='eg. Doe' />
                    </div>
                  </div>
                  <Input type='email' title='Email' name='email' value={values.email} onChange={handleChange} placeholder='eg. john.doe@example.com' />
                  <Input type='tel' title='Phone Number' name='phone' value={values.phone} onChange={handleChange} placeholder='eg. +905555555555' />
                </div>
              </div>
              <div className='flex flex-col gap-2'>
                <p className='font-medium'>Document Uploads</p>
                <div className='flex flex-col gap-3'>
                  <Input type='file' title='Upload Passport' placeholder='Upload Passport' />
                  <div className='grid grid-cols-3 gap-2'>
                    <Select value={values.idType} onValueChange={(value) => setFieldValue('idType', value)}>
                      <SelectTrigger title='ID Type' className='w-full'>
                        <SelectValue placeholder='eg. Driving License, Utility Bill, etc.' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='id'>Government Issued ID</SelectItem>
                        <SelectItem value='utility-bill'>Utility Bill</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="col-span-2 flex flex-col gap-2">
                      <Input type='file' title={values.idType === 'id' ? 'Upload ID (Front)' : 'Upload Utility Bill'} placeholder='Upload ID' />
                      {values.idType === 'id' && (
                        <Input type='file' title='Upload ID (Back)' placeholder='Upload Driving License (Back)' />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-2'>
                <p className='font-medium'>Travel Details</p>
                <div className='flex flex-col gap-3'>
                  <div className="flex items-start gap-2">
                    <Checkbox id="requireRentalCar" required checked={values.requireRentalCar} onClick={() => setFieldValue('requireRentalCar', !values.requireRentalCar)} />
                    <label htmlFor="requireRentalCar" className="text-xs cursor-pointer">Do you require a rental car? (Minimum rental period is 3 days)</label>
                  </div>
                  {values.requireRentalCar && (
                    <Select value={values.rentalCar} onValueChange={(value) => setFieldValue('rentalCar', value)}>
                      <SelectTrigger title='What size of car do you require?' className='w-full'>
                        <SelectValue placeholder='eg. Small, Medium, Large' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='small'>Small</SelectItem>
                        <SelectItem value='medium'>Medium</SelectItem>
                        <SelectItem value='large'>Large</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                  <Input type='file' title='Upload Proof of Travel (with dates, times, flight number & airport)'
                    placeholder='Upload Proof of Travel' />
                </div>
              </div>
              <div className='flex flex-col gap-2'>
                <p className='font-medium'>Additional Services</p>
                <div className='flex flex-col gap-3'>
                  <div className="flex items-start gap-2">
                    <Checkbox id="airportTransfer" required checked={values.airportTransfer} onClick={() => setFieldValue('airportTransfer', !values.airportTransfer)} />
                    <label htmlFor="airportTransfer" className="text-xs cursor-pointer">Do you require Airport Transfer? ({values.package === 'free' ? 'You will bear the cost' : 'Included in your package'})</label>
                  </div>
                </div>
              </div>
              <Button type='submit'>Register</Button>
            </form>
          </Card>
        </section>
      </div>
    </Fragment>
  )
}
