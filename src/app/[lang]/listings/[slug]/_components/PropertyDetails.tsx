'use client';

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import React, { Fragment } from 'react'
import EnquiryForm from './EnquiryForm';
import { SanityImageAsset } from '@/types/sanity.types';
import { areaUnit, titleDeeds } from '@/lib/property';
import { PortableText } from 'next-sanity';
import PropertyDetail from './PropertyDetail';
import ListingImages from './ListingImages';
import useListing from '@/hooks/useListing';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/icons';
import { formatCurrency } from '@/lib/currency';
import useSource from '@/hooks/useSource';

export default function PropertyDetails(
  props: {
    slug: string;
  }
) {
  const { slug } = props;
  const source = useSource();

  const decodedSlug = decodeURIComponent(slug);

  const { data, isLoading, error, refetch } = useListing(decodedSlug);

  const property = data || null;

  if (error) {
    return <section className='section flex flex-col items-center justify-center h-screen gap-3'>
      <h4 className='text-4xl font-bold'>An error occurred while loading this property</h4>
      <p>Please try again later</p>
      <Button isLoading={isLoading} onClick={() => refetch()}>Try Again</Button>
    </section>;
  }

  if (isLoading) {
    return <section className='section flex items-center justify-center h-screen'>
      <Icon icon='mdi:loading' className='size-10 animate-spin' />
    </section>;
  }

  if (!property) {
    return (
      <section className='section flex flex-col items-center justify-center h-screen gap-3'>
        <h4 className='text-4xl font-bold'>This property is no longer available</h4>
        <p>Let&apos;s find you a new one</p>
        <Button asChild>
          <Link href='/listings'>View Listings</Link>
        </Button>
      </section>
    );
  }

  // const { basicInfo, description, details, features } = property;
  // const { title, images, location, price, bedrooms, bathrooms, livingRooms, type, saleType } = basicInfo!;
  // const { area, yearBuilt, titleDeed, floors, floorLevel, availableForTrade, gatedCommunity, management, residential, furnished, availableForViewing } = details!;

  const { title, title_deed_type, building_age, description, bedrooms, bathrooms, price, city, sale_type, property_type, living_room, floor_number, floors_in_building, exterior_features, interior_features, photos, product_name, land_size } = property;

  // const propertySize = area?.size ? `${area?.size} ${areaUnit[area?.unit as keyof typeof areaUnit]}` : undefined;
  const propertyAge = building_age ?
    (() => {
      const currentYear = new Date().getFullYear();
      const yearBuilt = currentYear - building_age;
      return (
        <Fragment>
          {yearBuilt} <span className='text-xs text-gray-500'>({building_age} years old)</span>
        </Fragment>
      );
    })()
    : undefined;

  const generateLink = (link: string) => {
    if (source === 'alpha-cash') {
      return `/external/alpha-cash/${link}`
    }
    return `/${link}`
  }

  return (
    <Fragment>
      <section className='section header-offset gap-6'>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href='/'>Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={generateLink('listings')}>Listings</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {product_name &&
              <BreadcrumbItem>
                <BreadcrumbLink href={generateLink(`listings/${product_name}`)}>{title}</BreadcrumbLink>
              </BreadcrumbItem>
            }
            {(!property && !isLoading) &&
              <BreadcrumbItem>
                <BreadcrumbLink>Property Not Found</BreadcrumbLink>
              </BreadcrumbItem>
            }
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex items-start flex-wrap gap-4 justify-between">
          <div className='flex flex-col gap-2'>
            <h1 className='text-4xl font-bold'>{title}</h1>
            <p className='text-xl font-light capitalize'>{city}</p>
          </div>
          <p className='text-4xl font-bold'>{formatCurrency(price)}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className='bg-primary p-1 px-3'>
            <p className='text-sm text-primary-foreground font-medium uppercase'>{sale_type?.replaceAll('-', ' ')}</p>
          </div>
        </div>
        <ListingImages images={Array.isArray(photos) ? photos : []} />
        <div className="grid grid-cols-2 md:divide-x md:grid-cols-4 gap-3">
          <div className="flex flex-col items-center gap-2">
            <p className='text-sm font-medium'>Bedrooms</p>
            <p className='text-lg font-semibold'>{bedrooms}</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className='text-sm font-medium'>Bathrooms</p>
            <p className='text-lg font-semibold'>{bathrooms}</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className='text-sm font-medium'>Size</p>
            <p className='text-lg font-semibold'>{land_size} {areaUnit['m2']}</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className='text-sm font-medium'>Type</p>
            <p className='text-lg font-semibold'>{property_type}</p>
          </div>
        </div>
      </section>
      <section className='bg-gray-50'>
        <div className="section">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-6">
            <div className="flex flex-col gap-6 md:col-span-5">
              {description && (
                <div className="bg-secondary rounded-lg p-8 flex flex-col gap-2">
                  <p className='text-xl font-medium'>Description</p>
                  {/* <PortableText value={description || ''} /> */}
                  <span>{description}</span>
                </div>
              )}
              <div className="bg-secondary rounded-lg p-8 flex flex-col gap-4">
                <p className='text-xl font-medium'>Details</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <PropertyDetail label='Property Type' value={property_type ? property_type : undefined} />
                  <PropertyDetail capitalize label='Location' value={city} />
                  {/* <PropertyDetail label='Price' value={price ? formatCurrency(price) : undefined} /> */}
                  <PropertyDetail label='Bedrooms' value={bedrooms} />
                  <PropertyDetail label='Bathrooms' value={bathrooms} />
                  <PropertyDetail label='Living Rooms' value={living_room} />
                  <PropertyDetail label='Title Deed' value={title_deed_type ? titleDeeds[title_deed_type as keyof typeof titleDeeds] : undefined} />
                  {/* <PropertyDetail label='Size' value={propertySize} /> */}
                  <PropertyDetail label='Year Built' value={propertyAge} />
                  <PropertyDetail label='Floors' value={floors_in_building} />
                  <PropertyDetail label='Floor Level' value={floor_number} />
                  {/* <PropertyDetail label='Available For Trade' value={availableForTrade ? 'Yes' : 'No'} />
                  <PropertyDetail label='Gated Community' value={gatedCommunity ? 'Yes' : 'No'} />
                  <PropertyDetail label='Management' value={management ? 'Yes' : 'No'} />
                  <PropertyDetail label='Residential' value={residential ? 'Yes' : 'No'} />
                  <PropertyDetail label='Furnished' value={furnished ? 'Yes' : 'No'} />
                  <PropertyDetail label='Available For Viewing' value={availableForViewing ? 'Yes' : 'No'} /> */}
                </div>
              </div>
              {
                interior_features?.length > 0 && (
                  <div className="bg-secondary rounded-lg p-8 flex flex-col gap-3">
                    <p className='text-xl font-medium'>Internal Features</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {
                        interior_features?.map((feature, index) => (
                          <p key={index} className='text-lg'>{feature.name}</p>
                        ))
                      }
                    </div>
                  </div>
                )
              }

              {exterior_features?.length > 0 && (
                <div className="bg-secondary rounded-lg p-8 flex flex-col gap-3">
                  <p className='text-xl font-medium'>External Features</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {
                      exterior_features?.map((feature, index) => (
                        <p key={index} className='text-lg'>{feature.name}</p>
                      ))
                    }
                  </div>
                </div>
              )}

            </div>
            <div className="flex flex-col gap-4 md:col-span-2 relative w-full">
              <EnquiryForm property={property} />
            </div>
          </div>
        </div>
      </section>
    </Fragment >
  )
}
