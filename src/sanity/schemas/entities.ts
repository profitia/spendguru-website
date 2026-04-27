import { defineType, defineField } from 'sanity'

export const useCaseType = defineType({
  name: 'useCase',
  title: 'Use Case',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Tytuł', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'summary', title: 'Krótki opis', type: 'text', rows: 2 }),
    defineField({ name: 'icon', title: 'Ikona (emoji lub nazwa)', type: 'string' }),
    defineField({ name: 'persona', title: 'Persona', type: 'reference', to: [{ type: 'persona' }] }),
    defineField({ name: 'industry', title: 'Branża', type: 'reference', to: [{ type: 'industry' }] }),
    defineField({ name: 'body', title: 'Szczegóły', type: 'blockContent' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'summary' },
  },
})

export const industryType = defineType({
  name: 'industry',
  title: 'Branża',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Nazwa', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'description', title: 'Opis', type: 'text', rows: 3 }),
    defineField({ name: 'icon', title: 'Ikona', type: 'string' }),
    defineField({ name: 'order', title: 'Kolejność', type: 'number' }),
  ],
  orderings: [{ title: 'Kolejność', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'title' } },
})

export const personaType = defineType({
  name: 'persona',
  title: 'Persona / Dla kogo',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Nazwa persony', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'role', title: 'Stanowisko', type: 'string' }),
    defineField({ name: 'description', title: 'Opis', type: 'text', rows: 3 }),
    defineField({
      name: 'painPoints',
      title: 'Pain Points',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'benefits',
      title: 'Korzyści',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
  preview: { select: { title: 'title', subtitle: 'role' } },
})

export const faqType = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({ name: 'question', title: 'Pytanie', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'answer', title: 'Odpowiedź', type: 'blockContent' }),
    defineField({
      name: 'context',
      title: 'Kontekst (gdzie wyświetlać)',
      type: 'string',
      options: {
        list: ['ogolny', 'jak-to-dziala', 'dla-kogo', 'cennik', 'kontakt'],
      },
    }),
    defineField({ name: 'order', title: 'Kolejność', type: 'number' }),
  ],
  preview: { select: { title: 'question', subtitle: 'context' } },
})
