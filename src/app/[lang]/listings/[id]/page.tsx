import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { listings } from '@/lib/mockdata';
import React, { Fragment } from 'react'
import ListingImages from './_components/ListingImages';

export async function generateMetadata(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  const property = listings.find((property) => property.id === id);

  if (!property) {
    return { title: 'Property' };
  }
  return { title: property.name };
}

export default async function PropertyPage(
  props: {
    params: Promise<{ id: string }>;
  }
) {
  const { id } = await props.params;

  const property = listings.find((property) => property.id === id);

  if (!property) {
    return <section className='section flex items-center justify-center h-screen'>Property not found</section>;
  }

  return (
    <Fragment>
      <section className='section mt-[76px] gap-6'>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href='/'>Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href='/listings'>Listings</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/listings/${property.id}`}>{property.name}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex items-start flex-wrap gap-4 justify-between">
          <h1 className='text-4xl font-bold'>{property.name}</h1>
          <p className='text-2xl font-bold'>£{property.price.toLocaleString()}</p>
        </div>
        <div className="flex items-center gap-2">
          {
            property.labels.map((label, index) => (
              <div key={index} className='bg-primary p-1 px-3'>
                <p className='text-sm text-primary-foreground font-medium uppercase'>{label}</p>
              </div>
            ))
          }
        </div>
        <ListingImages images={property.images} name={property.name} />
        <div className="grid grid-cols-2 md:divide-x md:grid-cols-4 gap-3">
          <div className="flex flex-col items-center gap-2">
            <p className='text-sm font-medium'>Bedrooms</p>
            <p className='text-lg font-semibold'>{property.bedrooms}</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className='text-sm font-medium'>Bathrooms</p>
            <p className='text-lg font-semibold'>{property.bathrooms}</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className='text-sm font-medium'>Size</p>
            <p className='text-lg font-semibold'>{property.size} m²</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className='text-sm font-medium'>Type</p>
            <p className='text-lg font-semibold'>{property.type}</p>
          </div>
        </div>
      </section>
      <section className='bg-gray-50'>
        <div className="section">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-6">
            <div className="flex flex-col gap-6 md:col-span-5">
              {property.description && (
                <div className="bg-secondary rounded-lg p-8 flex flex-col gap-2">
                  <p className='text-xl font-medium'>Description</p>
                  <p className='text-lg'>{property.description}</p>
                </div>
              )}
              <div className="bg-secondary rounded-lg p-8 flex flex-col gap-4">
                <p className='text-xl font-medium'>Details</p>
                <div className="grid grid-cols-2 gap-4">
                  {
                    property.location && (
                      <div className="flex flex-col gap-2">
                        <p className='text-sm font-medium'>Location</p>
                        <p className='text-lg'>{property.location}</p>
                      </div>
                    )
                  }
                  <div className="flex flex-col gap-2">
                    <p className='text-sm font-medium'>Price</p>
                    <p className='text-lg font-semibold'>£{property.price.toLocaleString()}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className='text-sm font-medium'>Property Type</p>
                    <p className='text-lg'>{property.type}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className='text-sm font-medium'>Size</p>
                    <p className='text-lg'>{property.size} m²</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className='text-sm font-medium'>Bedrooms</p>
                    <p className='text-lg'>{property.bedrooms}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className='text-sm font-medium'>Bathrooms</p>
                    <p className='text-lg'>{property.bathrooms}</p>
                  </div>
                </div>
              </div>
              <div className="bg-secondary rounded-lg p-8 flex flex-col gap-3">
                <p className='text-xl font-medium'>Features</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {
                    property.features.map((feature, index) => (
                      <p key={index} className='text-lg'>{feature}</p>
                    ))
                  }
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 md:col-span-2 relative w-full">
              <div className="sticky top-20 bg-secondary rounded-lg p-8 flex flex-col gap-4">
                <p className='text-xl font-medium'>Interested in this property?</p>
                <p className='text-sm text-muted-foreground'>Fill out the form below to get more information</p>
                <div className="flex flex-col gap-2">
                  <Input type='text' placeholder='Name' />
                  <Input type='email' placeholder='Email' />
                  <Input type='tel' placeholder='Phone' />
                </div>
                <Button className='w-full' size='lg' variant='accent'>
                  Enquire Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment >
  )
}
