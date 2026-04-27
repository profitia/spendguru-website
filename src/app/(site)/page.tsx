import type { Metadata } from 'next'
import { HeroSection } from '@/components/sections/HeroSection'
import { ProofBar } from '@/components/sections/ProofBar'
import { ProblemSection } from '@/components/sections/ProblemSection'
import { FiveQuestionsSection } from '@/components/sections/FiveQuestionsSection'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { BusinessOutcomesSection } from '@/components/sections/BusinessOutcomesSection'
import { PersonaSection } from '@/components/sections/PersonaSection'
import { UseCaseSection } from '@/components/sections/UseCaseSection'
import { FaqSection } from '@/components/sections/FaqSection'
import { CtaSection } from '@/components/sections/CtaSection'
import { SectionRenderer } from '@/components/sections/SectionRenderer'
import { getHomePage } from '@/sanity/lib/home'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  metaTitle: 'SpendGuru - Negotiation Intelligence dla zespołów zakupowych',
  metaDescription:
    'SpendGuru pomaga zespołom zakupowym lepiej przygotować negocjacje z dostawcami. Dane kosztowe, benchmarki, prognozy i eksperci Profitii - przed każdą ważną rozmową.',
})

/** Fallback: statyczny układ z placeholder-content.ts */
function FallbackHome() {
  return (
    <>
      <HeroSection />
      <ProofBar />
      <ProblemSection />
      <FiveQuestionsSection />
      <ProcessSection />
      <BusinessOutcomesSection />
      <PersonaSection />
      <UseCaseSection />
      <FaqSection />
      <CtaSection />
    </>
  )
}

export default async function HomePage() {
  const page = await getHomePage()

  // Brak danych z Sanity (niezakonfigurowane, błąd, pusty dataset) — fallback
  if (!page?.sections?.length) {
    return <FallbackHome />
  }

  return (
    <>
      {page.sections.map((block) => (
        <SectionRenderer key={block._key} block={block} />
      ))}
    </>
  )
}
