import { type ClassValue, clsx } from 'clsx'

/** Łączy klasy Tailwind z warunkami. Wymaga: npm install clsx */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

/** Formatuje datę ISO do czytelnej formy PL */
export function formatDate(dateString: string, locale = 'pl-PL'): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateString))
}

/** Truncate tekstu do N znaków */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength)}...`
}

/** Tworzy absolutny URL na podstawie zmiennej środowiskowej */
export function absoluteUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://spendguru.pl'
  return `${base}${path}`
}
