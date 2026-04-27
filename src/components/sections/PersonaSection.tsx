import { Container } from '@/components/layout/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import type { PersonaBlock } from '@/sanity/types/sanity.types'
import { placeholderPersonas } from '@/data/placeholder-content'

interface PersonaSectionProps {
  data?: PersonaBlock
}

export function PersonaSection({ data }: PersonaSectionProps) {
  const heading = data?.heading ?? 'Dla kogo jest SpendGuru?'
  const personas = data?.personas ?? placeholderPersonas

  return (
    <section className="py-[var(--spacing-section)] bg-white">
      <Container>
        <SectionHeader
          label="Dla kogo"
          heading={heading}
          subheading="SpendGuru wspiera osoby odpowiedzialne za negocjacje i wyniki zakupowe - niezależnie od poziomu w organizacji."
          className="mb-12"
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {personas.map((persona, i) => (
            <Card key={i} variant="bordered" className="flex flex-col gap-4">
              <div>
                <Badge variant="primary" className="mb-3">{(persona as { role?: string }).role || (persona as { title: string }).title}</Badge>
                <h3 className="font-semibold text-[var(--color-neutral-900)]">
                  {(persona as { title: string }).title}
                </h3>
                <p className="mt-2 text-sm text-[var(--color-neutral-500)] leading-relaxed">
                  {(persona as { description?: string }).description}
                </p>
              </div>
              {(persona as { benefits?: string[] }).benefits && (
                <ul className="flex flex-col gap-1.5">
                  {((persona as { benefits: string[] }).benefits).slice(0, 3).map((benefit, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-[var(--color-neutral-700)]">
                      <span className="text-[var(--color-success)] mt-0.5" aria-hidden>✓</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}
