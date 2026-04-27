import type { Metadata } from 'next'
import { Container } from '@/components/layout/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ContactForm } from '@/components/sections/ContactForm'
import { buildMetadata } from '@/lib/seo'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = buildMetadata({
  metaTitle: 'Umów bezpłatne wsparcie negocjacji - SpendGuru',
  metaDescription: 'Umów bezpłatną konsultację z ekspertami Profitii. Przeanalizujemy Twoją kategorię zakupową i pokażemy, jak SpendGuru może wzmocnić Twoje negocjacje.',
  noIndex: false,
})

export default function ContactPage() {
  return (
    <>
      <section className="py-16 bg-white border-b border-[var(--color-neutral-200)]">
        <Container>
          <SectionHeader
            label="Bezpłatne wsparcie"
            heading="Umów bezpłatne wsparcie negocjacji"
            subheading="Porozmawiamy o Twojej kategorii zakupowej, sprawdzimy gdzie jest potencjał i pokażemy, jak SpendGuru może pomóc przed następnymi negocjacjami."
          />
        </Container>
      </section>

      <section className="py-16 bg-[var(--color-neutral-50)]">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Form */}
            <div>
              <ContactForm />
            </div>

            {/* Info */}
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="font-semibold text-[var(--color-neutral-900)] mb-2">Jak przebiega wsparcie?</h3>
                <ol className="flex flex-col gap-2 text-sm text-[var(--color-neutral-500)]">
                  <li>1. Wypełniasz formularz lub dzwonisz.</li>
                  <li>2. W ciągu 24h kontaktuje się z Tobą ekspert Profitii.</li>
                  <li>3. Omawiamy Twoją kategorię zakupową i aktualną sytuację.</li>
                  <li>4. Pokazujemy, co możemy zrobić razem przed następnymi negocjacjami.</li>
                </ol>
              </div>
              <div>
                <h3 className="font-semibold text-[var(--color-neutral-900)] mb-2">Kontakt bezpośredni</h3>
                <p className="text-sm text-[var(--color-neutral-500)]">
                  E-mail: <a href={`mailto:${SITE.email}`} className="text-[var(--color-primary)] hover:underline">{SITE.email}</a>
                </p>
                <p className="text-sm text-[var(--color-neutral-500)] mt-1">
                  Telefon: <a href={`tel:${SITE.phone}`} className="text-[var(--color-primary)] hover:underline">{SITE.phone}</a>
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
