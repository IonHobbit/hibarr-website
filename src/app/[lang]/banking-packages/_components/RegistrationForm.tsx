import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useFormik } from 'formik';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Icon } from '@iconify/react';

import React, { Fragment, useEffect, useState } from 'react'
import { PopoverClose } from '@radix-ui/react-popover';
import migrateProperties from '@/lib/sanity/migrateProperties';


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


const minimumDeposit = {
  free: 1000,
  banking: 500,
  vip: 100,
}

type RegistrationFormProps = {
  activePackageSlug: string;
  packages: {
    slug: string;
    title: string;
    price: number;
  }[];
}

export default function RegistrationForm({ packages, activePackageSlug }: RegistrationFormProps) {
  const [activeStep, setActiveStep] = useState(0);

  const { values, handleChange, setFieldValue } = useFormik({
    initialValues: {
      package: activePackageSlug,
      salutation: 'mr',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      passport: '',
      idFront: '',
      idBack: '',
      utilityBill: '',
      fathersFirstName: '',
      fathersLastName: '',
      mothersFirstName: '',
      mothersLastName: '',
      motherMaidenName: '',
      openingBalance: '',
      futureBalance: '',
      proofOfTravel: '',
      requireRentalCar: false,
      rentalCar: 'small',
      airportTransfer: false,
    },
    onSubmit: (values) => {
      console.log(values)
    },
  })

  const sections = [
    {
      title: 'Personal Information',
      component:
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
        </div>,
    },
    {
      title: 'Next of Kin',
      component:
        <div className='flex flex-col gap-2'>
          <p className='font-medium'>Next of Kin Information</p>
          <div className="grid grid-cols-2 gap-3">
            <Input type='text' title='Fathers First Name' name='fathersFirstName' value={values.fathersFirstName} onChange={handleChange} placeholder='eg. John' />
            <Input type='text' title='Fathers Last Name' name='fathersLastName' value={values.fathersLastName} onChange={handleChange} placeholder='eg. Doe' />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input type='text' title='Mothers First Name' name='mothersFirstName' value={values.mothersFirstName} onChange={handleChange} placeholder='eg. Jane' />
            <Input type='text' title='Mothers Last Name' name='mothersLastName' value={values.mothersLastName} onChange={handleChange} placeholder='eg. Smith' />
          </div>
          <Input type='text' title='Mother&apos;s Maiden Name' name='motherMaidenName' value={values.motherMaidenName} onChange={handleChange} placeholder='eg. Doe' />
        </div>,
    },
    {
      title: 'Document Uploads',
      component:
        <div className='flex flex-col gap-2'>
          <p className='font-medium'>Document Uploads</p>
          <div className='flex flex-col gap-3'>
            <Input type='file' value={values.passport} title='Upload Passport' onChange={(e) => setFieldValue('passport', e.target.files?.[0])} placeholder='Upload Passport' />
            <div className="grid grid-cols-2 gap-2">
              <Input type='file' value={values.idFront} title='Upload ID (Front)' onChange={(e) => setFieldValue('idFront', e.target.files?.[0])} placeholder='Upload ID (Front)' />
              <Input type='file' value={values.idBack} title='Upload ID (Back)' onChange={(e) => setFieldValue('idBack', e.target.files?.[0])} placeholder='Upload ID (Back)' />
            </div>
            <Input type='file' value={values.utilityBill} title='Utility Bill' onChange={(e) => setFieldValue('utilityBill', e.target.files?.[0])} placeholder='Upload Utility Bill' />
          </div>
        </div>,
    },
    {
      title: 'Banking Details',
      component:
        <Fragment>
          <div className='flex flex-col gap-2'>
            <p className='font-medium'>Banking Details</p>
            <div className='grid grid-cols-2 gap-3'>
              <Input type='number' title='Initial Deposit' min={minimumDeposit[values.package as keyof typeof minimumDeposit]} name='openingBalance' value={values.openingBalance || minimumDeposit[values.package as keyof typeof minimumDeposit]} onChange={handleChange} />
              <Input type='number' title='Amount to be transferred' name='futureBalance' value={values.futureBalance} onChange={handleChange} />
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
        </Fragment>,
    },
  ]

  useEffect(() => {
    setFieldValue('package', activePackageSlug);
  }, [activePackageSlug]);

  return (
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
        {sections[activeStep].component}
        <div className="flex items-center gap-2 overflow-hidden justify-between">
          {activeStep > 0 && (
            <Button variant='secondary' className='w-full shrink' type='button' onClick={() => setActiveStep(activeStep - 1)}>Back</Button>
          )}
          {activeStep < sections.length - 1 && (
            <Button className='w-full shrink' type='button' onClick={() => setActiveStep(activeStep + 1)}>Next</Button>
          )}
          {activeStep === sections.length - 1 && (
            <Button className='w-full shrink' type='submit'>Register</Button>
          )}
        </div>
      </form>
    </Card>
  )
}
