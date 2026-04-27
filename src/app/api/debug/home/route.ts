/**
 * GET /api/debug/home
 * Diagnostyczny endpoint — sprawdza połączenie z Sanity i pobiera stronę główną.
 *
 * UWAGA: Usuń ten plik przed wdrożeniem produkcyjnym lub ogranicz dostęp.
 * Nie zwraca żadnych sekretów (tokenów, kluczy).
 */

import { NextResponse } from 'next/server'
import { previewClient, projectId, dataset, apiVersion, isSanityConfigured } from '@/sanity/lib/client'
import { homePageQuery } from '@/sanity/lib/queries'

export const dynamic = 'force-dynamic'

export async function GET() {
  const envInfo = {
    hasProjectId: Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID),
    hasDataset: Boolean(process.env.NEXT_PUBLIC_SANITY_DATASET),
    hasReadToken: Boolean(process.env.SANITY_API_READ_TOKEN),
    apiVersion,
    projectId,
    dataset,
    isSanityConfigured,
    nodeEnv: process.env.NODE_ENV,
  }

  // Jeśli Sanity nie jest skonfigurowane, zwróć tylko informacje o env
  if (!isSanityConfigured) {
    return NextResponse.json({
      status: 'NOT_CONFIGURED',
      message: 'NEXT_PUBLIC_SANITY_PROJECT_ID jest puste — Sanity nie jest skonfigurowane.',
      env: envInfo,
    })
  }

  // Spróbuj pobrać dokument strony głównej
  let document: Record<string, unknown> | null = null
  let fetchError: string | null = null
  let rawResult: unknown = undefined

  try {
    rawResult = await previewClient.fetch(homePageQuery)
    document = rawResult as Record<string, unknown> | null
  } catch (err: unknown) {
    fetchError = err instanceof Error ? err.message : String(err)
  }

  // Bezpieczne wyciągnięcie info o sekcjach bez zwracania pełnych danych
  const sections = document?.sections
  const sectionsArray = Array.isArray(sections) ? sections : null

  const firstSection = sectionsArray?.[0] as Record<string, unknown> | undefined
  const firstSectionType = firstSection?._type as string | undefined
  const firstSectionHeading =
    (firstSection?.heading as string | undefined) ??
    (firstSection?.label as string | undefined) ??
    null

  return NextResponse.json({
    status: document ? 'OK' : fetchError ? 'ERROR' : 'NOT_FOUND',
    env: envInfo,
    fetch: {
      error: fetchError,
      documentFound: Boolean(document),
      documentId: (document?._id as string) ?? null,
      documentTitle: (document?.title as string) ?? null,
      language: (document?.language as string) ?? null,
      sectionCount: sectionsArray?.length ?? null,
      firstSectionType: firstSectionType ?? null,
      firstSectionHeading,
      allSectionTypes:
        sectionsArray?.map((s) => (s as Record<string, unknown>)._type) ?? null,
    },
    groqQuery: homePageQuery,
  })
}
