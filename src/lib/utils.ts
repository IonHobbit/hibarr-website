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