import type { Metadata } from 'next'
import { Container } from '@/components/layout/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Card } from '@/components/ui/Card'
import { CtaSection } from '@/components/sections/CtaSection'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  metaTitle: 'Etapy przygotowania negocjacji - SpendGuru',
  metaDescription: 'Poznaj strukturyzowany proces przygotowania negocjacji zakupowych - od analizy kategorii do gotowej strategii.',
})

const stages = [
  { number: '01', title: 'Analiza kategorii zakupowej', description: 'Zbieramy dane rynkowe, strukturę kosztów, dynamikę cen i pozycję dostawców w Twojej kategorii.' },
  { number: '02', title: 'Profilowanie dostawców', description: 'Analizujemy kondycję finansową, zależności, alternatywne opcje rynkowe i historię relacji handlowej.' },
  { number: '03', title: 'Benchmarking cenowy', description: 'Porównujemy warunki z rynkiem. Pokazujemy, gdzie jest margines i gdzie dostawca ma realną przewagę.' },
  { number: '04', title: 'Identyfikacja dźwigni negocjacyjnych', description: 'Wskazujemy konkretne argumenty, dane i scenariusze, które można wykorzystać w rozmowie.' },
  { number: '05', title: 'Budowanie pozycji i strategii', description: 'Pomagamy ułożyć plan negocjacji: cele minimalne, optymalne, BATNA i kluczowe ustępstwa.' },
  { number: '06', title: 'Wsparcie podczas i po', description: 'Eksperci Profitii dostępni w trakcie procesu. Analizujemy wynik i wyciągamy wnioski na przyszłość.' },
]

// TODO: Załadować dane z Sanity CMS
export default function StepsPage() {
  return (
    <>
      <section className="py-16 bg-white border-b border-[var(--color-neutral-200)]">
        <Container>
          <SectionHeader
            label="Etapy"
            heading="Jak przygotowujemy negocjacje"
            subheading="Powtarzalny, ustrukturyzowany proces - od danych do gotowej pozycji negocjacyjnej. Każdy etap można wdrożyć samodzielnie lub z ekspertami Profitii."
          />
        </Container>
      </section>
      <section className="py-16 bg-[var(--color-neutral-50)]">
        <Container>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {stages.map((stage) => (
              <Card key={stage.number} variant="bordered">
                <p className="text-2xl font-bold text-[var(--color-primary)] mb-2">{stage.number}</p>
                <h3 className="font-semibold text-[var(--color-neutral-900)] mb-2">{stage.title}</h3>
                <p className="text-sm text-[var(--color-neutral-500)] leading-relaxed">{stage.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>
      <CtaSection />
    </>
  )
}
