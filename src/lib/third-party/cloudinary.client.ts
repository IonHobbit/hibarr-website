import { v2 as cloudinary, ResourceApiResponse } from 'cloudinary';
import { unstable_cache } from 'next/cache';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export type CloudinaryFile = ResourceApiResponse['resources'][number];

// In-memory cache to prevent rate limits
// Cache entries expire based on MAX_CALLS_PER_HOUR (tunable via env, default 120 calls/hour)
interface CacheEntry {
  data: CloudinaryFile[];
  timestamp: number;
}

const memoryCache = new Map<string, CacheEntry>();
const MAX_CACHE_SIZE = 100;

// Allow tuning the maximum calls per hour; default keeps us well under Cloudinary limits
const MAX_CALLS_PER_HOUR = Number(process.env.CLOUDINARY_MAX_CALLS_PER_HOUR ?? 120); // ~1 call every 30s per folder
const CACHE_TTL_SECONDS = Math.max(1, Math.floor(3600 / MAX_CALLS_PER_HOUR));
const CACHE_TTL_MS = CACHE_TTL_SECONDS * 1000;

// Cache configuration for Next.js unstable_cache
const CACHE_CONFIG = {
  revalidate: CACHE_TTL_SECONDS,
  tags: ['cloudinary']
};

const pruneCache = () => {
  if (memoryCache.size <= MAX_CACHE_SIZE) return;

  const sortedEntries = Array.from(memoryCache.entries())
    .sort((a, b) => a[1].timestamp - b[1].timestamp);

  // Remove enough oldest entries to get back under the limit
  const excess = memoryCache.size - MAX_CACHE_SIZE;
  const toRemove = Math.max(1, excess);
  sortedEntries.slice(0, toRemove).forEach(([key]) => memoryCache.delete(key));
};

// Internal function that makes the actual API call
const _fetchFilesInternal = async (folder: string): Promise<CloudinaryFile[]> => {
  const result = await cloudinary.search.expression(`folder=${folder}`).execute();
  return result.resources;
};

// Cached version that only calls the API once every 10 minutes per folder
// This helps stay under the max calls per hour:
// - Max calls per folder per hour ~= MAX_CALLS_PER_HOUR
// - With 2 folders (Features, Partners), total is ~2 * MAX_CALLS_PER_HOUR
const fetchFiles = async (folder: string): Promise<CloudinaryFile[]> => {
  try {
    const cacheKey = `cloudinary-files-${folder}`;
    const now = Date.now();

    // Check in-memory cache first (fastest, prevents duplicate calls in same process)
    const cached = memoryCache.get(cacheKey);
    if (cached && (now - cached.timestamp) < CACHE_TTL_MS) {
      return cached.data;
    }

    // Use Next.js cache for cross-request persistence
    const cachedFetch = unstable_cache(
      async () => {
        const data = await _fetchFilesInternal(folder);
        // Update in-memory cache
        memoryCache.set(cacheKey, { data, timestamp: now });
        return data;
      },
      [cacheKey],
      CACHE_CONFIG
    );

    const result = await cachedFetch();

    // Ensure in-memory cache is updated
    memoryCache.set(cacheKey, { data: result, timestamp: now });
    pruneCache();
    return result;
  } catch (error) {
    console.error('Error fetching files from Cloudinary:', error);
    return [];
  }
}

export { fetchFiles }