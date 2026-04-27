import { Container } from '@/components/layout/Container'
import type { ProofBarBlock } from '@/sanity/types/sanity.types'

interface ProofBarProps {
  data?: ProofBarBlock
}

export function ProofBar({ data }: ProofBarProps) {
  const items = data?.items ?? []
  const label = data?.label ?? 'Zaufali nam'

  if (!items.length) return null

  return (
    <div className="border-y border-[var(--color-neutral-200)] bg-[var(--color-neutral-50)] py-6">
      <Container>
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:flex-wrap sm:justify-center">
          {label && (
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-neutral-400)]">
              {label}
            </p>
          )}
          <div className="flex flex-wrap justify-center gap-8">
            {items.map((item, i) => (
              <div key={i} className="text-sm text-[var(--color-neutral-400)] font-medium">
                {item.value}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}
