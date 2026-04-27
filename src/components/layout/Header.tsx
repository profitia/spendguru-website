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
    <header className="sticky top-0 z-50 w-full border-b border-[var(--color-neutral-200)] bg-white/95 backdrop-blur-sm">
      <Container>
        <div className="flex h-16 items-center justify-between lg:h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-2 font-bold text-xl text-[var(--color-foreground)]">
            <span className="text-[var(--color-primary)]">Spend</span>Guru
            <span className="hidden text-xs font-normal text-[var(--color-neutral-500)] sm:block">
              by Profitia
            </span>
          </Link>

          {/* Desktop nav — widoczna od lg (1024 px) */}
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

                {/* Dropdown */}
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

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            {/* CTA — tylko desktop (lg+) */}
            <Button href={ctaNav.href} size="sm" className="hidden lg:inline-flex whitespace-nowrap">
              {ctaNav.label}
            </Button>

            {/* Hamburger — mobile i tablet (poniżej lg) */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 text-[var(--color-neutral-700)] hover:text-[var(--color-primary)]"
              aria-label="Otwórz menu"
              aria-expanded={mobileOpen}
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
                <path d="M3 5h16M3 11h16M3 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile nav */}
      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  )
}
