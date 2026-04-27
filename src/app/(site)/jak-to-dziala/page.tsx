import type { Metadata } from 'next'
import { Container } from '@/components/layout/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { CtaSection } from '@/components/sections/CtaSection'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  metaTitle: 'Jak to działa - SpendGuru',
  metaDescription: 'Zobacz, jak SpendGuru pomaga przygotować negocjacje z dostawcami - krok po kroku.',
})

// TODO: Załadować dane z Sanity CMS (pageQuery dla slug='jak-to-dziala')
export default function HowItWorksPage() {
  return (
    <>
      <section className="py-16 bg-white border-b border-[var(--color-neutral-200)]">
        <Container>
          <SectionHeader
            label="Jak to działa"
            heading="Negotiation Intelligence w praktyce"
            subheading="SpendGuru to nie kolejny dashboard. To ustrukturyzowane wsparcie przygotowania negocjacji - od danych po gotową pozycję negocjacyjną."
          />
        </Container>
      </section>
      <ProcessSection />
      <CtaSection />
    </>
  )
}
