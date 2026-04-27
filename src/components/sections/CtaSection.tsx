import { Container } from '@/components/layout/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { MAIN_CTA } from '@/lib/constants'

interface CtaSectionProps {
  heading?: string
  subheading?: string
  ctaLabel?: string
  ctaUrl?: string
  ctaSecondary?: { label: string; href: string }[]
  variant?: 'default' | 'dark' | 'brand'
}

export function CtaSection({
  heading = 'Zanim następna runda negocjacyjna — zadbaj o przygotowanie.',
  subheading = 'Umów bezpłatne wsparcie i sprawdź, jak SpendGuru wzmocni Twój kolejny przetarg z dostawcą.',
  ctaLabel = MAIN_CTA.label,
  ctaUrl = MAIN_CTA.href,
  ctaSecondary = [
    { label: 'Zobacz, jak to działa', href: '/jak-to-dziala' },
    { label: 'Poznaj etapy przygotowania', href: '/etapy-przygotowania-negocjacji' },
  ],
  variant = 'default',
}: CtaSectionProps) {
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
          <div className="mt-10 flex flex-col items-center gap-4">
            <Button href={ctaUrl} size="lg">
              {ctaLabel}
            </Button>
            {ctaSecondary.length > 0 && (
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                {ctaSecondary.map((item) => (
                  <Button key={item.href} href={item.href} variant="ghost" size="sm">
                    {item.label}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
