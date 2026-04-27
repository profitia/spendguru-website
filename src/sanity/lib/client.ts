import { createClient } from 'next-sanity'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder'
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

export const isSanityConfigured = Boolean(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
)

// Token może być pusty string z .env — traktujemy to jako brak tokenu.
// UWAGA: Sanity ACL używa path("*") który NIE pasuje do IDs z kropką (np. singleton.home).
// Rozwiązanie A (stałe): zmień filter w manage.sanity.io → Access → Public group → path("**")
// Rozwiązanie B (tymczasowe): token do odczytu — fallback na write token (server-side, bezpieczne)
const readToken =
  process.env.SANITY_API_READ_TOKEN ||
  process.env.SANITY_API_WRITE_TOKEN ||
  undefined

/** Klient z CDN — do statycznych stron, gdzie akceptowalny jest krótki lag */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  token: readToken,
})

/** Klient bez CDN — zawsze świeże dane. Używany do ISR i Server Components. */
export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: readToken,
})
