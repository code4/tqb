import { defineField, defineType } from 'sanity'

export const successPage = defineType({
    name: 'successPage',
    title: 'Success Page',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'The main heading on the success page (e.g., "Welcome to the Bloom")',
            initialValue: 'Welcome to the Bloom',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'message',
            title: 'Message',
            type: 'text',
            description: 'The confirmation message displayed to the user.',
            initialValue: 'Your subscription has been confirmed. We are honored to have you join our quiet corner of the internet.\n\nWe have just dispatched a welcome letter to your inbox containing everything you need to know about your upcoming monthly deliveries.',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'buttonText',
            title: 'Button Text',
            type: 'string',
            description: 'The text for the button that returns the user home.',
            initialValue: 'Return to the Garden',
            validation: (Rule) => Rule.required(),
        }),
    ],
})
