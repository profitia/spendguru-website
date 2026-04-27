import { cn } from '@/lib/utils'
import type { ComponentPropsWithoutRef } from 'react'

interface ContainerProps extends ComponentPropsWithoutRef<'div'> {
  as?: 'div' | 'section' | 'main' | 'article' | 'aside'
}

export function Container({ as: Tag = 'div', className, children, ...props }: ContainerProps) {
  return (
    <Tag
      className={cn(
        'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8',
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}
