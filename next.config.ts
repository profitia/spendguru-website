import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  // Sanity Studio uses styled-components and other browser-only modules.
  // Marking these packages as external for the server bundle prevents
  // webpack from trying to resolve styled-components during SSR/build.
  serverExternalPackages: ['sanity', 'next-sanity', '@sanity/vision', '@sanity/image-url'],
}

export default nextConfig

