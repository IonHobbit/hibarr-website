import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  generateEtags: false,

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hibarr.de',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async redirects() {
    return [
      {
        source: '/waitlist/:path*',
        destination: '/facebook-group/:path*',
        permanent: true,
      },
      {
        source: '/:lang/waitlist/:path*',
        destination: '/:lang/facebook-group/:path*',
        permanent: true,
      }
    ];
  },
  async rewrites() {
    return [
      {
        source: '/ingest/static/:path*',
        destination: 'https://eu-assets.i.posthog.com/static/:path*',
      },
      {
        source: '/ingest/:path*',
        destination: 'https://eu.i.posthog.com/:path*',
      },
      {
        source: '/ingest/decide',
        destination: 'https://eu.i.posthog.com/decide',
      },
    ];
  },
  // This is required to support PostHog trailing slash API requests
  // skipTrailingSlashRedirect: true,
};

export default nextConfig;