import { defineField, defineType } from 'sanity'

export const welcomeEmail = defineType({
    name: 'welcomeEmail',
    title: 'Welcome Email',
    type: 'document',
    fields: [
        defineField({
            name: 'subject',
            title: 'Email Subject Line',
            type: 'string',
            initialValue: 'Welcome to The Quiet Bloom',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'heading',
            title: 'Email Heading',
            type: 'string',
            initialValue: 'Welcome to our quiet corner of the internet.',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'bodyText',
            title: 'Body Text',
            type: 'text',
            description: 'The main message of the email.',
            initialValue: 'Thank you for subscribing. By becoming a patron, you\'re not just supporting our work—you\'re joining a community that values intentionality, reflection, and quiet luxury.\n\nEach month, you will receive a digital letter curated carefully to bring a moment of pause to your day.\n\nWe are so glad you are here.',
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
