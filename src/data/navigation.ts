import { ROUTES } from '@/lib/routes'
import { MAIN_CTA } from '@/lib/constants'

export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

export const mainNav: NavItem[] = [
  { label: 'Jak to działa', href: ROUTES.howItWorks },
  { label: 'Etapy przygotowania', href: ROUTES.steps },
  {
    label: 'Zastosowania',
    href: ROUTES.useCases,
    children: [
      { label: 'Wszystkie zastosowania', href: ROUTES.useCases },
      { label: 'Dla kogo', href: ROUTES.forWhom },
      { label: 'Branże', href: ROUTES.industries },
    ],
  },
  { label: 'Wiedza', href: ROUTES.knowledge },
  { label: 'O nas', href: ROUTES.about },
]

export const ctaNav = {
  label: MAIN_CTA.label,
  href: MAIN_CTA.href,
}

export const footerNav = {
  product: {
    label: 'SpendGuru',
    items: [
      { label: 'Jak to działa', href: ROUTES.howItWorks },
      { label: 'Etapy przygotowania negocjacji', href: ROUTES.steps },
      { label: 'Zastosowania', href: ROUTES.useCases },
      { label: 'Dla kogo', href: ROUTES.forWhom },
      { label: 'Branże', href: ROUTES.industries },
    ],
  },
  knowledge: {
    label: 'Wiedza',
    items: [
      { label: 'Artykuły', href: ROUTES.knowledge },
      { label: 'Case Studies', href: `${ROUTES.knowledge}/case-study` },
      { label: 'Zasoby do pobrania', href: `${ROUTES.knowledge}/zasoby` },
    ],
  },
  company: {
    label: 'Profitia',
    items: [
      { label: 'O Profitii i SpendGuru', href: ROUTES.about },
      { label: 'Umów bezpłatne wsparcie', href: ROUTES.contact },
    ],
  },
}
