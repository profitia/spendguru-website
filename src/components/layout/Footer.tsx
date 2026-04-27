import Link from 'next/link'
import { footerNav } from '@/data/navigation'
import { Container } from './Container'
import { SITE, MAIN_CTA } from '@/lib/constants'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[var(--color-neutral-200)] bg-[var(--color-neutral-50)]">
      <Container>
        <div className="py-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <p className="font-bold text-lg text-[var(--color-foreground)] mb-2">
              <span className="text-[var(--color-primary)]">Spend</span>Guru
            </p>
            <p className="text-sm text-[var(--color-neutral-500)] leading-relaxed max-w-xs">
              Negotiation Intelligence dla zespołów zakupowych. Lepsze przygotowanie. Lepsze negocjacje. Lepszy wynik.
            </p>
            <p className="mt-4 text-xs text-[var(--color-neutral-400)]">
              Produkt {SITE.company}
            </p>
          </div>

          {/* Nav columns */}
          {Object.values(footerNav).map((section) => (
            <div key={section.label}>
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-neutral-400)] mb-4">
                {section.label}
              </p>
              <ul className="flex flex-col gap-2">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-[var(--color-neutral-500)] hover:text-[var(--color-primary)] transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-[var(--color-neutral-200)] flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[var(--color-neutral-400)]">
            © {year} {SITE.company}. Wszelkie prawa zastrzeżone.
          </p>
          <div className="flex gap-4 text-xs text-[var(--color-neutral-400)]">
            <Link href="/polityka-prywatnosci" className="hover:text-[var(--color-primary)]">
              Polityka prywatności
            </Link>
            <Link href="/regulamin" className="hover:text-[var(--color-primary)]">
              Regulamin
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}
