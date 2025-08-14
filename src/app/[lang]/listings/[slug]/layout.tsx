import { fetchSanityData } from '@/lib/third-party/sanity.client';
import React from 'react'


export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;

  const decodedSlug = decodeURIComponent(slug);

  const property = await fetchSanityData<{ title: string }>(`*[_type == "property" && basicInfo.slug.current == "${decodedSlug}"][0]
    {"title": basicInfo.title}`);

  if (!property) {
    return { title: 'Property Not Found' };
  }

  return { title: property?.title };
}

export default function ListingLayout({ children }: { children: React.ReactNode; }) {
  return children;
}
