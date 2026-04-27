/** Centralne definicje ścieżek. Zmiana URL-a = zmiana w jednym miejscu. */

export const ROUTES = {
  home: '/',
  howItWorks: '/jak-to-dziala',
  steps: '/etapy-przygotowania-negocjacji',
  useCases: '/zastosowania',
  forWhom: '/dla-kogo',
  industries: '/branze',
  knowledge: '/wiedza',
  about: '/o-profitii-i-spendguru',
  contact: '/umow-bezplatne-wsparcie-negocjacji',

  // Knowledge sub-routes
  knowledgePost: (slug: string) => `/wiedza/${slug}`,
  knowledgeResource: (slug: string) => `/wiedza/zasoby/${slug}`,
  knowledgeCaseStudy: (slug: string) => `/wiedza/case-study/${slug}`,
} as const

export type RouteKey = keyof typeof ROUTES
