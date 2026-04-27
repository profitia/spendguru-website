import { Container } from '@/components/layout/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { placeholderFaq } from '@/data/placeholder-content'

interface FaqItem {
  question: string
  answer: string
}

interface FaqSectionProps {
  items?: FaqItem[]
  heading?: string
}

export function FaqSection({ items = placeholderFaq, heading = 'Najczęstsze pytania' }: FaqSectionProps) {
  return (
    <section className="py-[var(--spacing-section)] bg-[var(--color-neutral-50)]">
      <Container>
        <SectionHeader heading={heading} align="center" className="mb-12" />
        <div className="max-w-3xl mx-auto flex flex-col divide-y divide-[var(--color-neutral-200)]">
          {items.map((item, i) => (
            <details key={i} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-[var(--color-neutral-900)]">
                {item.question}
                <span className="ml-auto flex-shrink-0 text-[var(--color-neutral-400)] group-open:rotate-180 transition-transform">
                  ▾
                </span>
              </summary>
              <p className="mt-3 text-[var(--color-neutral-500)] leading-relaxed text-sm">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  )
}
