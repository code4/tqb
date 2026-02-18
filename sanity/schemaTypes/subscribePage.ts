import { defineField, defineType } from 'sanity'

export const subscribePage = defineType({
    name: 'subscribePage',
    title: 'Subscribe Page',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: 'tiers',
            title: 'Subscription Tiers',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'name', type: 'string', title: 'Tier Name' },
                        { name: 'price', type: 'string', title: 'Price (Display)' },
                        { name: 'stripeLink', type: 'string', title: 'Stripe Link (URL)' },
                        { name: 'features', type: 'array', of: [{ type: 'string' }] },
                        { name: 'recommended', type: 'boolean', title: 'Recommended' },
                    ],
                },
            ],
        }),
    ],
})
