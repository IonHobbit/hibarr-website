import { Metadata } from 'next';
import { generateSEOMetadata } from '@/lib/utils';
import { fetchSanityData } from '@/lib/third-party/sanity.client';
import { PropertyResponse } from '@/types/property';
import { getHreflangAlternates } from '@/lib/seo-metadata';
import PropertyDetails from './_components/PropertyDetails';

export async function generateMetadata(props: { params: Promise<{ slug: string; lang: string }> }): Promise<Metadata> {
  const { slug, lang } = await props.params;
  const decodedSlug = decodeURIComponent(slug);
  
  const property = await fetchSanityData<PropertyResponse>(`
    *[_type == "property" && basicInfo.slug.current == "${decodedSlug}"][0] {
      basicInfo {
        title,
        images[] {
          image,
          isCover
        }
      }
    }
  `)

  // Find cover image or first image
  const coverImage = property?.basicInfo?.images?.find(img => img.isCover)?.image || property?.basicInfo?.images?.[0]?.image;

  return generateSEOMetadata({
    metaTitle: property?.basicInfo?.title,
    openGraph: {
      title: property?.basicInfo?.title,
      image: coverImage
    }
  } as any, {
    title: property?.basicInfo?.title,
  }, lang)
}

export default async function PropertyPage(
  props: {
    params: Promise<{ slug: string }>;
  }
) {
  const { slug } = await props.params;

  return <PropertyDetails slug={slug} />;
}
