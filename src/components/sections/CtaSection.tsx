import { Container } from '@/components/layout/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'
import type { CtaBlock } from '@/sanity/types/sanity.types'
import { cn } from '@/lib/utils'
import { MAIN_CTA } from '@/lib/constants'

interface CtaSectionProps {
  data?: CtaBlock
}

export function CtaSection({ data }: CtaSectionProps) {
  const heading = data?.heading ?? 'Gotowy na lepsze negocjacje?'
  const subheading = data?.subheading ?? 'Umów bezpłatne wsparcie i sprawdź, jak SpendGuru może wzmocnić Twój kolejny przetarg.'
  const ctaLabel = data?.ctaLabel ?? MAIN_CTA.label
  const ctaUrl = data?.ctaUrl ?? MAIN_CTA.href
  const variant = data?.variant ?? 'default'

  return (
    <section
      className={cn(
        'py-[var(--spacing-section)]',
        variant === 'dark' && 'bg-[var(--color-neutral-900)] text-white',
        variant === 'brand' && 'bg-[var(--color-primary)] text-white',
        variant === 'default' && 'bg-[var(--color-neutral-50)]',
      )}
    >
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <SectionHeader
            heading={heading}
            subheading={subheading}
            align="center"
          />
          <div className="mt-10">
            <Button
              href={ctaUrl}
              size="lg"
              variant={variant === 'default' ? 'primary' : 'secondary'}
            >
              {ctaLabel}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
