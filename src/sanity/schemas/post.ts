import { defineType, defineField } from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Artykuł / Wiedza',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Tytuł', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({ name: 'excerpt', title: 'Zajawka', type: 'text', rows: 3 }),
    defineField({ name: 'coverImage', title: 'Obraz główny', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'category',
      title: 'Kategoria',
      type: 'string',
      options: {
        list: [
          { title: 'Negocjacje', value: 'negotiations' },
          { title: 'Zakupy', value: 'procurement' },
          { title: 'Rynek', value: 'market' },
          { title: 'Narzędzia', value: 'tools' },
          { title: 'Case Study', value: 'case-study' },
        ],
      },
    }),
    defineField({ name: 'tags', title: 'Tagi', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'author', title: 'Autor', type: 'string' }),
    defineField({ name: 'publishedAt', title: 'Data publikacji', type: 'datetime' }),
    defineField({ name: 'body', title: 'Treść', type: 'blockContent' }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
    defineField({
      name: 'relatedResources',
      title: 'Powiązane zasoby',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'resource' }, { type: 'caseStudy' }] }],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'coverImage' },
  },
})
