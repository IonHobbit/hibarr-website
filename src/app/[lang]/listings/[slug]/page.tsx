import { Metadata } from 'next';
import { fetchSanityData } from '@/lib/third-party/sanity.client';
import { PropertyResponse } from '@/types/property';
import { getHreflangAlternates } from '@/lib/seo-metadata';
import PropertyDetails from './_components/PropertyDetails';
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
import { generateProductSchema } from '@/lib/seo-schema';

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

export default async function PropertyPage(
  props: {
    params: Promise<{ slug: string }>;
  }
) {
  const { slug } = await props.params;

  return <PropertyDetails slug={slug} />;
}
