import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/_next/'],
        disallow: [
          // Block internal / system routes that should never be indexed
          '/api/',
          '/external/',
          '/ingest/',
          '/expose/',
          '/tools/',
          '/calendar/',
          '/webinaar',
          '/*/webinaar',
        ],
      },
    ],
    sitemap: 'https://hibarr.de/sitemap.xml',
  }
}