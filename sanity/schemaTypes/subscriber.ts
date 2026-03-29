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

        // Gift fields
        defineField({
            name: 'isGift',
            title: 'Is Gift Subscription?',
            type: 'boolean',
            initialValue: false,
        }),
        defineField({
            name: 'giftRecipientName',
            title: 'Gift Recipient Name',
            type: 'string',
            description: 'The name of the person this gift is for.',
            hidden: ({ document }) => !document?.isGift,
        }),
        defineField({
            name: 'giftMessage',
            title: 'Gift Message',
            type: 'text',
            description: 'Personal message from the buyer (e.g. "Happy Birthday! From Sarah").',
            hidden: ({ document }) => !document?.isGift,
        }),
        defineField({
            name: 'gifterEmail',
            title: 'Gifter Email',
            type: 'string',
            description: 'Email of the person who bought this gift.',
            hidden: ({ document }) => !document?.isGift,
        }),
        defineField({
            name: 'giftExpiresAt',
            title: 'Gift Expires At',
            type: 'datetime',
            description: 'When this gift subscription period ends.',
            hidden: ({ document }) => !document?.isGift,
        }),
    ],
    preview: {
        select: {
            title: 'email',
            subtitle: 'tier',
            isGift: 'isGift',
        },
        prepare({ title, subtitle, isGift }) {
            return {
                title: isGift ? `🎁 ${title}` : title,
                subtitle: subtitle,
            }
        },
    },
})

