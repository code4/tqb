import { defineField, defineType } from 'sanity'

export const unsubscribedEmail = defineType({
    name: 'unsubscribedEmail',
    title: 'Unsubscribed Email',
    type: 'document',
    fields: [
        defineField({
            name: 'subject',
            title: 'Email Subject Line',
            type: 'string',
            initialValue: 'Your Subscription has been Cancelled',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'heading',
            title: 'Email Heading',
            type: 'string',
            initialValue: 'Farewell for now.',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'bodyText',
            title: 'Body Text',
            type: 'text',
            description: 'The main message of the email.',
            initialValue: 'We are writing to confirm that your subscription to The Quiet Bloom has been successfully cancelled.\n\nYou will not be billed again. We are honored to have shared our quiet corner of the internet with you, even if just for a little while.\n\nThe door is always open should you choose to return.',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'signoff',
            title: 'Signoff',
            type: 'string',
            initialValue: 'Warmly,\nThe Quiet Bloom',
        }),
    ],
})
