import { Metadata } from 'next';
import { generateSEOMetadata } from '@/lib/utils';
import { PropertyListing } from '@/types/property';
import { SeoMetaFields } from '@/types/sanity.types';
import PropertyDetails from './_components/PropertyDetails';
import React from 'react'
import { APIResponse } from '@/lib/services/api.service';
import { makeCRMGETRequest } from '@/lib/services/properties-api.service';

async function getProperty(id: string): Promise<PropertyListing | null> {
  try {
    const response = await makeCRMGETRequest<APIResponse<PropertyListing>>(`/api/v1/properties/${id}`);
    return response.data;
  } catch {
    return null;
  }
}

export async function generateMetadata(props: { params: Promise<{ slug: string; lang: string }> }): Promise<Metadata> {
  const { slug, lang } = await props.params;
  const decodedSlug = decodeURIComponent(slug);

  const property = await getProperty(decodedSlug);

  if (!property?.title) {
    return generateSEOMetadata(undefined, { title: 'Listing' }, lang);
  }

  const coverImage = property.images?.[0] || null;

  return generateSEOMetadata(
    {
      _type: 'seoMetaFields',
      metaTitle: property.title,
      openGraph: {
        title: property.title,
        image: coverImage?.url,
        _type: 'openGraph'
      },
    } satisfies SeoMetaFields,
    { title: property.title },
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
