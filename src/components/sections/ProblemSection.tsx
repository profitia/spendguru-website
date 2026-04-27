import { Container } from '@/components/layout/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Card } from '@/components/ui/Card'
import { placeholderProblem } from '@/data/placeholder-content'

interface ProblemCard {
  title: string
  description: string
}

interface ProblemSectionProps {
  heading?: string
  subheading?: string
  cards?: ProblemCard[]
}

export function ProblemSection({
  heading = placeholderProblem.heading,
  subheading = placeholderProblem.subheading,
  cards = placeholderProblem.cards,
}: ProblemSectionProps) {
  return (
    <section className="py-[var(--spacing-section)] bg-[var(--color-neutral-50)]">
      <Container>
        <SectionHeader
          label="Problem"
          heading={heading}
          subheading={subheading}
          className="mb-12"
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((point, i) => (
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
