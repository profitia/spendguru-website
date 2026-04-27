import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  label?: string
  heading: string
  subheading?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeader({
  label,
  heading,
  subheading,
  align = 'left',
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {label && (
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-primary)] mb-3">
          {label}
        </p>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-[var(--color-neutral-900)] sm:text-4xl">
        {heading}
      </h2>
      {subheading && (
        <p className="mt-4 text-lg text-[var(--color-neutral-500)] leading-relaxed">
          {subheading}
        </p>
      )}
    </div>
  )
}
