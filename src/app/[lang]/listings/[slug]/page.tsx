import { Metadata } from 'next';
import { generateSEOMetadata, SeoCompatibleFields } from '@/lib/utils';
import { PropertyListing } from '@/types/property';
import { SeoMetaFields } from '@/types/sanity.types';
import PropertyDetails from './_components/PropertyDetails';
import React from 'react'
import { propertyApi } from '@/lib/services/properties-api.service';
import { APIResponse } from '@/lib/services/api.service';

async function getProperty(id: string): Promise<PropertyListing | null> {
  try {
    const response = await propertyApi.get<APIResponse<PropertyListing>>(`/api/v1/properties/${id}`);
    return response.data.data;
  } catch (error) {
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

  const coverImage = property.images?.[0]?.url || property.product_image_url;

  const seoFields: SeoCompatibleFields = {
    metaTitle: property.title,
    metaDescription: property.description,
    openGraph: {
      _type: 'openGraph',
      title: property.title,
      image: {
        _type: 'image',
        asset: {
          _ref: coverImage,
          _type: 'reference',
        },
      },
    },
  };

  return generateSEOMetadata(
    seoFields as unknown as SeoMetaFields,
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
