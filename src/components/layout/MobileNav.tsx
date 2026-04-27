'use client'

import Link from 'next/link'
import { mainNav, ctaNav } from '@/data/navigation'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 lg:hidden"
          onClick={onClose}
          aria-hidden
        />
      )}

      {/* Drawer */}
      <div
        className={cn(
          'fixed top-0 right-0 z-50 h-full w-full max-w-[360px] overflow-x-hidden overflow-y-auto bg-white shadow-[var(--shadow-lg)] transform transition-transform duration-300 lg:hidden',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
        aria-label="Menu mobilne"
        role="dialog"
        aria-modal
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-neutral-200)]">
          <span className="font-bold text-lg">
            <span className="text-[var(--color-primary)]">Spend</span>Guru
          </span>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-[var(--color-neutral-500)] hover:text-[var(--color-foreground)]"
            aria-label="Zamknij menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <nav className="px-5 py-4 flex flex-col gap-1">
          {mainNav.map((item) => (
            <div key={item.href}>
              <Link
                href={item.href}
                onClick={onClose}
                className="block py-2.5 text-base font-medium text-[var(--color-neutral-700)] hover:text-[var(--color-primary)]"
              >
                {item.label}
              </Link>
              {item.children && (
                <div className="ml-4 flex flex-col gap-1 border-l border-[var(--color-neutral-200)] pl-3">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={onClose}
                      className="block py-1.5 text-sm text-[var(--color-neutral-500)] hover:text-[var(--color-primary)]"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="px-5 pt-2">
          <Button href={ctaNav.href} className="w-full" onClick={onClose}>
            {ctaNav.label}
          </Button>
        </div>
      </div>
    </>
  )
}
