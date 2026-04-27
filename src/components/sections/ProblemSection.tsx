import { Container } from '@/components/layout/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Card } from '@/components/ui/Card'
import type { ProblemBlock } from '@/sanity/types/sanity.types'

interface ProblemSectionProps {
  data?: ProblemBlock
}

const defaultPainPoints = [
  {
    title: 'Dostawca jest lepiej przygotowany niż kupiec',
    description:
      'Dostawca zna swoje koszty, marżę i alternatywy. Zespół zakupowy często wchodzi na negocjacje bez równoważnych danych.',
  },
  {
    title: 'Podwyżki trudne do zakwestionowania bez danych',
    description:
      'Bez benchmarków rynkowych i analizy kosztowej dostawcy, każda podwyżka wydaje się "obiektywna".',
  },
  {
    title: 'Brak powtarzalnego standardu pracy negocjacyjnej',
    description:
      'Jakość przygotowania zależy od doświadczenia konkretnego kupca. Nie ma procesu, który można skalować.',
  },
]

export function ProblemSection({ data }: ProblemSectionProps) {
  const painPoints = data?.painPoints ?? defaultPainPoints
  const heading = data?.heading ?? 'Dlaczego negocjacje z dostawcami są tak trudne?'

  return (
    <section className="py-[var(--spacing-section)] bg-[var(--color-neutral-50)]">
      <Container>
        <SectionHeader
          label="Problem"
          heading={heading}
          subheading="Większość zespołów zakupowych idzie na negocjacje bez pełnego obrazu sytuacji. To kosztuje marżę, cash flow i wiarygodność."
          className="mb-12"
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {painPoints.map((point, i) => (
            <Card key={i} variant="bordered">
              <h3 className="font-semibold text-[var(--color-neutral-900)] mb-2">{point.title}</h3>
              <p className="text-sm text-[var(--color-neutral-500)] leading-relaxed">{point.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}
