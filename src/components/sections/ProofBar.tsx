import { Container } from '@/components/layout/Container'
import { placeholderProofBar } from '@/data/placeholder-content'

interface ProofBarItem {
  value: string
  label: string
}

interface ProofBarProps {
  items?: ProofBarItem[]
}

export function ProofBar({ items = placeholderProofBar.items }: ProofBarProps) {
  return (
    <div className="border-y border-[var(--color-neutral-200)] bg-[var(--color-neutral-50)] py-8">
      <Container>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {items.map((item, i) => (
            <div key={i} className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-[var(--color-primary)]">
                {item.value}
              </p>
              <p className="mt-1 text-xs text-[var(--color-neutral-500)] leading-snug">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}
