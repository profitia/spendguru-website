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
  // Przygotowanie pod i18n (PL/EN) — routing lokalizacyjny dodamy w kolejnym kroku
  // i18n: { locales: ['pl', 'en'], defaultLocale: 'pl' },
}

export default nextConfig

