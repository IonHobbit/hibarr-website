import { Metadata } from 'next';
import { generateSEOMetadata } from '@/lib/utils';
import { fetchSanityData } from '@/lib/third-party/sanity.client';
import { PropertyResponse } from '@/types/property';
import { SeoMetaFields } from '@/types/sanity.types';
import PropertyDetails from './_components/PropertyDetails';
import React from 'react'


export async function generateMetadata(props: { params: Promise<{ slug: string; lang: string }> }): Promise<Metadata> {
  const { slug } = await props.params;
  const decodedSlug = decodeURIComponent(slug);
  
  const property = await fetchSanityData<PropertyResponse>(
    `*[_type == "property" && basicInfo.slug.current == $slug][0] {
      basicInfo {
        title,
        images[] {
          image,
          isCover
        }
      }
    }`,
    { slug: decodedSlug }
  );

  if (!property?.basicInfo?.title) {
    return generateSEOMetadata(undefined, { title: 'Listing' }, lang);
  }

  const coverImage =
    property?.basicInfo?.images?.find((img) => img.isCover)?.image ||
    property?.basicInfo?.images?.[0]?.image;

  return generateSEOMetadata(
    {
      metaTitle: property.basicInfo.title,
      openGraph: {
        title: property.basicInfo.title,
        image: coverImage,
      },
    } as SeoMetaFields,
    { title: property.basicInfo.title },
    lang
  );
}

export default async function PropertyPage(
  props: {
    params: Promise<{ slug: string }>;
  }
) {
  const { slug } = await props.params;
  const decodedSlug = decodeURIComponent(slug);

  return <PropertyDetails slug={decodedSlug} />;
}
