'use client';

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import React, { Fragment, use } from 'react'
import EnquiryForm from './_components/EnquiryForm';
import { SanityImageAsset } from '@/types/sanity.types';
import { areaUnit, titleDeeds } from '@/lib/property';
import { PortableText } from 'next-sanity';
import PropertyDetail from './_components/PropertyDetail';
import ListingImages from './_components/ListingImages';
import useListing from '@/hooks/useListing';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/icons';
import { formatCurrency } from '@/lib/currency';
import useSource from '@/hooks/useSource';
import { Metadata } from 'next';
import { fetchSanityData } from '@/lib/third-party/sanity.client';
import { PropertyResponse } from '@/types/property';
import { getHreflangAlternates } from '@/lib/seo-metadata';

export async function generateMetadata(props: { params: Promise<{ slug: string; lang: string }> }): Promise<Metadata> {
  const { slug, lang } = await props.params;
  const decodedSlug = decodeURIComponent(slug);
  
  const property = await fetchSanityData<PropertyResponse>(`
    *[_type == "property" && basicInfo.slug.current == "${decodedSlug}"][0] {
      basicInfo {
        title
      }
    }
  `)

  return {
    title: property?.basicInfo?.title,
    alternates: getHreflangAlternates(`/listings/${decodedSlug}`, lang)
  }
}

export default function PropertyPage(
  props: {
    params: Promise<{ slug: string }>;
  }
) {
  const { slug } = use(props.params);
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

  const { basicInfo, description, details, features } = property;
  const { title, images, location, price, bedrooms, bathrooms, livingRooms, type, saleType } = basicInfo!;
  const { area, yearBuilt, titleDeed, floors, floorLevel, availableForTrade, gatedCommunity, management, residential, furnished, availableForViewing } = details!;

  const propertySize = area?.size ? `${area?.size} ${areaUnit[area?.unit as keyof typeof areaUnit]}` : undefined;
  const propertyAge = yearBuilt ?
    <Fragment>
      {details?.yearBuilt} <span className='text-xs text-gray-500'>({new Date().getFullYear() - yearBuilt} years old)</span>
    </Fragment> : undefined;

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
            {property.basicInfo.slug &&
              <BreadcrumbItem>
                <BreadcrumbLink href={generateLink(`listings/${property.basicInfo?.slug}`)}>{property.basicInfo?.title}</BreadcrumbLink>
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
            <p className='text-xl font-light capitalize'>{location}</p>
          </div>
          <p className='text-4xl font-bold'>{formatCurrency(price)}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className='bg-primary p-1 px-3'>
            <p className='text-sm text-primary-foreground font-medium uppercase'>{saleType?.replaceAll('-', ' ')}</p>
          </div>
        </div>
        <ListingImages images={images as unknown as { image: SanityImageAsset, alt: string, isCover: boolean }[]} />
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
            <p className='text-lg font-semibold'>{area?.size} {areaUnit[area?.unit as keyof typeof areaUnit]}</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className='text-sm font-medium'>Type</p>
            <p className='text-lg font-semibold'>{type?.join(', ')}</p>
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
                  <PortableText value={description || []} />
                </div>
              )}
              <div className="bg-secondary rounded-lg p-8 flex flex-col gap-4">
                <p className='text-xl font-medium'>Details</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <PropertyDetail label='Property Type' value={type ? type?.join(', ') : undefined} />
                  <PropertyDetail capitalize label='Location' value={location} />
                  <PropertyDetail label='Price' value={price ? formatCurrency(price) : undefined} />
                  <PropertyDetail label='Bedrooms' value={bedrooms} />
                  <PropertyDetail label='Bathrooms' value={bathrooms} />
                  <PropertyDetail label='Living Rooms' value={livingRooms} />
                  <PropertyDetail label='Title Deed' value={titleDeed ? titleDeeds[titleDeed as keyof typeof titleDeeds] : undefined} />
                  <PropertyDetail label='Size' value={propertySize} />
                  <PropertyDetail label='Year Built' value={propertyAge} />
                  <PropertyDetail label='Floors' value={floors} />
                  <PropertyDetail label='Floor Level' value={floorLevel} />
                  <PropertyDetail label='Available For Trade' value={availableForTrade ? 'Yes' : 'No'} />
                  <PropertyDetail label='Gated Community' value={gatedCommunity ? 'Yes' : 'No'} />
                  <PropertyDetail label='Management' value={management ? 'Yes' : 'No'} />
                  <PropertyDetail label='Residential' value={residential ? 'Yes' : 'No'} />
                  <PropertyDetail label='Furnished' value={furnished ? 'Yes' : 'No'} />
                  <PropertyDetail label='Available For Viewing' value={availableForViewing ? 'Yes' : 'No'} />
                </div>
              </div>
              <div className="bg-secondary rounded-lg p-8 flex flex-col gap-3">
                <p className='text-xl font-medium'>Internal Features</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {
                    features?.internal?.map((feature, index) => (
                      <p key={index} className='text-lg'>{feature.name}</p>
                    ))
                  }
                </div>
              </div>
              <div className="bg-secondary rounded-lg p-8 flex flex-col gap-3">
                <p className='text-xl font-medium'>External Features</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {
                    features?.external?.map((feature, index) => (
                      <p key={index} className='text-lg'>{feature.name}</p>
                    ))
                  }
                </div>
              </div>
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
