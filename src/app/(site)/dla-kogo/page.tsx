import type { Metadata } from 'next'
import { PersonaSection } from '@/components/sections/PersonaSection'
import { CtaSection } from '@/components/sections/CtaSection'
import { Container } from '@/components/layout/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  metaTitle: 'Dla kogo jest SpendGuru?',
  metaDescription: 'SpendGuru wspiera dyrektorów zakupów, kupców, category managerów i zarząd w przygotowaniu lepszych negocjacji.',
})

// TODO: Załadować persony z Sanity CMS (allPersonasQuery)
export default function ForWhomPage() {
  return (
    <>
      <section className="py-16 bg-white border-b border-[var(--color-neutral-200)]">
        <Container>
          <SectionHeader
            label="Dla kogo"
            heading="SpendGuru dla Twojej roli"
            subheading="Niezależnie od tego, czy jesteś CPO, kupcem czy CFO - SpendGuru dostarcza wartość dostosowaną do Twojej odpowiedzialności."
          />
        </Container>
      </section>
      <PersonaSection />
      <CtaSection />
    </>
  )
}
