import { cn } from '@/lib/utils'
import type { ComponentPropsWithoutRef } from 'react'

interface BadgeProps extends ComponentPropsWithoutRef<'span'> {
  variant?: 'default' | 'primary' | 'success' | 'warning'
}

export function Badge({ variant = 'default', className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variant === 'default' && 'bg-[var(--color-neutral-100)] text-[var(--color-neutral-700)]',
        variant === 'primary' && 'bg-[var(--color-primary)] text-white',
        variant === 'success' && 'bg-green-100 text-green-700',
        variant === 'warning' && 'bg-yellow-100 text-yellow-700',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
