import { defineType, defineField } from 'sanity'

/**
 * Bloki sekcji — budulce stron i landing pages.
 * Redaktor składa stronę z gotowych bloków. Elastyczne, ale kontrolowane.
 */

export const heroBlock = defineType({
  name: 'heroBlock',
  title: 'Hero',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Nagłówek', type: 'string' }),
    defineField({ name: 'subheading', title: 'Podtytuł', type: 'text', rows: 2 }),
    defineField({ name: 'ctaPrimary', title: 'CTA główne', type: 'string' }),
    defineField({ name: 'ctaPrimaryUrl', title: 'URL CTA głównego', type: 'string' }),
    defineField({ name: 'ctaSecondary', title: 'CTA dodatkowe', type: 'string' }),
    defineField({ name: 'ctaSecondaryUrl', title: 'URL CTA dodatkowego', type: 'string' }),
    defineField({ name: 'image', title: 'Obraz (opcjonalnie)', type: 'image', options: { hotspot: true } }),
  ],
  preview: { select: { title: 'heading' } },
})

export const proofBarBlock = defineType({
  name: 'proofBarBlock',
  title: 'Proof Bar (loga/liczby)',
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Etykieta', type: 'string' }),
    defineField({
      name: 'items',
      title: 'Elementy',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'value', title: 'Wartość / Logo', type: 'string' }),
            defineField({ name: 'label', title: 'Opis', type: 'string' }),
          ],
        },
      ],
    }),
  ],
  preview: { select: { title: 'label' } },
})

export const problemBlock = defineType({
  name: 'problemBlock',
  title: 'Problem',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Nagłówek', type: 'string' }),
    defineField({ name: 'subheading', title: 'Podtytuł', type: 'text', rows: 2 }),
    defineField({ name: 'body', title: 'Treść (opcjonalnie)', type: 'blockContent' }),
    defineField({
      name: 'cards',
      title: 'Karty problemów',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Tytuł', type: 'string' }),
            defineField({ name: 'description', title: 'Opis', type: 'text' }),
          ],
        },
      ],
    }),
  ],
  preview: { select: { title: 'heading' } },
})

export const processBlock = defineType({
  name: 'processBlock',
  title: 'Proces',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Nagłówek', type: 'string' }),
    defineField({ name: 'subheading', title: 'Podtytuł', type: 'string' }),
    defineField({
      name: 'steps',
      title: 'Kroki procesu',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'number', title: 'Numer', type: 'number' }),
            defineField({ name: 'title', title: 'Tytuł kroku', type: 'string' }),
            defineField({ name: 'description', title: 'Opis', type: 'text' }),
          ],
        },
      ],
    }),
  ],
  preview: { select: { title: 'heading' } },
})

export const stepsBlock = defineType({
  name: 'stepsBlock',
  title: 'Etapy przygotowania',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Nagłówek', type: 'string' }),
    defineField({
      name: 'steps',
      title: 'Etapy',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Tytuł etapu', type: 'string' }),
            defineField({ name: 'description', title: 'Opis', type: 'text' }),
            defineField({ name: 'details', title: 'Szczegóły (opcjonalnie)', type: 'blockContent' }),
          ],
        },
      ],
    }),
  ],
  preview: { select: { title: 'heading' } },
})

export const personaBlock = defineType({
  name: 'personaBlock',
  title: 'Dla kogo',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Nagłówek', type: 'string' }),
    defineField({
      name: 'personas',
      title: 'Persony',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'persona' }] }],
    }),
  ],
  preview: { select: { title: 'heading' } },
})

export const useCaseBlock = defineType({
  name: 'useCaseBlock',
  title: 'Zastosowania',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Nagłówek', type: 'string' }),
    defineField({
      name: 'useCases',
      title: 'Use Cases',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'useCase' }] }],
    }),
  ],
  preview: { select: { title: 'heading' } },
})

export const industryBlock = defineType({
  name: 'industryBlock',
  title: 'Branże',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Nagłówek', type: 'string' }),
    defineField({
      name: 'industries',
      title: 'Branże',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'industry' }] }],
    }),
  ],
  preview: { select: { title: 'heading' } },
})

export const resourceGridBlock = defineType({
  name: 'resourceGridBlock',
  title: 'Siatka zasobów',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Nagłówek', type: 'string' }),
    defineField({ name: 'resourceType', title: 'Typ zasobów', type: 'string', options: { list: ['post', 'resource', 'caseStudy'] } }),
    defineField({ name: 'limit', title: 'Ile elementów', type: 'number', initialValue: 6 }),
  ],
  preview: { select: { title: 'heading' } },
})

