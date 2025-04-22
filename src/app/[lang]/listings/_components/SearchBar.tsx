'use client';

import { Select } from '@/components/Select'
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { count, features, locations, propertyTypes } from '@/lib/mockdata';
import { cn } from '@/lib/utils';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useFormik } from 'formik';
import { useState } from 'react';
import useURL from '@/hooks/useURL';

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);

  const { searchParams, replaceParams } = useURL();

  const [min, max] = [0, 1000000];

  const { values, setFieldValue, handleSubmit, resetForm } = useFormik({
    initialValues: {
      location: searchParams.get('location')?.split(',') || [],
      propertyType: searchParams.get('propertyType')?.split(',') || [],
      bedrooms: searchParams.get('bedrooms') || '',
      bathrooms: searchParams.get('bathrooms') || '',
      features: searchParams.get('features')?.split(',') || [],
      minPrice: parseInt(searchParams.get('minPrice') || min.toString()),
      maxPrice: parseInt(searchParams.get('maxPrice') || max.toString()),
    },
    onSubmit: (values) => {
      replaceParams([
        { key: 'location', value: values.location.join(',') },
        { key: 'propertyType', value: values.propertyType.join(',') },
        { key: 'bedrooms', value: values.bedrooms },
        { key: 'bathrooms', value: values.bathrooms },
        { key: 'features', value: values.features.join(',') },
        { key: 'minPrice', value: values.minPrice },
        { key: 'maxPrice', value: values.maxPrice },
      ].filter(({ value }) => value !== undefined && value !== ''), 'listings')
    }
  })

  const setLocation = (value: string | string[]) => {
    if (Array.isArray(value)) {
      setFieldValue('location', value[value.length - 1] === '' ? [''] : value.filter(Boolean));
    } else {
      setFieldValue('location', value);
    }
    setIsOpen(false);
  }

  const setPropertyType = (value: string | string[]) => {
    if (Array.isArray(value)) {
      setFieldValue('propertyType', value[value.length - 1] === '' ? [''] : value.filter(Boolean));
    } else {
      setFieldValue('propertyType', value);
    }
    setIsOpen(false);
  }

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="flex flex-col items-center gap-4 px-4 z-10">
      <Tabs defaultValue='all'>
        <TabsList>
          <TabsTrigger value='all'>All</TabsTrigger>
          <TabsTrigger value='buy'>For Sale</TabsTrigger>
          <TabsTrigger value='rent'>For Rent</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className={cn('bg-secondary w-full rounded-md p-4 flex flex-col items-center gap-4 transition-all duration-300 overflow-hidden')}>
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full">
          <div className="flex flex-wrap md:items-center gap-4 md:overflow-x-auto w-full">
            <Select placeholder='Location' options={locations} value={values.location} onSelect={setLocation} />
            <Select placeholder='Property type' options={propertyTypes} value={values.propertyType} onSelect={setPropertyType} />
            <Select placeholder='Bedrooms' options={count.map(_ => ({ ..._, label: `${_.label} Bedrooms` }))} value={values.bedrooms} onSelect={(value) => setFieldValue('bedrooms', value)} />
            <Select placeholder='Bathrooms' options={count.map(_ => ({ ..._, label: `${_.label} Bathrooms` }))} value={values.bathrooms} onSelect={(value) => setFieldValue('bathrooms', value)} />
            <Select placeholder='Features' options={features} value={values.features} onSelect={(value) => setFieldValue('features', value)} />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 w-full">
            <Button type='button' onClick={toggleOpen} className='hidden cursor-pointer rounded xl:flex'>
              <Icon icon={isOpen ? "mdi:minus" : "mdi:plus"} className='w-4 h-4 text-accent-foreground' />
              Price Range
            </Button>
            {(values.location.length > 0 || values.propertyType.length > 0 || parseInt(values.bedrooms) > 0 || parseInt(values.bathrooms) > 0 || values.features.length > 0) && (
              <Button type='button' onClick={() => resetForm()} className='rounded w-full xl:w-auto'>
                Reset Filters
              </Button>
            )}
            <Button variant='accent' type='submit' className='rounded w-full xl:w-auto'>
              <Icon icon="mdi:magnify" className='w-4 h-4' />
              Search
            </Button>
          </div>
        </form>
        {isOpen && (
          <div className='max-w-lg w-full mx-auto flex flex-col items-center gap-2'>
            <p className='text-sm text-muted-foreground flex items-center gap-2'>
              From <span className='font-semibold text-primary text-lg'>€{values.minPrice.toLocaleString()}</span> to <span className='font-semibold text-primary text-lg'>€{values.maxPrice.toLocaleString()}</span>
            </p>
            <Slider
              defaultValue={[values.minPrice, values.maxPrice]}
              onValueChange={(value) => {
                setFieldValue('minPrice', value[0]);
                setFieldValue('maxPrice', value[1]);
              }}
              min={min}
              max={max}
            />
          </div>
        )}
      </div>
    </div>
  )
}
