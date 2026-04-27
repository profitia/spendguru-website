import { cn } from '@/lib/utils'
import type { ComponentPropsWithoutRef } from 'react'

interface CardProps extends ComponentPropsWithoutRef<'div'> {
  variant?: 'default' | 'bordered' | 'elevated'
}

export function Card({ variant = 'default', className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-[var(--radius-lg)] p-6',
        variant === 'default' && 'bg-[var(--color-neutral-50)]',
        variant === 'bordered' && 'border border-[var(--color-neutral-200)] bg-white',
        variant === 'elevated' && 'bg-white shadow-[var(--shadow-md)]',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
