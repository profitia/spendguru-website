import { Button } from '@/components/ui/Button'
import { Container } from '@/components/layout/Container'
import type { HeroBlock } from '@/sanity/types/sanity.types'
import { placeholderHero } from '@/data/placeholder-content'

interface HeroSectionProps {
  data?: HeroBlock
}

export function HeroSection({ data }: HeroSectionProps) {
  const hero = data ?? placeholderHero

  return (
    <section className="relative bg-white py-20 sm:py-28 lg:py-36">
      <Container>
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-[var(--color-neutral-900)] sm:text-5xl lg:text-6xl leading-tight">
            {hero.heading}
          </h1>
          {hero.subheading && (
            <p className="mt-6 text-lg text-[var(--color-neutral-500)] leading-relaxed sm:text-xl max-w-2xl">
              {hero.subheading}
            </p>
          )}
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
            {hero.ctaPrimary && (
              <Button href={hero.ctaPrimaryUrl || '/umow-bezplatne-wsparcie-negocjacji'} size="lg">
                {hero.ctaPrimary}
              </Button>
            )}
            {hero.ctaSecondary && (
              <Button
                href={hero.ctaSecondaryUrl || '/jak-to-dziala'}
                size="lg"
                variant="ghost"
              >
                {hero.ctaSecondary}
              </Button>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
