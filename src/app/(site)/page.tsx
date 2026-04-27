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
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  metaTitle: 'SpendGuru - Negotiation Intelligence dla zespołów zakupowych',
  metaDescription:
    'SpendGuru pomaga zespołom zakupowym lepiej przygotować negocjacje z dostawcami. Dane kosztowe, benchmarki, prognozy i eksperci Profitii - przed każdą ważną rozmową.',
})

// TODO: Załadować dane z Sanity CMS (pageQuery dla slug='home')
export default function HomePage() {
  return (
    <>
      {/* 1. Propozycja wartości */}
      <HeroSection />

      {/* 2. Liczby / social proof */}
      <ProofBar />

      {/* 3. Problem: dlaczego negocjacje są trudniejsze */}
      <ProblemSection />

      {/* 4. 5 pytań przed negocjacjami */}
      <FiveQuestionsSection />

      {/* 5. Jak wygląda lepsze przygotowanie — 6 etapów SpendGuru */}
      <ProcessSection />

      {/* 6. Efekty biznesowe */}
      <BusinessOutcomesSection />

      {/* 7. Dla kogo */}
      <PersonaSection />

      {/* 8. Przykład z praktyki */}
      <UseCaseSection />

      {/* 9. FAQ */}
      <FaqSection />

      {/* 10. Końcowe CTA */}
      <CtaSection />
    </>
  )
}
