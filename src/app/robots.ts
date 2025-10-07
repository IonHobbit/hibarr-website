import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/'],
        disallow: ['/api', '/external', '/ingest', '/expose', '/tools', '/calendar', '/webinaar', '/webinaar*', '/*/webinaar*', '/*/webinaar']
      }
    ],
    sitemap: 'https://hibarr.de/sitemap.xml',
  }
}