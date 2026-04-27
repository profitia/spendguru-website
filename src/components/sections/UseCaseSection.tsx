import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'
import { placeholderUseCase } from '@/data/placeholder-content'

interface UseCaseSectionProps {
  label?: string
  heading?: string
  context?: string
  steps?: string[]
  result?: string
  cta?: string
  ctaUrl?: string
}

export function UseCaseSection({
  label = placeholderUseCase.label,
  heading = placeholderUseCase.heading,
  context = placeholderUseCase.context,
  steps = placeholderUseCase.steps,
  result = placeholderUseCase.result,
  cta = placeholderUseCase.cta,
  ctaUrl = placeholderUseCase.ctaUrl,
}: UseCaseSectionProps) {
  return (
    <section className="py-[var(--spacing-section)] bg-white">
      <Container>
        <div className="max-w-3xl mx-auto">
          {label && (
            <p className="text-sm font-semibold uppercase tracking-wider text-[var(--color-primary)] mb-4">
              {label}
            </p>
          )}
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-neutral-900)] leading-snug mb-6">
            {heading}
          </h2>

          {/* Kontekst */}
          <div className="p-5 rounded-[var(--radius-md)] bg-[var(--color-neutral-50)] border border-[var(--color-neutral-200)] mb-8">
            <p className="text-sm font-medium text-[var(--color-neutral-700)]">Sytuacja wyjściowa:</p>
            <p className="mt-1 text-[var(--color-neutral-600)] leading-relaxed">{context}</p>
          </div>

          {/* Kroki */}
          <div className="mb-8">
            <p className="text-sm font-semibold text-[var(--color-neutral-900)] uppercase tracking-wider mb-4">
              Co zrobił SpendGuru:
            </p>
            <ol className="flex flex-col gap-3">
              {steps.map((step, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-primary)] text-white text-xs flex items-center justify-center font-bold mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-[var(--color-neutral-600)] leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Wynik */}
          <div className="p-5 rounded-[var(--radius-md)] border-l-4 border-[var(--color-primary)] bg-[var(--color-neutral-50)] mb-8">
            <p className="text-sm font-medium text-[var(--color-neutral-700)] mb-1">Wynik:</p>
            <p className="text-[var(--color-neutral-800)] font-medium leading-relaxed">{result}</p>
          </div>

          <Button href={ctaUrl}>{cta}</Button>
        </div>
      </Container>
    </section>
  )
}
