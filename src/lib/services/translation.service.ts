import { HashedTranslationResponse } from "@/types/translation.type";
import { unstable_cache } from 'next/cache';

// Generate a cache key from text and target language
const generateCacheKey = (text: string, targetLang: string): string => {
  return `${targetLang}:${text.toLowerCase().trim()}`;
};

// The actual translation API call function
export const fetchTranslation = async (text: string, targetLang: string): Promise<HashedTranslationResponse> => {
  try {
    const cacheKey = generateCacheKey(text, targetLang);

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '',
      // Enhanced cache headers for better caching
      'Cache-Control': 'max-age=3600, public, immutable',
      'ETag': `"${cacheKey}"`
    };

    const _translation = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/translation`, {
      method: 'POST',
      body: JSON.stringify({ text, targetLang }),
      headers
    });

    const translation = await _translation.json();
    const result = translation.data || { token: '', text: '' };

    return result;
  } catch (error) {
    console.error('Error fetching translation', text, targetLang, error);
    return { token: '', text: text || '' };
  }
};

// Cached version using Next.js unstable_cache
const CACHE_CONFIG = {
  revalidate: process.env.NODE_ENV === 'production' ? 3600 : 60,
  tags: ['translation']
};

export const runTranslation = unstable_cache(
  fetchTranslation,
  ['translation'],
  CACHE_CONFIG
);

// Function to invalidate translation cache
export const revalidateTranslationCache = async () => {
  // This would revalidate all translation cache entries
  // In a real implementation, you might want to use Next.js revalidateTag
  console.log('Translation cache revalidation requested');
};

// Function to get cache information (for debugging)
export const getTranslationCacheInfo = () => {
  return {
    cacheKey: 'translation',
    revalidateTime: 3600,
    tags: ['translation']
  };
};