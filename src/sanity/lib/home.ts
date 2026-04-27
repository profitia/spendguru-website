/**
 * home.ts — pobieranie i typy danych strony głównej z Sanity.
 *
 * Używane przez src/app/(site)/page.tsx jako Server Component.
 * Jeśli Sanity nie jest skonfigurowane lub zwróci null, funkcja
 * zwraca null — page.tsx obsługuje fallback do placeholder-content.ts.
 */

import { client, isSanityConfigured } from './client'
import { homePageQuery } from './queries'

// ─── TYPY ────────────────────────────────────────────────────────────────────

export interface SeoData {
  metaTitle?: string | null
  metaDescription?: string | null
  canonicalUrl?: string | null
  ogTitle?: string | null
  ogDescription?: string | null
  noIndex?: boolean | null
}

export interface HeroBlockData {
  _type: 'heroBlock'
  _key: string
  heading?: string | null
  subheading?: string | null
  ctaPrimary?: string | null
  ctaPrimaryUrl?: string | null
  ctaSecondary?: string | null
  ctaSecondaryUrl?: string | null
}

export interface ProofBarItem {
  _key?: string
  value: string
  label: string
}

export interface ProofBarBlockData {
  _type: 'proofBarBlock'
  _key: string
  label?: string | null
  items?: ProofBarItem[] | null
}

export interface ProblemCard {
  _key?: string
  title: string
  description: string
}

export interface ProblemBlockData {
  _type: 'problemBlock'
  _key: string
  heading?: string | null
  subheading?: string | null
  cards?: ProblemCard[] | null
}

export interface FiveQuestion {
  _key?: string
  number: number
  question: string
  context: string
}

export interface FiveQuestionsBlockData {
  _type: 'fiveQuestionsBlock'
  _key: string
  heading?: string | null
  subheading?: string | null
  questions?: FiveQuestion[] | null
}

export interface ProcessStep {
  _key?: string
  number: number
  title: string
  description: string
}

export interface ProcessBlockData {
  _type: 'processBlock'
  _key: string
  heading?: string | null
  subheading?: string | null
  steps?: ProcessStep[] | null
}

export interface Outcome {
  _key?: string
  title: string
  description: string
  metric?: string | null
}

export interface BusinessOutcomesBlockData {
  _type: 'businessOutcomesBlock'
  _key: string
  heading?: string | null
  outcomes?: Outcome[] | null
}

export interface PersonaData {
  _id: string
  title: string
  role?: string | null
  description?: string | null
  painPoints?: string[] | null
}

export interface PersonaBlockData {
  _type: 'personaBlock'
  _key: string
  heading?: string | null
  personas?: PersonaData[] | null
}

export interface UseCaseStoryBlockData {
  _type: 'useCaseStoryBlock'
  _key: string
  label?: string | null
  heading?: string | null
  context?: string | null
  steps?: string[] | null
  result?: string | null
  ctaLabel?: string | null
  ctaUrl?: string | null
}

export interface FaqItem {
  _id?: string
  question: string
  answer?: string | null
}

export interface FaqBlockData {
  _type: 'faqBlock'
  _key: string
  heading?: string | null
  context?: string | null
  items?: FaqItem[] | null
}

export interface CtaBlockData {
  _type: 'ctaBlock'
  _key: string
  heading?: string | null
  subheading?: string | null
  ctaLabel?: string | null
  ctaUrl?: string | null
  variant?: 'default' | 'dark' | 'brand' | null
}

/** Nieznany blok — SectionRenderer zwróci null */
export interface UnknownBlock {
  _type: string
  _key: string
  [key: string]: unknown
}

export type HomeSectionBlock =
  | HeroBlockData
  | ProofBarBlockData
  | ProblemBlockData
  | FiveQuestionsBlockData
  | ProcessBlockData
  | BusinessOutcomesBlockData
  | PersonaBlockData
  | UseCaseStoryBlockData
  | FaqBlockData
  | CtaBlockData
  | UnknownBlock

export interface HomePageData {
  _id: string
  title?: string | null
  seo?: SeoData | null
  sections?: HomeSectionBlock[] | null
}

// ─── FETCH ───────────────────────────────────────────────────────────────────

/**
 * Pobiera dokument strony głównej z Sanity.
 * Zwraca null gdy Sanity nie jest skonfigurowane lub dokument nie istnieje.
 * Błędy sieciowe/GROQ są wyłapywane — fallback do placeholderów w page.tsx.
 */
export async function getHomePage(): Promise<HomePageData | null> {
  if (!isSanityConfigured) {
    return null
  }

  try {
    const data = await client.fetch<HomePageData | null>(homePageQuery, {}, {
      // next.js cache: revalidate co 60 sekund (ISR)
      next: { revalidate: 60 },
    })
    return data ?? null
  } catch (err) {
    // Nie wyrzucamy — strona pokaże placeholdery
    console.warn('[Sanity] getHomePage error:', err)
    return null
  }
}
