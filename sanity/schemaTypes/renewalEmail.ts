import { defineField, defineType } from 'sanity'

export const renewalEmail = defineType({
    name: 'renewalEmail',
    title: 'Renewal Email',
    type: 'document',
    fields: [
        defineField({
            name: 'subject',
            title: 'Email Subject Line',
            type: 'string',
            initialValue: 'Your Quiet Bloom Envelope is Being Prepared',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'heading',
            title: 'Email Heading',
            type: 'string',
            initialValue: 'Thank you for another month of patronage.',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'bodyText',
            title: 'Body Text',
            type: 'text',
            description: 'The main message of the email.',
            initialValue: 'Your subscription has successfully renewed. We are currently curating this month\'s selections and will be dispatching your envelope shortly.\n\nAs always, we hope it brings a moment of quiet reflection to your day.',
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
