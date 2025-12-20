import { Metadata } from 'next';
import { fetchSanityData } from '@/lib/third-party/sanity.client';
import { PropertyResponse } from '@/types/property';
import { getHreflangAlternates } from '@/lib/seo-metadata';
import PropertyDetails from './_components/PropertyDetails';
import React from 'react'


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
