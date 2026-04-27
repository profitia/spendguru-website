import { defineType, defineField } from 'sanity'

export const resourceType = defineType({
  name: 'resource',
  title: 'Zasób do pobrania',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Tytuł', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'excerpt', title: 'Opis', type: 'text', rows: 3 }),
    defineField({
      name: 'resourceType',
      title: 'Typ zasobu',
      type: 'string',
      options: {
        list: [
          { title: 'Raport', value: 'report' },
          { title: 'Checklist', value: 'checklist' },
          { title: 'Template', value: 'template' },
          { title: 'Webinar', value: 'webinar' },
          { title: 'Przewodnik', value: 'guide' },
        ],
      },
    }),
    defineField({ name: 'file', title: 'Plik (PDF)', type: 'file' }),
    defineField({ name: 'coverImage', title: 'Obraz', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'requiresEmail', title: 'Wymaga e-maila (gate)', type: 'boolean', initialValue: false }),
    defineField({ name: 'publishedAt', title: 'Data', type: 'datetime' }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'resourceType', media: 'coverImage' },
  },
})
