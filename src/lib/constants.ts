/** Stałe globalne aplikacji */

export const SITE = {
  name: 'SpendGuru',
  company: 'Profitia',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://spendguru.pl',
  email: 'kontakt@profitia.pl',
  phone: '+48 787 417 293',
} as const

export const MAIN_CTA = {
  label: 'Umów bezpłatne wsparcie negocjacji',
  href: '/umow-bezplatne-wsparcie-negocjacji',
} as const

export const SECONDARY_CTAS = [
  { label: 'Zobacz, jak to działa', href: '/jak-to-dziala' },
  { label: 'Sprawdź, jak przygotowujemy negocjacje', href: '/etapy-przygotowania-negocjacji' },
  { label: 'Poznaj etapy przygotowania negocjacji', href: '/etapy-przygotowania-negocjacji' },
  { label: 'Umów rozmowę o wybranej kategorii', href: '/umow-bezplatne-wsparcie-negocjacji' },
  { label: 'Zobacz przykład procesu', href: '/jak-to-dziala' },
] as const

export const LANGUAGES = ['pl', 'en'] as const
export type Language = (typeof LANGUAGES)[number]
export const DEFAULT_LANGUAGE: Language = 'pl'

export const CONTACT_INTEREST_OPTIONS = [
  { value: 'negocjacje', label: 'Wsparcie negocjacji' },
  { value: 'analiza-dostawcow', label: 'Analiza dostawców' },
  { value: 'benchmarki', label: 'Benchmarki rynkowe' },
  { value: 'kategoria', label: 'Konkretna kategoria zakupowa' },
  { value: 'demo', label: 'Demo SpendGuru' },
  { value: 'inne', label: 'Inne' },
] as const
