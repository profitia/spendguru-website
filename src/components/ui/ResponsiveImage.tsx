import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import type { SanityImage } from '@/sanity/types/sanity.types'
import { cn } from '@/lib/utils'

interface ResponsiveImageProps {
  image: SanityImage
  alt: string
  width?: number
  height?: number
  priority?: boolean
  className?: string
  fill?: boolean
}

export function ResponsiveImage({
  image,
  alt,
  width = 800,
  height = 600,
  priority = false,
  className,
  fill = false,
}: ResponsiveImageProps) {
  const src = urlFor(image).width(width * 2).url()

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className={cn('object-cover', className)}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={cn('w-full h-auto', className)}
    />
  )
}
