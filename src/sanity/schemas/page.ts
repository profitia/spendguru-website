import { defineType, defineField } from 'sanity'
import { sectionBlocks } from './sections'

export const pageType = defineType({
  name: 'page',
  title: 'Strona',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Tytuł', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({
      name: 'language',
      title: 'Język',
      type: 'string',
      options: { list: [{ title: 'Polski', value: 'pl' }, { title: 'English', value: 'en' }] },
      initialValue: 'pl',
    }),
    defineField({
      name: 'sections',
      title: 'Sekcje strony',
      type: 'array',
      of: sectionBlocks.map((type) => ({ type })),
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
    defineField({ name: 'publishedAt', title: 'Data publikacji', type: 'datetime' }),
    defineField({ name: 'updatedAt', title: 'Data aktualizacji', type: 'datetime' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'slug.current' },
  },
})
