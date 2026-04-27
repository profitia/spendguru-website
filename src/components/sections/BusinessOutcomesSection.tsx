import { Container } from '@/components/layout/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { placeholderBusinessOutcomes } from '@/data/placeholder-content'

interface Outcome {
  title: string
  description: string
  metric: string | null
}

interface BusinessOutcomesSectionProps {
  heading?: string
  outcomes?: Outcome[]
}

export function BusinessOutcomesSection({
  heading = placeholderBusinessOutcomes.heading,
  outcomes = placeholderBusinessOutcomes.outcomes,
}: BusinessOutcomesSectionProps) {
  return (
    <section className="py-[var(--spacing-section)] bg-[var(--color-neutral-50)]">
      <Container>
        <SectionHeader
          label="Efekty biznesowe"
          heading={heading}
          className="mb-12"
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {outcomes.map((item, i) => (
            <div
              key={i}
              className="p-6 rounded-[var(--radius-lg)] bg-white border border-[var(--color-neutral-200)]"
            >
              <h3 className="font-semibold text-[var(--color-neutral-900)] mb-2 text-lg">
                {item.title}
              </h3>
              <p className="text-sm text-[var(--color-neutral-500)] leading-relaxed">
                {item.description}
              </p>
              {item.metric && (
                <p className="mt-3 text-xs text-[var(--color-neutral-400)] italic">
                  {item.metric}
                </p>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
