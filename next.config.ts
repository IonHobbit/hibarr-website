import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: 'hibarr.de',
        protocol: 'https',
      },
      {
        hostname: 'cdn.sanity.io',
        protocol: 'https',
      },
    ],
  },
};

export default nextConfig;
