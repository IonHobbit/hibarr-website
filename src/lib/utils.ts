import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { client } from "./third-party/sanity.client";
import createImageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { SeoMetaFields } from "@/types/sanity.types";
import { Metadata } from "next";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export function generateImageUrl(image: SanityImageSource) {
  return createImageUrlBuilder(client).image(image);
}

export function joinWith(array: string[], conjunction?: string) {
  if (array.length === 0) return '';
  if (array.length === 1) return array[0];
  return array.slice(0, -1).join(', ') + ' ' + (conjunction || 'and') + ' ' + array.slice(-1)[0];
}

export function generateSEOMetadata(seo?: SeoMetaFields, defaults?: {
  title?: string;
  description?: string;
  keywords?: string[];
}, locale: string = 'en'): Metadata {

  const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://hibarr.de';
  const metaTitle = seo?.metaTitle || defaults?.title;
  const metaDescription = seo?.metaDescription || defaults?.description;
  
  // Default images
  const defaultOgImage = `${siteUrl}/og-image.jpg`;
  const defaultTwitterImage = `${siteUrl}/twitter-image.jpg`;

  const ogImages = seo?.openGraph?.image 
    ? [generateImageUrl(seo?.openGraph?.image).width(1200).height(630).url()] 
    : [defaultOgImage];

  const twitterImages = seo?.openGraph?.image 
    ? [generateImageUrl(seo?.openGraph?.image).width(1200).height(675).url()]
    : [defaultTwitterImage];

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: seo?.seoKeywords || defaults?.keywords,
    openGraph: {
      title: seo?.openGraph?.title || metaTitle,
      description: seo?.openGraph?.description || metaDescription,
      url: `${siteUrl}/${locale}`,
      siteName: 'HIBARR',
      images: ogImages.map(url => ({
        url,
        width: 1200,
        height: 630,
        alt: metaTitle || 'HIBARR North Cyprus Real Estate',
      })),
      type: (seo?.openGraph as any)?.type || 'website',
      locale: locale === 'en' ? 'en_US' : locale === 'de' ? 'de_DE' : locale === 'tr' ? 'tr_TR' : locale === 'ru' ? 'ru_RU' : locale,
    },
    twitter: {
      card: 'summary_large_image',
      creator: seo?.twitter?.creator || '@hibarr',
      site: seo?.twitter?.site || '@hibarr',
      title: metaTitle,
      description: metaDescription,
      images: twitterImages,
    },
  }
}

export function generateRandomFileName(file: File) {
  return `${Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)}.${file.type.split('/')[1]}`;
}

interface PortableTextBlock {
  _type: string;
  children?: { text?: string }[];
  [key: string]: unknown;
}

export function toPlainText(blocks: PortableTextBlock[] = []) {
  return blocks
    // loop through each block
    .map(block => {
      // if it's not a text block with children, return nothing
      if (block._type !== 'block' || !block.children) {
        return ''
      }
      // loop through the children spans, and join them
      return block.children.map((child) => child.text || '').join('')
    })
    // join the paragraphs leaving split by two linebreaks
    .join('\n\n')
}