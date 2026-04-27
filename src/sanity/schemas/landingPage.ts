import { defineType, defineField } from 'sanity'
import { sectionBlocks } from './sections'

export const landingPageType = defineType({
  name: 'landingPage',
  title: 'Landing Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Tytuł', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({ name: 'campaignName', title: 'Nazwa kampanii', type: 'string' }),
    defineField({ name: 'persona', title: 'Persona', type: 'reference', to: [{ type: 'persona' }] }),
    defineField({
      name: 'sections',
      title: 'Sekcje',
      type: 'array',
      of: sectionBlocks.map((type) => ({ type })),
    }),
    defineField({
      name: 'form',
      title: 'Formularz',
      type: 'object',
      fields: [
        defineField({ name: 'formId', title: 'ID formularza', type: 'string' }),
        defineField({ name: 'heading', title: 'Nagłówek formularza', type: 'string' }),
      ],
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'campaignName' },
  },
})
