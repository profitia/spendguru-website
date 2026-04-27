import type { Metadata } from 'next'
import { Container } from '@/components/layout/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ResourceGrid } from '@/components/sections/ResourceGrid'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  metaTitle: 'Wiedza i zasoby - SpendGuru',
  metaDescription: 'Artykuły, przewodniki, case studies i materiały do pobrania o negocjacjach zakupowych.',
})

// TODO: Załadować posty z Sanity CMS (allPostsQuery)
export default function KnowledgePage() {
  return (
    <>
      <section className="py-16 bg-white border-b border-[var(--color-neutral-200)]">
        <Container>
          <SectionHeader
            label="Wiedza"
            heading="Wiedza i zasoby negocjacyjne"
            subheading="Artykuły, przewodniki, case studies i materiały do pobrania przygotowane przez ekspertów Profitii."
          />
        </Container>
      </section>
      <ResourceGrid posts={[]} heading="Ostatnie artykuły" />
    </>
  )
}
