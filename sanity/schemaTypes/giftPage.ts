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
            name: 'hero',
            title: 'Hero Section',
            type: 'object',
            fields: [
                { name: 'badgeText', type: 'string', title: 'Badge Text', initialValue: 'A Thoughtful Gift' },
                { name: 'heading', type: 'string', title: 'Heading' },
                { name: 'subheading', type: 'text', title: 'Subheading' },
                { name: 'italicNote', type: 'text', title: 'Italic Note' }
            ]
        }),
        defineField({
            name: 'howItWorks',
            title: 'How It Works Section',
            type: 'object',
            fields: [
                { name: 'heading', type: 'string', title: 'Heading' },
                {
                    name: 'steps',
                    title: 'Steps',
                    type: 'array',
                    of: [{
                        type: 'object',
                        fields: [
                            { name: 'stepNumber', type: 'string', title: 'Step Number' },
                            { name: 'title', type: 'string', title: 'Title' },
                            { name: 'description', type: 'text', title: 'Description' }
                        ]
                    }]
                }
            ]
        }),
        defineField({
            name: 'pricing',
            title: 'Pricing Section',
            type: 'object',
            fields: [
                { name: 'heading', type: 'string', title: 'Heading' },
                { name: 'subheading', type: 'string', title: 'Subheading' },
                {
                    name: 'tiers',
                    title: 'Gift Tiers',
                    type: 'array',
                    of: [{
                        type: 'object',
                        fields: [
                            { name: 'name', type: 'string', title: 'Tier Name' },
                            { name: 'price', type: 'string', title: 'Price (e.g. £24)' },
                            { name: 'duration', type: 'string', title: 'Duration (e.g. 3 months)' },
                            { name: 'perMonth', type: 'string', title: 'Per Month Text (e.g. £8/month)' },
                            { name: 'features', type: 'array', title: 'Features', of: [{ type: 'string' }] }
                        ]
                    }]
                }
            ]
        }),
        defineField({
            name: 'reassurance',
            title: 'Reassurance Section',
            type: 'object',
            fields: [
                { name: 'quoteText', type: 'text', title: 'Quote Text' },
                { name: 'disclaimer', type: 'text', title: 'Disclaimer Text' }
            ]
        })
    ],
})

