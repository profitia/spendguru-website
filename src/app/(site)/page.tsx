import type { Metadata } from 'next'
import { HeroSection } from '@/components/sections/HeroSection'
import { ProofBar } from '@/components/sections/ProofBar'
import { ProblemSection } from '@/components/sections/ProblemSection'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { PersonaSection } from '@/components/sections/PersonaSection'
import { CtaSection } from '@/components/sections/CtaSection'
import { FaqSection } from '@/components/sections/FaqSection'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  metaTitle: 'SpendGuru - Negotiation Intelligence dla zespołów zakupowych',
  metaDescription:
    'SpendGuru pomaga zespołom zakupowym lepiej przygotować negocjacje z dostawcami. Dane, benchmarki, prognozy i eksperci Profitii - przed każdą ważną rozmową.',
})

// TODO: Załadować dane z Sanity CMS (pageQuery dla slug='home')
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProofBar />
      <ProblemSection />
      <ProcessSection />
      <PersonaSection />
      <CtaSection />
      <FaqSection />
    </>
  )
}
