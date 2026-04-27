import type { Metadata } from 'next'
import type { SeoFields } from '@/sanity/types/sanity.types'
import { urlFor } from '@/sanity/lib/image'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://spendguru.pl'
const SITE_NAME = 'SpendGuru'

const DEFAULT_META: Metadata = {
  title: {
    default: 'SpendGuru - Negotiation Intelligence dla zespołów zakupowych',
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'SpendGuru pomaga zespołom zakupowym lepiej przygotować negocjacje z dostawcami. Więcej danych, lepsza pozycja, lepszy wynik.',
  metadataBase: new URL(SITE_URL),
  openGraph: {
    siteName: SITE_NAME,
    locale: 'pl_PL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export function buildMetadata(seo?: SeoFields, path?: string): Metadata {
  if (!seo) return DEFAULT_META

  const ogImageUrl = seo.ogImage ? urlFor(seo.ogImage).width(1200).height(630).url() : undefined

  return {
    ...DEFAULT_META,
    title: seo.metaTitle || DEFAULT_META.title,
    description: seo.metaDescription || DEFAULT_META.description,
    alternates: {
      canonical: seo.canonicalUrl || (path ? `${SITE_URL}${path}` : SITE_URL),
    },
    robots: seo.noIndex ? { index: false, follow: false } : DEFAULT_META.robots,
    openGraph: {
      ...((DEFAULT_META.openGraph as object) || {}),
      title: seo.ogTitle || seo.metaTitle || undefined,
      description: seo.ogDescription || seo.metaDescription || undefined,
      images: ogImageUrl ? [{ url: ogImageUrl, width: 1200, height: 630 }] : undefined,
    },
  }
}

export { DEFAULT_META }
