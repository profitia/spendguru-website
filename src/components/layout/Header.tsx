'use client'

import { useState } from 'react'
import Link from 'next/link'
import { mainNav, ctaNav } from '@/data/navigation'
import { Button } from '@/components/ui/Button'
import { Container } from './Container'
import MobileNav from './MobileNav'
import { cn } from '@/lib/utils'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-[var(--color-neutral-200)] bg-white/95 backdrop-blur-sm">
        <Container>
          <div className="flex h-16 items-center justify-between lg:h-[72px]">

            {/* Logo — shrink-0 zapobiega ściskaniu */}
            <Link
              href="/"
              className="shrink-0 flex items-center gap-2 font-bold text-xl text-[var(--color-foreground)]"
            >
              <span className="text-[var(--color-primary)]">Spend</span>Guru
              <span className="hidden text-xs font-normal text-[var(--color-neutral-500)] sm:block">
                by Profitia
              </span>
            </Link>

            {/* Desktop nav — wyłącznie od lg (≥1024px) */}
            <nav className="hidden lg:flex items-center gap-5" aria-label="Nawigacja główna">
              {mainNav.map((item) => (
                <div key={item.href} className="relative group">
                  <Link
                    href={item.href}
                    className={cn(
                      'whitespace-nowrap text-sm font-medium text-[var(--color-neutral-700)]',
                      'hover:text-[var(--color-primary)] transition-colors duration-[var(--transition-fast)]',
                    )}
                  >
                    {item.label}
                  </Link>

                  {item.children && (
                    <div className="absolute top-full left-0 mt-1 hidden group-hover:block w-56 rounded-[var(--radius-md)] border border-[var(--color-neutral-200)] bg-white shadow-[var(--shadow-lg)] py-1 z-50">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-[var(--color-neutral-700)] hover:bg-[var(--color-neutral-50)] hover:text-[var(--color-primary)]"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Prawa strona — CTA (desktop) + hamburger (mobile/tablet) */}
            <div className="flex items-center gap-2">
              {/*
                CTA widoczne TYLKO na desktop (lg+).
                Wrapper 'hidden lg:block' kontroluje wyświetlanie niezależnie
                od klas wewnętrznych Button — unika konfliktu z base 'inline-flex'.
              */}
              <div className="hidden lg:block">
                <Button href={ctaNav.href} size="sm" className="whitespace-nowrap">
                  {ctaNav.label}
                </Button>
              </div>

              {/* Hamburger — TYLKO mobile i tablet (poniżej lg) */}
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-[var(--color-neutral-700)] hover:text-[var(--color-primary)] hover:bg-[var(--color-neutral-100)] transition-colors"
                aria-label="Otwórz menu"
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M4 6h16M4 12h16M4 18h16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

          </div>
        </Container>
      </header>

      {/* MobileNav poza <header> — fixed positioning nie zależy od rodzica */}
      <MobileNav
        id="mobile-nav"
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </>
  )
}
