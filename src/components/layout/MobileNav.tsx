'use client'

import Link from 'next/link'
import { mainNav, ctaNav } from '@/data/navigation'
import { Button } from '@/components/ui/Button'

interface MobileNavProps {
  id?: string
  isOpen: boolean
  onClose: () => void
}

export default function MobileNav({ id, isOpen, onClose }: MobileNavProps) {
  return (
    <>
      {/* Overlay — klikalny, zamyka menu. Widoczny tylko gdy isOpen i poniżej lg */}
      <div
        className={[
          'fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 lg:hidden',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        ].join(' ')}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer — wysuwa się z prawej strony */}
      <div
        id={id}
        role="dialog"
        aria-modal="true"
        aria-label="Menu mobilne"
        className={[
          'fixed top-0 right-0 z-50 h-dvh w-full max-w-[360px]',
          'flex flex-col bg-white shadow-xl',
          'transform transition-transform duration-300 ease-in-out lg:hidden',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        ].join(' ')}
      >
        {/* Header drawera — logo + przycisk zamknięcia */}
        <div className="flex shrink-0 items-center justify-between px-5 py-4 border-b border-gray-200">
          <Link
            href="/"
            onClick={onClose}
            className="font-bold text-lg text-gray-900"
          >
            <span className="text-[var(--color-primary)]">Spend</span>Guru
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label="Zamknij menu"
            className="flex items-center justify-center w-9 h-9 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M4 4l12 12M16 4L4 16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Nawigacja — flex-1 + overflow-y-auto, żeby linki były zawsze widoczne */}
        <nav className="flex-1 overflow-y-auto px-5 py-5" aria-label="Menu mobilne">
          <ul className="flex flex-col gap-0">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center py-3 text-base font-medium text-gray-800 hover:text-[var(--color-primary)] border-b border-gray-100 transition-colors"
                >
                  {item.label}
                </Link>
                {/* Podlinki */}
                {item.children && item.children.length > 0 && (
                  <ul className="ml-4 mb-1 flex flex-col border-l-2 border-gray-100">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          onClick={onClose}
                          className="flex items-center py-2 pl-3 text-sm text-gray-500 hover:text-[var(--color-primary)] transition-colors"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA — przypięte na dole drawera */}
        <div className="shrink-0 px-5 py-5 border-t border-gray-200">
          <Button href={ctaNav.href} className="w-full" onClick={onClose}>
            {ctaNav.label}
          </Button>
        </div>
      </div>
    </>
  )
}
