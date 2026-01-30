'use client';

import { Select } from '@/components/Select'
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { count, locations, propertyTypes } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/icons';
import { useFormik } from 'formik';
import { Suspense } from 'react';
import useURL from '@/hooks/useURL';
import { decryptJSON, shortenAndEncryptJSON, TOKEN_SECRET } from '@/lib/encryptor';
import { Filters } from '@/hooks/useListings';
// import usePropertyTypes from '@/hooks/usePropertyTypes';

export default function SearchBar() {
  // const [isOpen, setIsOpen] = useState(false);

  const { searchParams, replaceParams, clearParams } = useURL();

  // const features = featureHook.data?.map(({ name, id }) => ({ label: name, value: id })).filter(({ value }) => Boolean(value)) || [];
  // const propertyTypes = propertyTypesHook.data?.map(({ name, id }) => ({ label: name, value: id })).filter(({ value }) => Boolean(value)) || [];

  const q = searchParams.get('q') || '';
  const filters: Filters = q ? decryptJSON(q, TOKEN_SECRET) || {} : {};

  const [min, max] = [0, 1000000];

  const { values, setFieldValue, handleSubmit, resetForm } = useFormik({
    initialValues: {
      status: filters.status || '',
      city: filters.city || '',
      property_type: filters.property_type || '',
      sales_type: filters.sales_type || '',
      fields: filters.fields || [],
      // location: filters.location || [],
      // propertyType: filters.propertyType || [],
      // listingType: filters.listingType || '',
      bedrooms: filters.bedrooms || '0',
      bathrooms: filters.bathrooms || '0',
      features: filters.features || [],
      minPrice: parseInt((filters.minPrice ?? min).toString()),
      maxPrice: parseInt((filters.maxPrice ?? max).toString())
    },
    onSubmit: (values) => {
      const value = shortenAndEncryptJSON(values, TOKEN_SECRET);
      if (!value) return;
      replaceParams({ key: 'q', value }, 'listings')
    }
  })

  const setLocation = (value: string | string[]) => {
    if (Array.isArray(value)) {
      setFieldValue('city', value[value.length - 1] === '' ? [''] : value.filter(Boolean));
    } else {
      setFieldValue('city', value);
    }
    // setIsOpen(false);
  }

  const setPropertyType = (value: string | string[]) => {
    if (Array.isArray(value)) {
      setFieldValue('property_type', value[value.length - 1] === '' ? [''] : value.filter(Boolean));
    } else {
      setFieldValue('property_type', value);
    }
    // setIsOpen(false);
  }

  const setListingType = (value: string) => {
    setFieldValue('sales_type', value);
    handleSubmit();
  }

  const clearFilters = () => {
    resetForm();
    handleSubmit();
    setTimeout(() => {
      clearParams();
    }, 4);
  }

  // const toggleOpen = () => setIsOpen(!isOpen); 

  return (
    <div className="flex flex-col items-center gap-4 px-4 z-10">
      <Tabs value={values.sales_type} onValueChange={(value) => setListingType(value)}>
        <TabsList className="flex-col sm:flex-row">
          <TabsTrigger value='' className='w-full sm:w-auto text-sm'>All</TabsTrigger>
          <TabsTrigger value='For Sale' className='w-full sm:w-auto text-sm'>For Sale</TabsTrigger>
          <TabsTrigger value='For Rent' className='w-full sm:w-auto text-sm'>For Rent</TabsTrigger>
          <TabsTrigger value='For Daily Rental' className='w-full sm:w-auto text-sm'>For Daily Rental</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className={cn('bg-secondary w-full rounded-md p-4 flex flex-col items-center gap-4 transition-all duration-300 overflow-hidden')}>
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full">
          <div className="flex flex-wrap md:items-center gap-4 md:overflow-x-auto w-full">
            <Select placeholder='City' options={locations} value={values.city} onSelect={setLocation} />
            <Select placeholder='Property type' options={propertyTypes} value={values.property_type} onSelect={setPropertyType} />
            <Select placeholder='Bedrooms' options={count.map(_ => ({ ..._, label: `${_.label} Bedrooms` }))} value={values.bedrooms} onSelect={(value) => setFieldValue('bedrooms', value)} />
            <Select placeholder='Bathrooms' options={count.map(_ => ({ ..._, label: `${_.label} Bathrooms` }))} value={values.bathrooms} onSelect={(value) => setFieldValue('bathrooms', value)} />
            {/* <Select placeholder='Features' options={features} value={values.features} onSelect={(value) => setFieldValue('features', value)} /> */}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 w-full">
            {/* <Button type='button' onClick={toggleOpen} className='hidden cursor-pointer rounded xl:flex'>
              <Icon icon={isOpen ? "mdi:minus" : "mdi:plus"} className='w-4 h-4 text-accent-foreground' />
              Price Range
            </Button> */}
            {(values.city || values.property_type || parseInt(values.bedrooms) > 0 || parseInt(values.bathrooms) > 0 || values.features.length > 0) && (
              <Button type='button' onClick={clearFilters} className='rounded w-full xl:w-auto'>
                Clear Filters
              </Button>
            )}
            <Button variant='accent' type='submit' className='rounded w-full xl:w-auto'>
              <Icon icon="mdi:magnify" className='w-4 h-4' />
              Search
            </Button>
          </div>
        </form>
        {/* {isOpen && (
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
        )} */}
      </div>
    </div>
  )
}


export const SuspendedSearchBar = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchBar />
    </Suspense>
  )
}