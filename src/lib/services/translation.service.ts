import { makePOSTRequest } from "@/lib/services/api.service";
import { HashedTranslationResponse } from "@/types/translation.type";
import { unstable_cache } from 'next/cache';

// Generate a cache key from text and target language
const generateCacheKey = (text: string, targetLang: string): string => {
  return `${targetLang}:${text.toLowerCase().trim()}`;
};

// The actual translation API call function
export const fetchTranslation = async (text: string, targetLang: string): Promise<HashedTranslationResponse> => {
  try {
    const response = await makePOSTRequest<HashedTranslationResponse>('/translation', { text, targetLang });
    return response.data;
  } catch (error) {
    console.error('Error fetching translation', text, targetLang, error);
    return { token: '', text: text || '' };
  }
};

// Cached version using Next.js unstable_cache with proper cache key
const CACHE_CONFIG = {
  revalidate: process.env.NODE_ENV === 'production' ? 3600 : 60, // 1 hour in prod, 1 minute in dev
  tags: ['translation']
};

// Create a cached version that uses the text and language as cache key
export const runTranslation = async (text: string, targetLang: string): Promise<HashedTranslationResponse> => {
  const cacheKey = generateCacheKey(text, targetLang);

  const cachedTranslation = unstable_cache(
    () => fetchTranslation(text, targetLang),
    [cacheKey], // Use the actual cache key
    CACHE_CONFIG
  );

  return cachedTranslation();
};

// Function to invalidate translation cache
export const revalidateTranslationCache = async () => {
  // This would revalidate all translation cache entries
  // In a real implementation, you might want to use Next.js revalidateTag
  console.log('Translation cache revalidation requested');
};

// Function to get cache information (for debugging)
export const getTranslationCacheInfo = () => {
  return {
    revalidateTime: CACHE_CONFIG.revalidate,
    tags: CACHE_CONFIG.tags
  };
};