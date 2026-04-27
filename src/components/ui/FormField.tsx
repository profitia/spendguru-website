import { cn } from '@/lib/utils'
import type { ComponentPropsWithoutRef } from 'react'

interface FormFieldProps extends ComponentPropsWithoutRef<'input'> {
  label: string
  error?: string
  required?: boolean
}

export function FormField({
  label,
  error,
  required,
  className,
  id,
  ...props
}: FormFieldProps) {
  const fieldId = id || label.toLowerCase().replace(/\s/g, '-')

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={fieldId} className="text-sm font-medium text-[var(--color-neutral-700)]">
        {label}
        {required && <span className="text-[var(--color-error)] ml-1" aria-hidden>*</span>}
      </label>
      <input
        id={fieldId}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${fieldId}-error` : undefined}
        className={cn(
          'rounded-[var(--radius-md)] border border-[var(--color-neutral-300)] px-3 py-2.5 text-base',
          'placeholder:text-[var(--color-neutral-400)]',
          'focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-20',
          'transition-colors duration-[var(--transition-fast)]',
          error && 'border-[var(--color-error)]',
          className,
        )}
        {...props}
      />
      {error && (
        <p id={`${fieldId}-error`} className="text-sm text-[var(--color-error)]" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
