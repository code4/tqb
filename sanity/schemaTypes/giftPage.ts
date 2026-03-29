import { defineField, defineType } from 'sanity'
import { pageSections } from './landingPage'

export const giftPage = defineType({
    name: 'giftPage',
    title: 'Gift Page',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Page Title (SEO)',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Meta Description (SEO)',
            type: 'text',
        }),
        defineField({
            name: 'sections',
            title: 'Sections',
            type: 'array',
            of: pageSections as any,
        }),
    ],
})

