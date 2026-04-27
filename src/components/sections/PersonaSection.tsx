import { Container } from '@/components/layout/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { placeholderPersonas } from '@/data/placeholder-content'

interface Persona {
  title: string
  role: string
  description: string
  painPoints: string[]
}

interface PersonaSectionProps {
  heading?: string
  personas?: Persona[]
}

export function PersonaSection({
  heading = 'Dla kogo jest SpendGuru?',
  personas = placeholderPersonas,
}: PersonaSectionProps) {
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
                <Badge variant="primary" className="mb-3">{persona.role}</Badge>
                <h3 className="font-semibold text-[var(--color-neutral-900)]">
                  {persona.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--color-neutral-500)] leading-relaxed">
                  {persona.description}
                </p>
              </div>
              {persona.painPoints.length > 0 && (
                <ul className="flex flex-col gap-1.5">
                  {persona.painPoints.slice(0, 3).map((point, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-[var(--color-neutral-700)]">
                      <span className="text-[var(--color-neutral-400)] mt-0.5" aria-hidden>—</span>
                      {point}
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
