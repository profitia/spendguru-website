import { defineType, defineField } from 'sanity'

export const caseStudyType = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Tytuł', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'excerpt', title: 'Skrót', type: 'text', rows: 3 }),
    defineField({ name: 'industry', title: 'Branża', type: 'reference', to: [{ type: 'industry' }] }),
    defineField({
      name: 'results',
      title: 'Wyniki',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'metric', title: 'Metryka', type: 'string' }),
            defineField({ name: 'value', title: 'Wartość', type: 'string' }),
            defineField({ name: 'description', title: 'Opis', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({ name: 'body', title: 'Treść', type: 'blockContent' }),
    defineField({ name: 'coverImage', title: 'Obraz', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'publishedAt', title: 'Data', type: 'datetime' }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'industry.title', media: 'coverImage' },
  },
})
