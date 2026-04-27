import { Container } from '@/components/layout/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import type { ProcessBlock } from '@/sanity/types/sanity.types'
import { placeholderProcess } from '@/data/placeholder-content'

interface ProcessSectionProps {
  data?: ProcessBlock
}

export function ProcessSection({ data }: ProcessSectionProps) {
  const heading = data?.heading ?? placeholderProcess.heading
  const steps = data?.steps ?? placeholderProcess.steps

  return (
    <section className="py-[var(--spacing-section)] bg-white">
      <Container>
        <SectionHeader
          label="Jak to działa"
          heading={heading}
          className="mb-16"
        />
        <ol className="relative flex flex-col gap-0">
          {steps.map((step, i) => (
            <li key={i} className="relative flex gap-8 pb-12 last:pb-0">
              {/* Vertical line */}
              {i < steps.length - 1 && (
                <div
                  className="absolute left-5 top-10 bottom-0 w-px bg-[var(--color-neutral-200)]"
                  aria-hidden
                />
              )}
              {/* Step number */}
              <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-[var(--color-primary)] text-white font-bold text-sm z-10">
                {step.number}
              </div>
              {/* Content */}
              <div className="pt-1.5">
                <h3 className="text-lg font-semibold text-[var(--color-neutral-900)] mb-2">
                  {step.title}
                </h3>
                <p className="text-[var(--color-neutral-500)] leading-relaxed">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}

