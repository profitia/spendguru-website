import type { PortableTextBlock, Image, Slug } from 'sanity'

// ─── Shared ─────────────────────────────────────────────────────────────────

export interface SanityImage extends Image {
  alt?: string
}

export interface SanitySlug extends Slug {
  current: string
}

export interface SeoFields {
  metaTitle?: string
  metaDescription?: string
  canonicalUrl?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: SanityImage
  noIndex?: boolean
  keywords?: string[]
}

// ─── Section Blocks ──────────────────────────────────────────────────────────

export interface HeroBlock {
  _type: 'heroBlock'
  heading?: string
  subheading?: string
  ctaPrimary?: string
  ctaPrimaryUrl?: string
  ctaSecondary?: string
  ctaSecondaryUrl?: string
  image?: SanityImage
}

export interface ProofBarBlock {
  _type: 'proofBarBlock'
  label?: string
  items?: Array<{ value: string; label: string }>
}

export interface ProblemBlock {
  _type: 'problemBlock'
  heading?: string
  body?: PortableTextBlock[]
  painPoints?: Array<{ title: string; description: string }>
}

export interface ProcessBlock {
  _type: 'processBlock'
  heading?: string
  subheading?: string
  steps?: Array<{ number: number; title: string; description: string }>
}

export interface StepsBlock {
  _type: 'stepsBlock'
  heading?: string
  steps?: Array<{ title: string; description: string; details?: PortableTextBlock[] }>
}

export interface PersonaBlock {
  _type: 'personaBlock'
  heading?: string
  personas?: Persona[]
}

export interface UseCaseBlock {
  _type: 'useCaseBlock'
  heading?: string
  useCases?: UseCase[]
}

export interface IndustryBlock {
  _type: 'industryBlock'
  heading?: string
  industries?: Industry[]
}

export interface ResourceGridBlock {
  _type: 'resourceGridBlock'
  heading?: string
  resourceType?: 'post' | 'resource' | 'caseStudy'
  limit?: number
}

export interface FaqBlock {
  _type: 'faqBlock'
  heading?: string
  context?: string
}

export interface CtaBlock {
  _type: 'ctaBlock'
  heading?: string
  subheading?: string
  ctaLabel?: string
  ctaUrl?: string
  variant?: 'default' | 'dark' | 'brand'
}

export interface FormBlock {
  _type: 'formBlock'
  heading?: string
  subheading?: string
  formId?: string
}

export type SectionBlock =
  | HeroBlock
  | ProofBarBlock
  | ProblemBlock
  | ProcessBlock
  | StepsBlock
  | PersonaBlock
  | UseCaseBlock
  | IndustryBlock
  | ResourceGridBlock
  | FaqBlock
  | CtaBlock
  | FormBlock

// ─── Documents ───────────────────────────────────────────────────────────────

export interface Page {
  _id: string
  title: string
  slug: SanitySlug
  language: 'pl' | 'en'
  sections?: SectionBlock[]
  seo?: SeoFields
  publishedAt?: string
  updatedAt?: string
}

export interface Post {
  _id: string
  title: string
  slug: SanitySlug
  excerpt?: string
  coverImage?: SanityImage
  category?: string
  tags?: string[]
  author?: string
  publishedAt?: string
  body?: PortableTextBlock[]
  seo?: SeoFields
  relatedResources?: (Resource | CaseStudy)[]
}

export interface Resource {
  _id: string
  title: string
  slug: SanitySlug
  excerpt?: string
  resourceType?: 'report' | 'checklist' | 'template' | 'webinar' | 'guide'
  coverImage?: SanityImage
  requiresEmail?: boolean
  publishedAt?: string
}

export interface CaseStudy {
  _id: string
  title: string
  slug: SanitySlug
  excerpt?: string
  industry?: Industry
  results?: Array<{ metric: string; value: string; description: string }>
  coverImage?: SanityImage
  publishedAt?: string
}

export interface UseCase {
  _id: string
  title: string
  slug: SanitySlug
  summary?: string
  icon?: string
  persona?: Persona
  industry?: Industry
}

export interface Industry {
  _id: string
  title: string
  slug: SanitySlug
  description?: string
  icon?: string
  order?: number
}

export interface Persona {
  _id: string
  title: string
  slug: SanitySlug
  role?: string
  description?: string
  painPoints?: string[]
  benefits?: string[]
}

export interface Faq {
  _id: string
  question: string
  answer?: PortableTextBlock[]
  context?: string
  order?: number
}

export interface LandingPage {
  _id: string
  title: string
  slug: SanitySlug
  campaignName?: string
  persona?: Persona
  sections?: SectionBlock[]
  form?: { formId: string; heading: string }
  seo?: SeoFields
}