export const faqBlock = defineType({
  name: 'faqBlock',
  title: 'FAQ',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Nagłówek', type: 'string' }),
    defineField({ name: 'context', title: 'Kontekst FAQ', type: 'string' }),
  ],
  preview: { select: { title: 'heading' } },
})

export const ctaBlock = defineType({
  name: 'ctaBlock',
  title: 'CTA Section',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Nagłówek', type: 'string' }),
    defineField({ name: 'subheading', title: 'Podtytuł', type: 'string' }),
    defineField({ name: 'ctaLabel', title: 'Etykieta przycisku', type: 'string' }),
    defineField({ name: 'ctaUrl', title: 'URL', type: 'string' }),
    defineField({ name: 'variant', title: 'Wariant wizualny', type: 'string', options: { list: ['default', 'dark', 'brand'] }, initialValue: 'default' }),
  ],
  preview: { select: { title: 'heading' } },
})

export const formBlock = defineType({
  name: 'formBlock',
  title: 'Formularz',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Nagłówek', type: 'string' }),
    defineField({ name: 'subheading', title: 'Podtytuł', type: 'string' }),
    defineField({ name: 'formId', title: 'ID formularza', type: 'string', description: 'Identyfikator formularza (np. contact, demo, webinar)' }),
  ],
  preview: { select: { title: 'heading' } },
})

// ─── BLOKI NOWE (Phase 2 / Negotiation Intelligence) ───────────────────────

export const fiveQuestionsBlock = defineType({
  name: 'fiveQuestionsBlock',
  title: '5 pytań przed negocjacjami',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Nagłówek sekcji', type: 'string' }),
    defineField({ name: 'subheading', title: 'Podtytuł sekcji', type: 'text', rows: 2 }),
    defineField({
      name: 'questions',
      title: 'Pytania',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'number', title: 'Numer', type: 'number' }),
            defineField({ name: 'question', title: 'Pytanie', type: 'string' }),
            defineField({ name: 'context', title: 'Kontekst / wyjaśnienie', type: 'text', rows: 2 }),
          ],
          preview: { select: { title: 'question' } },
        },
      ],
    }),
  ],
  preview: { select: { title: 'heading' } },
})

export const businessOutcomesBlock = defineType({
  name: 'businessOutcomesBlock',
  title: 'Efekty biznesowe',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Nagłówek sekcji', type: 'string' }),
    defineField({
      name: 'outcomes',
      title: 'Efekty',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Tytuł efektu', type: 'string' }),
            defineField({ name: 'description', title: 'Opis', type: 'text', rows: 2 }),
            defineField({ name: 'metric', title: 'Metryka (np. 13%, opcjonalnie)', type: 'string' }),
          ],
          preview: { select: { title: 'title' } },
        },
      ],
    }),
  ],
  preview: { select: { title: 'heading' } },
})

export const useCaseStoryBlock = defineType({
  name: 'useCaseStoryBlock',
  title: 'Przykład z praktyki (historia)',
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Etykieta (np. "Przykład z praktyki")', type: 'string' }),
    defineField({ name: 'heading', title: 'Nagłówek historii', type: 'string' }),
    defineField({ name: 'context', title: 'Sytuacja wyjściowa', type: 'text', rows: 3 }),
    defineField({
      name: 'steps',
      title: 'Co zrobił SpendGuru',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'result', title: 'Wynik', type: 'text', rows: 2 }),
    defineField({ name: 'ctaLabel', title: 'Etykieta CTA', type: 'string' }),
    defineField({ name: 'ctaUrl', title: 'URL CTA', type: 'string' }),
  ],
  preview: { select: { title: 'heading' } },
})

/** Rejestr wszystkich typów bloków — używany w tablicach sections */
export const sectionBlocks = [
  'heroBlock',
  'proofBarBlock',
  'problemBlock',
  'fiveQuestionsBlock',
  'processBlock',
  'businessOutcomesBlock',
  'stepsBlock',
  'personaBlock',
  'useCaseBlock',
  'useCaseStoryBlock',
  'industryBlock',
  'resourceGridBlock',
  'faqBlock',
  'ctaBlock',
  'formBlock',
] as const
