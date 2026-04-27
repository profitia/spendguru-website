import type { Metadata } from 'next'
import { Container } from '@/components/layout/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Card } from '@/components/ui/Card'
import { CtaSection } from '@/components/sections/CtaSection'
import { buildMetadata } from '@/lib/seo'
import { placeholderIndustries } from '@/data/placeholder-content'

export const metadata: Metadata = buildMetadata({
  metaTitle: 'SpendGuru według branży',
  metaDescription: 'SpendGuru dostarcza dane rynkowe i wsparcie negocjacyjne dopasowane do specyfiki Twojej branży.',
})

// TODO: Załadować branże z Sanity CMS (allIndustriesQuery)
export default function IndustriesPage() {
  return (
    <>
      <section className="py-16 bg-white border-b border-[var(--color-neutral-200)]">
        <Container>
          <SectionHeader
            label="Branże"
            heading="SpendGuru w Twojej branży"
            subheading="Każda branża ma swoją specyfikę kategorii zakupowych, dostawców i ryzyk negocjacyjnych. SpendGuru dostarcza kontekst branżowy."
          />
        </Container>
      </section>
      <section className="py-16 bg-[var(--color-neutral-50)]">
        <Container>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {placeholderIndustries.map((industry) => (
              <Card key={industry.slug} variant="bordered" className="flex flex-col items-center gap-2 text-center p-5">
                <span className="text-3xl" aria-hidden>{industry.icon}</span>
                <span className="font-medium text-sm text-[var(--color-neutral-700)]">{industry.title}</span>
              </Card>
            ))}
          </div>
        </Container>
      </section>
      <CtaSection />
    </>
  )
}
