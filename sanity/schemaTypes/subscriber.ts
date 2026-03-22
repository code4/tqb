import { defineField, defineType } from 'sanity'

export const subscriber = defineType({
    name: 'subscriber',
    title: 'Subscriber',
    type: 'document',
    fields: [
        defineField({
            name: 'email',
            title: 'Email Address',
            type: 'string',
            validation: (Rule) => Rule.required().email(),
        }),
        defineField({
            name: 'status',
            title: 'Status',
            type: 'string',
            options: {
                list: [
                    { title: 'Active', value: 'active' },
                    { title: 'Unsubscribed', value: 'unsubscribed' },
                ],
                layout: 'radio',
            },
            initialValue: 'active',
        }),
        defineField({
            name: 'tier',
            title: 'Subscriber Tier',
            type: 'string',
            options: {
                list: [
                    { title: 'Free (Digital Reader)', value: 'free' },
                    { title: 'Paid (Print Club)', value: 'paid' },
                ],
            },
            initialValue: 'free',
        }),
        defineField({
            name: 'signedUpAt',
            title: 'Signed Up At',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
        }),
    ],
    preview: {
        select: {
            title: 'email',
            subtitle: 'tier',
        },
    },
})
