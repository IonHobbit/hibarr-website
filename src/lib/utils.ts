import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { client } from "./sanity/client";
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
}): Metadata {

  return {
    title: seo?.metaTitle || defaults?.title,
    description: seo?.metaDescription || defaults?.description,
    keywords: seo?.seoKeywords || defaults?.keywords,
    openGraph: {
      title: seo?.openGraph?.title || defaults?.title,
      description: seo?.openGraph?.description || defaults?.description,
      images: seo?.openGraph?.image ? [generateImageUrl(seo?.openGraph?.image).url()] : [],
    },
    twitter: {
      card: 'summary_large_image',
      creator: seo?.twitter?.creator,
      site: seo?.twitter?.site,
      title: seo?.metaTitle || defaults?.title,
      description: seo?.metaDescription || defaults?.description,
      images: seo?.openGraph?.image ? [generateImageUrl(seo?.openGraph?.image).url()] : [],
    },
  }
}