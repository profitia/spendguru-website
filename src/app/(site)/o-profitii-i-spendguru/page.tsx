import type { Metadata } from 'next'
import { Container } from '@/components/layout/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  metaTitle: 'O Profitii i SpendGuru',
  metaDescription: 'Profitia to firma specjalizująca się we wsparciu negocjacji zakupowych. SpendGuru to platforma Negotiation Intelligence.',
})

// TODO: Załadować dane z Sanity CMS
export default function AboutPage() {
  return (
    <>
      <section className="py-16 bg-white border-b border-[var(--color-neutral-200)]">
        <Container>
          <SectionHeader
            label="O nas"
            heading="Profitia i SpendGuru"
            subheading="Profitia to firma z wieloletnim doświadczeniem we wsparciu negocjacji zakupowych dla firm z sektora enterprise i mid-market. SpendGuru to platforma, która pakuje to doświadczenie w powtarzalny, skalowalny proces."
          />
        </Container>
      </section>
      <section className="py-16 bg-[var(--color-neutral-50)]">
        <Container className="max-w-3xl">
          <p className="text-[var(--color-neutral-400)] italic">
            Treść strony &ldquo;O Profitii i SpendGuru&rdquo; będzie zarządzana przez Sanity CMS.
          </p>
        </Container>
      </section>
    </>
  )
}
