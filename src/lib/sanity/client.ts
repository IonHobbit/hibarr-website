import { createClient } from "next-sanity";
import { cache } from "react";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

export const fetchSanityData = cache(async<T>(query: string, params: object, options?: { cache: 'no-store' }): Promise<T> => {
  const env = process.env.NODE_ENV;
  const data = await client.fetch<T>(query, params, {
    ...options,
    ...(env === 'development' && { cache: 'no-store' })
  });
  return data;
})