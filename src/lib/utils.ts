import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { client } from "./sanity/client";
import createImageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export function generateImageUrl(image: SanityImageSource) {
  return createImageUrlBuilder(client).image(image);
}