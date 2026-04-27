import { groq } from 'next-sanity'

// ─── Page ───────────────────────────────────────────────────────────────────

export const pageQuery = groq`
  *[_type == "page" && slug.current == $slug && language == $language][0] {
    _id,
    title,
    slug,
    language,
    seo,
    hero,
    sections,
    mainCta,
    publishedAt,
    updatedAt
  }
`

export const allPageSlugsQuery = groq`
  *[_type == "page"] {
    "slug": slug.current,
    language
  }
`

// ─── Post / Artykuły ─────────────────────────────────────────────────────────

export const allPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    category,
    tags,
    publishedAt
  }
`

export const allPostSlugsQuery = groq`
  *[_type == "post"] { "slug": slug }
`

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    category,
    tags,
    author,
    publishedAt,
    body,
    seo,
    relatedResources,
    cta
  }
`

// ─── Resources ───────────────────────────────────────────────────────────────

export const allResourcesQuery = groq`
  *[_type == "resource"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    resourceType,
    file,
    coverImage,
    publishedAt
  }
`

// ─── Case Studies ────────────────────────────────────────────────────────────

export const allCaseStudiesQuery = groq`
  *[_type == "caseStudy"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    industry,
    results,
    coverImage,
    publishedAt
  }
`

// ─── Use Cases ───────────────────────────────────────────────────────────────

export const allUseCasesQuery = groq`
  *[_type == "useCase"] {
    _id,
    title,
    slug,
    summary,
    icon,
    persona,
    industry
  }
`

// ─── Industries ──────────────────────────────────────────────────────────────

export const allIndustriesQuery = groq`
  *[_type == "industry"] | order(order asc) {
    _id,
    title,
    slug,
    description,
    icon
  }
`

// ─── Personas ────────────────────────────────────────────────────────────────

export const allPersonasQuery = groq`
  *[_type == "persona"] {
    _id,
    title,
    slug,
    role,
    description,
    painPoints,
    benefits
  }
`

// ─── FAQ ─────────────────────────────────────────────────────────────────────

export const faqByContextQuery = groq`
  *[_type == "faq" && context == $context] | order(order asc) {
    _id,
    question,
    answer,
    context
  }
`

// ─── Landing Page ────────────────────────────────────────────────────────────

export const landingPageBySlugQuery = groq`
  *[_type == "landingPage" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    campaignName,
    persona,
    hero,
    sections,
    form,
    cta,
    seo
  }
`
