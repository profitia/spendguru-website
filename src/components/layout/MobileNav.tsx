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
      {/* Overlay: fixed inset-0 z-40 — zawsze w DOM, widoczność przez opacity */}
      <div
        aria-hidden="true"
        onClick={onClose}
        style={{ display: isOpen ? 'block' : 'none' }}
        className="fixed inset-0 z-40 bg-black/40"
      />

      {/* Drawer: fixed inset-y-0 right-0 z-50 — wysuwa się z prawej, zawsze w DOM */}
      <div
        id={id}
        role="dialog"
        aria-modal="true"
        aria-label="Menu mobilne"
        className="fixed inset-y-0 right-0 z-50 w-full max-w-sm flex flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out"
        style={{ transform: isOpen ? 'translateX(0)' : 'translateX(100%)' }}
      >
        {/* Nagłówek drawera — logo + przycisk X */}
        <div className="flex shrink-0 items-center justify-between px-5 py-4 border-b border-gray-200">
          <Link
            href="/"
            onClick={onClose}
            className="shrink-0 font-bold text-lg text-gray-900 leading-none"
          >
            <span className="text-[var(--color-primary)]">Spend</span>Guru
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label="Zamknij menu"
            className="inline-flex items-center justify-center w-9 h-9 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
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

        {/* Nawigacja — rośnie do dostępnej przestrzeni, scrolluje gdy potrzeba */}
        <nav
          className="flex-1 overflow-y-auto px-5 py-4"
          aria-label="Menu mobilne"
        >
          <ul>
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center py-3 text-base font-medium text-gray-900 border-b border-gray-100 hover:text-[var(--color-primary)] transition-colors"
                >
                  {item.label}
                </Link>

                {/* Podlinki (np. "Zastosowania") */}
                {item.children && item.children.length > 0 && (
                  <ul className="my-1 ml-3 border-l-2 border-gray-100">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          onClick={onClose}
                          className="flex items-center py-2 pl-4 text-sm text-gray-500 hover:text-[var(--color-primary)] transition-colors"
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
