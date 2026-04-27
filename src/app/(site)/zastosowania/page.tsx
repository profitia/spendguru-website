import type { Metadata } from 'next'
import { Container } from '@/components/layout/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { CtaSection } from '@/components/sections/CtaSection'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  metaTitle: 'Zastosowania SpendGuru',
  metaDescription: 'Zobacz, w jakich sytuacjach SpendGuru pomaga zespołom zakupowym: renegocjacje, obrona budżetu, nowe kategorie i więcej.',
})

// TODO: Załadować use cases z Sanity CMS (allUseCasesQuery)
export default function UseCasesPage() {
  return (
    <>
      <section className="py-16 bg-white border-b border-[var(--color-neutral-200)]">
        <Container>
          <SectionHeader
            label="Zastosowania"
            heading="Kiedy SpendGuru pomaga najbardziej?"
            subheading="SpendGuru wspiera w konkretnych sytuacjach negocjacyjnych - od renegocjacji kontraktów po obrony budżetowe przed zarządem."
          />
        </Container>
      </section>
      <section className="py-16 bg-[var(--color-neutral-50)]">
        <Container>
          <p className="text-[var(--color-neutral-400)] italic">
            Use cases będą załadowane z Sanity CMS. Placeholder.
          </p>
        </Container>
      </section>
      <CtaSection />
    </>
  )
}
